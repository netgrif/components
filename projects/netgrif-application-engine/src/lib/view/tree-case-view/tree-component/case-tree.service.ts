import {Injectable} from '@angular/core';
import {Filter} from '../../../filter/models/filter';
import {HttpParams} from '@angular/common/http';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {MatTreeNestedDataSource} from '@angular/material';
import {CaseTreeNode} from './model/CaseTreeNode';
import {NestedTreeControl} from '@angular/cdk/tree';
import {TreeCaseViewService} from '../tree-case-view.service';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {ImmediateData} from '../../../resources/interface/immediate-data';
import {SimpleFilter} from '../../../filter/models/simple-filter';
import {FilterType} from '../../../filter/models/filter-type';
import {Case} from '../../../resources/interface/case';
import {Task} from '../../../resources/interface/task';
import {ProcessService} from '../../../process/process.service';
import {SideMenuService} from '../../../side-menu/services/side-menu.service';
import {OptionSelectorComponent} from '../../../side-menu/content-components/option-selector/option-selector.component';
import {SideMenuSize} from '../../../side-menu/models/side-menu-size';
import {Observable, of, Subject} from 'rxjs';
import {Page} from '../../../resources/interface/page';
import {TreePetriflowIdentifiers} from '../model/tree-petriflow-identifiers';
import {tap} from 'rxjs/operators';

@Injectable()
export class CaseTreeService {

    protected _currentNode: CaseTreeNode;
    private _rootNodesFilter: Filter;
    private readonly _treeDataSource: MatTreeNestedDataSource<CaseTreeNode>;
    private readonly _treeControl: NestedTreeControl<CaseTreeNode>;
    private _finishedLoadingFirstLevel$: Subject<boolean>;

    constructor(protected _caseResourceService: CaseResourceService,
                protected _treeCaseViewService: TreeCaseViewService,
                protected _taskResourceService: TaskResourceService,
                protected _logger: LoggerService,
                protected _processService: ProcessService,
                protected _sideMenuService: SideMenuService) {
        this._treeDataSource = new MatTreeNestedDataSource<CaseTreeNode>();
        this._treeControl = new NestedTreeControl<CaseTreeNode>(node => node.children);
        _treeCaseViewService.reloadCase$.asObservable().subscribe(() => {
            this.reloadCurrentCase();
        });
        this._finishedLoadingFirstLevel$ = new Subject<boolean>();
    }

    public set rootFilter(filter: Filter) {
        this._rootNodesFilter = filter;
        this.dataSource.data = [];
        this.loadFirstTreeLevel(0);
    }

    public get dataSource(): MatTreeNestedDataSource<CaseTreeNode> {
        return this._treeDataSource;
    }

    public get treeControl(): NestedTreeControl<CaseTreeNode> {
        return this._treeControl;
    }

    public get finishedLoadingFirstLevel$(): Observable<boolean> {
        return this._finishedLoadingFirstLevel$.asObservable();
    }

    protected get _currentCase(): Case | undefined {
        return this._currentNode ? this._currentNode.case : undefined;
    }

    /**
     * Loads and populates the topmost level of the tree.
     *
     * The displayed cases are determined by this object's [rootFilter]{@link CaseTreeService#rootFilter}.
     *
     * Cases are loaded one page at a time and the tree is refreshed after each page.
     * [finishedLoadingFirstLevel$]{@link CaseTreeService#finishedLoadingFirstLevel$}
     * will emit `true` once the last page loads successfully.
     * `false` will be emitted if any of the requests fail.
     *
     * @param loadedPageNumber the page number of the first page that should be loaded and appended into the tree.
     * All following pages will be processed as well.
     */
    protected loadFirstTreeLevel(loadedPageNumber: number) {
        if (this._rootNodesFilter) {
            let params: HttpParams = new HttpParams();
            params = params.set('page', `${loadedPageNumber}`);
            this._caseResourceService.searchCases(this._rootNodesFilter, params).subscribe(page => {
                if (page && page.content && Array.isArray(page.content)) {
                    this.dataSource.data.push(...this.getNodesFromPage(page));
                    this.refreshTree();

                    if (loadedPageNumber + 1 < page.pagination.totalPages) {
                        this.loadFirstTreeLevel(loadedPageNumber + 1);
                    } else {
                        this._finishedLoadingFirstLevel$.next(true);
                    }
                }
            }, error => {
                this._logger.error('Tree first level nodes could not be loaded', error);
                this._finishedLoadingFirstLevel$.next(false);
            });
        }
    }

    /**
     * Transforms a page of cases into an array of tree nodes
     * @param page a {@link Page} with `content` that contains the cases we want to transform into nodes
     * @returns an array of nodes created from the cases by calling [newNode]{@link CaseTreeService#newNode} method on each of them
     */
    private getNodesFromPage(page: Page<Case>): Array<CaseTreeNode> {
        return page.content.map(c => new CaseTreeNode(c));
    }

    /**
     * Notifies the parent TreeCaseView that a case was clicked in the tree and it's Task should be displayed
     */
    public caseNodeClicked(node: CaseTreeNode): void {
        this._currentNode = node;
        this._treeCaseViewService.loadTask$.next(node.case);
    }

    /**
     * Expands the target node in the tree and reloads it's children if they are marked as dirty
     * @param node the {@link CaseTreeNode} that should be expanded
     */
    public expandNode(node: CaseTreeNode): void {
        if (node.loadingChildren.isActive) {
            return;
        }

        if (!node.dirtyChildren) {
            this.treeControl.expand(node);
            return;
        }

        this.updateNodeChildren(node).subscribe(() => {
            if (node.children.length > 0) {
                this.treeControl.expand(node);
            }
        });
    }

    /**
     * Checks whether dirty children need to be reloaded and reloads them if needed.
     * @param node the {@link CaseTreeNode} who's children are updated
     * @returns emits when loading finishes
     */
    protected updateNodeChildren(node: CaseTreeNode): Observable<void> {
        node.loadingChildren.on();

        const childrenCaseRef = node.case.immediateData.find(it => it.stringId === TreePetriflowIdentifiers.CHILDREN_CASE_REF);
        if (!childrenCaseRef || childrenCaseRef.value.length === 0) {
            node.children = [];
            this.refreshTree();
            node.dirtyChildren = false;
            node.loadingChildren.off();
            return of();
        }

        if (node.children.length === childrenCaseRef.value.length) {
            const existingChildren = new Set<string>();
            node.children.forEach(childNode => existingChildren.add(childNode.case.stringId));
            if (childrenCaseRef.value.every(caseId => existingChildren.has(caseId))) {
                node.dirtyChildren = false;
                node.loadingChildren.off();
                return of();
            }
        }

        return this.updatePageOfChildren(node, 0).pipe(
            tap(() => {
                    this.refreshTree();
                    node.dirtyChildren = false;
                    node.loadingChildren.off();
                }
            )
        );
    }

    /**
     * Loads every page of children from the given number and updates the existing children.
     *
     * Missing nodes are removed. Existing nodes are marked as dirty. New nodes are added.
     *
     * Nodes are returned in their insertion order.
     * @param node the {@link CaseTreeNode} who's children are updated
     * @param pageNumber the number of the first page that should be loaded. All following pages are loaded as well
     * @returns next is emitted when loading of all pages completes (regardless of the outcome)
     */
    protected updatePageOfChildren(node: CaseTreeNode, pageNumber: number): Observable<void> {
        const filter = this.createChildFilter(node);
        if (!filter) {
            this._logger.error('Cannot create filter to find children of the given node', node.case);
            return;
        }

        const done = new Subject<void>();

        let params: HttpParams = new HttpParams();
        params = params.set('page', `${pageNumber}`).set('sort', 'creationDateSortable,asc');
        this._caseResourceService.searchCases(filter, params).subscribe(page => {
            if (!page || !page.content || !Array.isArray(page.content)) {
                this._logger.error('Child cases invalid page content', page);
                done.next();
                done.complete();
                return;
            }

            this.updateCurrentChildrenWithNewPage(node, page);

            if (pageNumber + 1 < page.pagination.totalPages) {
                this.updatePageOfChildren(node, pageNumber + 1).subscribe(() => {
                    done.next();
                    done.complete();
                });
            } else {
                done.next();
                done.complete();
            }

        }, error => {
            this._logger.error('Child cases could not be loaded', error);
            done.next();
            done.complete();
        });

        return done.asObservable();
    }

    /**
     * Updates the children of the given {@link CaseTreeNode} with [Cases]{@link Case} from the provided {@link Page}.
     * @param node the {@link CaseTreeNode} who's children are updated
     * @param page the {@link Page} that contains the updated children
     */
    protected updateCurrentChildrenWithNewPage(node: CaseTreeNode, page: Page<Case>): void {
        page.content.forEach((newCase, index) => {
            const position = page.pagination.size * page.pagination.number + index;
            while (position < node.children.length && node.children[position].case.stringId !== newCase.stringId) {
                node.children.splice(position, 1);
            }
            if (node.children.length === position) {
                node.children.push(new CaseTreeNode(newCase));
            } else {
                node.children[position].case = newCase;
                node.dirtyChildren = true;
                this.treeControl.collapseDescendants(node.children[position]);
            }
        });
    }

    /**
     * @param node the {@link CaseTreeNode} who's children the {@link Filter} should return
     * @returns a {@link Filter} that finds all child cases of the given `node`.
     * Returns `undefined` if the provided `node` doesn't contain enough information to create the {@link Filter}.
     */
    protected createChildFilter(node: CaseTreeNode): Filter | undefined {
        const childCaseRef = node.case.immediateData.find(it => it.stringId === TreePetriflowIdentifiers.CHILDREN_CASE_REF);
        if (!childCaseRef) {
            return undefined;
        }

        const caseQueries = childCaseRef.value.map(caseId => `(stringId:${caseId})`);
        return new SimpleFilter(`childrenOf-${node.case.stringId}`, FilterType.CASE, {query: caseQueries.join('OR')});
    }

    /**
     * Adds a new child node to the given node based on the properties of the node's case
     */
    public addChildNode(clickedNode: CaseTreeNode): void {
        this._taskResourceService.getTasks({
            case: clickedNode.case.stringId,
            transition: TreePetriflowIdentifiers.ADD_CHILD_TRANSITION
        }).subscribe(page => {
            if (page.content.length === 0) {
                // TODO notify user about error
                this._logger.error('Task for adding tree nodes doesn\'t exist');
            }
            const task = page.content[0];
            const caseRefField = clickedNode.case.immediateData.find(it => it.stringId === TreePetriflowIdentifiers.CHILDREN_CASE_REF);

            if (caseRefField.allowedNets.length === 0) {
                this._logger.error(`Case ${clickedNode.case.stringId} can add new tree nodes but has no allowed nets`);
                return;
            } else if (caseRefField.allowedNets.length === 1) {
                this.createNewChildNode(clickedNode, task, caseRefField, caseRefField.allowedNets[0]);
            } else {
                this._processService.getNets(caseRefField.allowedNets).subscribe(nets => {
                    const sideMeuRef = this._sideMenuService.open(OptionSelectorComponent, SideMenuSize.MEDIUM, {
                        title: 'TODO some title here',
                        options: nets.map(net => ({text: net.title, value: net.identifier}))
                    });
                    sideMeuRef.onClose.subscribe(event => {
                        if (!!event.data) {
                            this.createNewChildNode(clickedNode, task, caseRefField, event.data);
                        }
                    });
                });
            }

        }, error => {
            // TODO notify user about error
            this._logger.error('Task for adding tree nodes could not be found', error);
        });
    }

    /**
     * Performs the backend call to add new child node
     * @param clickedNode the {@link CaseTreeNode} to which we want to add a child
     * @param addNodeTask the {@link Task} that contains the CaseRef datafield with node's children
     * @param caseRefField the CaseRef current state
     * @param newCaseProcessIdentifier identifier of the process for the new child
     */
    private createNewChildNode(clickedNode: CaseTreeNode, addNodeTask: Task,
                               caseRefField: ImmediateData, newCaseProcessIdentifier: string): void {
        this._taskResourceService.setData(addNodeTask.stringId, {
            treeChildCases: {
                type: 'caseRef',
                value: {
                    operation: 'add',
                    title: 'New Node', // TODO some default value for each case?
                    processId: newCaseProcessIdentifier
                }
            }
        }).subscribe(changeContainer => {
            const changedFields = changeContainer.changedFields;
            const caseRefChanges = changedFields[TreePetriflowIdentifiers.CHILDREN_CASE_REF];
            if (!caseRefChanges) {
                // TODO maybe reload the case?
                return;
            }
            this.updateNodeChildrenAfterAdd(clickedNode, caseRefField, caseRefChanges.value);
        }, error => {
            // TODO notify user about error
            this._logger.error('Could not set data to tree case ref', error);
        });
    }

    /**
     * Performs an update after adding a new child node
     * @param clickedNode node that had a child added
     * @param caseRefField previous state of the caseRef field
     * @param newCaseRefValue new value of the caseRef field returned by backend
     */
    private updateNodeChildrenAfterAdd(clickedNode: CaseTreeNode, caseRefField: ImmediateData, newCaseRefValue: Array<string>): void {
        const newChildren = new Set<string>();
        newCaseRefValue.forEach(id => newChildren.add(id));

        if (caseRefField.value.length + 1 !== newCaseRefValue.length || caseRefField.value.some(id => !newChildren.has(id))) {
            caseRefField.value = newCaseRefValue;
            this._treeControl.collapseDescendants(clickedNode);
            clickedNode.dirtyChildren = true;
            return;
        }

        caseRefField.value = newCaseRefValue;
        this._caseResourceService.searchCases(new SimpleFilter('', FilterType.CASE, {
            query: 'stringId:' + newCaseRefValue[newCaseRefValue.length - 1]
        })).subscribe(page => {
            if (page.content.length !== 1) {
                // TODO notify user about error
                this._logger.error('Child node case could not be found');
            }
            clickedNode.children.push(new CaseTreeNode(page.content[0]));
            this.refreshTree();
        }, error => {
            // TODO notify user about error
            this._logger.error('Child node case could not be found', error);
        });
    }

    /**
     * @ignore
     * Forces a rerender of the tree content
     */
    private refreshTree(): void {
        const d = this._treeDataSource.data;
        this._treeDataSource.data = null;
        this._treeDataSource.data = d;
    }

    /**
     * Reloads the currently selected case node. The {@link Case} object held in the {@link CaseTreeNode} instance is not replaced,
     * but the new Case is `Object.assign`-ed into it. THis means that the reference to the Case instance is unchanged but references
     * to all it's non-primitive attributes are changed.
     *
     * Note that the child nodes, nor the parent nodes are reloaded.
     */
    protected reloadCurrentCase(): void {
        if (this._currentNode) {
            this._caseResourceService.searchCases(this.createCaseFilter(this._currentCase.stringId)).subscribe(page => {
                if (page && page.content && Array.isArray(page.content) && page.content.length === 1) {
                    Object.assign(this._currentCase, page.content[0]);
                    this._treeCaseViewService.loadTask$.next(this._currentCase);
                    this._logger.debug('Case Tree Node reloaded');
                } else {
                    this._logger.error('Case Tree Node could not be reloaded. Invalid server response', page);
                }
            }, error => {
                this._logger.error('Case Tree Node reload request failed', error);
            });
        } else {
            this._logger.debug('No Tree Case Node selected, nothing to reload');
        }
    }

    /**
     * @param caseId ID of the desired Case
     * @returns a {@link Filter} that matches the desired case by it's ID
     */
    protected createCaseFilter(caseId: string): Filter {
        return new SimpleFilter(`caseWithId-${caseId}`, FilterType.CASE, {query: `stringId:${caseId}`});
    }
}
