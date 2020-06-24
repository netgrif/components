import {Injectable} from '@angular/core';
import {Filter} from '../../../filter/models/filter';
import {HttpParams} from '@angular/common/http';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {MatTreeNestedDataSource} from '@angular/material';
import {CaseTreeNode} from './interfaces/CaseTreeNode';
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
import {Observable, Subject} from 'rxjs';
import {Page} from '../../../resources/interface/page';

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
        return page.content.map(c => this.newNode(c));
    }

    /**
     * @param nodeCase Case that should be represented as a Node in the Case Tree
     * @returns a Node that contains the provided case, has an empty `Array` as children and they are set as dirty
     */
    private newNode(nodeCase: Case): CaseTreeNode {
        return {
            case: nodeCase,
            children: [],
            dirtyChildren: true
        };
    }

    /**
     * Notifies the parent TreeCaseView that a case was clicked in the tree and it's Task should be displayed
     */
    public caseNodeClicked(node: CaseTreeNode): void {
        this._currentNode = node;
        this._treeCaseViewService.loadTask$.next(node.case);
    }

    /**
     * Adds a new child node to the given node based on the properties of the node's case
     */
    public addChildNode(clickedNode: CaseTreeNode): void {
        this._taskResourceService.getTasks({
            case: clickedNode.case.stringId,
            transition: 'add_tree_child'
        }).subscribe(page => {
            if (page.content.length === 0) {
                // TODO notify user about error
                this._logger.error('Task for adding tree nodes doesn\'t exist');
            }
            const task = page.content[0];
            const caseRefField = clickedNode.case.immediateData.find(it => it.stringId === 'treeChildCases');

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
            const caseRefChanges = changedFields['treeChildCases'];
            if (!caseRefChanges) {
                // TODO maybe reload the case?
                return;
            }
            this.updateNodeChildren(clickedNode, caseRefField, caseRefChanges.value);
        }, error => {
            // TODO notify user about error
            this._logger.error('Could not set data to tree case ref', error);
        });
    }

    private updateNodeChildren(clickedNode: CaseTreeNode, caseRefField: ImmediateData, newCaseRefValue: Array<string>): void {
        // TODO better diff
        caseRefField.value = newCaseRefValue;
        this._caseResourceService.searchCases(new SimpleFilter('', FilterType.CASE, {
            query: 'stringId:' + newCaseRefValue[newCaseRefValue.length - 1]
        })).subscribe(page => {
            if (page.content.length !== 1) {
                // TODO notify user about error
                this._logger.error('Child node case could not be found');
            }
            clickedNode.children.push(this.newNode(page.content[0]));
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
