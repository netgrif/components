import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {Filter} from '../../../filter/models/filter';
import {HttpParams} from '@angular/common/http';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {CaseTreeNode} from './model/case-tree-node';
import {TreeCaseViewService} from '../tree-case-view.service';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {ImmediateData} from '../../../resources/interface/immediate-data';
import {Case} from '../../../resources/interface/case';
import {ProcessService} from '../../../process/process.service';
import {SideMenuService} from '../../../side-menu/services/side-menu.service';
import {SideMenuSize} from '../../../side-menu/models/side-menu-size';
import {forkJoin, Observable, of, ReplaySubject, Subject, Subscription, throwError} from 'rxjs';
import {Page} from '../../../resources/interface/page';
import {TreePetriflowIdentifiers} from '../model/tree-petriflow-identifiers';
import {tap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {hasContent} from '../../../utility/pagination/page-has-content';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ofVoid} from '../../../utility/of-void';
import {CaseGetRequestBody} from '../../../resources/interface/case-get-request-body';
import {getImmediateData} from '../../../utility/get-immediate-data';
import {NAE_OPTION_SELECTOR_COMPONENT} from '../../../side-menu/content-components/injection-tokens';
import {SimpleFilter} from '../../../filter/models/simple-filter';
import {CaseTreePath} from './model/case-tree-path';
import {ExpansionTree} from './model/expansion-tree';
import {ResultWithAfterActions} from '../../../utility/result-with-after-actions';
import {refreshTree} from '../../../utility/refresh-tree';

/**
 * An internal helper object, that is used to return two values from a function.
 */
interface CaseUpdateResult {
    /**
     * Whether the attributes that are visible on the tree changed
     */
    visibleTreePropertiesChanged: boolean;
    /**
     * Whether the nodes children changed
     */
    childrenChanged: boolean;
}

@Injectable()
export class CaseTreeService implements OnDestroy {

    protected _currentNode: CaseTreeNode;
    private _rootNodesFilter: Filter;
    private readonly _treeDataSource: MatTreeNestedDataSource<CaseTreeNode>;
    private readonly _treeControl: NestedTreeControl<CaseTreeNode>;
    private _treeRootLoaded$: ReplaySubject<boolean>;
    private _rootNode: CaseTreeNode;
    private _showRoot: boolean;
    /**
     * Weather the tree is eager loaded or not.
     *
     * Defaults to `false`.
     *
     * It is not recommended to eager load large trees as each node sends a separate backend request to load its data.
     */
    private _isEagerLoaded = false;
    /**
     * string id of the case, that is currently being reloaded, `undefined` if no case is currently being reloaded
     */
    private _reloadedCaseId: string;

    constructor(protected _caseResourceService: CaseResourceService,
                protected _treeCaseViewService: TreeCaseViewService,
                protected _taskResourceService: TaskResourceService,
                protected _logger: LoggerService,
                protected _processService: ProcessService,
                protected _sideMenuService: SideMenuService,
                protected _translateService: TranslateService,
                @Optional() @Inject(NAE_OPTION_SELECTOR_COMPONENT) protected _optionSelectorComponent: any) {
        this._treeDataSource = new MatTreeNestedDataSource<CaseTreeNode>();
        this._treeControl = new NestedTreeControl<CaseTreeNode>(node => node.children);
        _treeCaseViewService.reloadCase$.asObservable().subscribe(() => {
            this.reloadCurrentCase();
        });
        this._treeRootLoaded$ = new ReplaySubject<boolean>(1);
    }

    ngOnDestroy(): void {
        this._treeRootLoaded$.complete();
    }

    public set rootFilter(filter: Filter) {
        this._rootNodesFilter = filter;
        this.dataSource.data = [];
        this.loadTreeRoot();
    }

    public get dataSource(): MatTreeNestedDataSource<CaseTreeNode> {
        return this._treeDataSource;
    }

    public get treeControl(): NestedTreeControl<CaseTreeNode> {
        return this._treeControl;
    }

    public get currentNode(): CaseTreeNode {
        return this._currentNode;
    }

    /**
     * Emits a value whenever a new root node Filter is set.
     *
     * `true` is emitted if the root node was successfully loaded. `false` otherwise.
     *
     * On subscription emits the last emitted value (if any) to the subscriber.
     */
    public get treeRootLoaded$(): Observable<boolean> {
        return this._treeRootLoaded$.asObservable();
    }

    protected get _currentCase(): Case | undefined {
        return this._currentNode ? this._currentNode.case : undefined;
    }

    /**
     * @returns an `Observable` of the {@link LoadingEmitter} representing the loading state of the root node.
     * Returns `undefined` if the tree has not yet been initialized.
     *
     * Wait for an emission on the [treeRootLoaded$]{@link CaseTreeService#treeRootLoaded$} stream before getting this Observable.
     *
     * The first value emitted by the Observable is `false`, when the tree finishes initializing.
     */
    public get rootNodeLoading$(): Observable<boolean> | undefined {
        return !!this._rootNode ? this._rootNode.loadingChildren.asObservable() : undefined;
    }

    /**
     * @returns an `Observable` of the {@link LoadingEmitter} representing whether the root node is currently
     * in the process of adding a new child node or not.
     * Returns `undefined` if the tree has not yet been initialized.
     *
     * Wait for an emission on the [treeRootLoaded$]{@link CaseTreeService#treeRootLoaded$} stream before getting this Observable.
     *
     * The first value emitted by the Observable is `false`, when the tree finishes initializing.
     */
    public get rootNodeAddingChild$(): Observable<boolean> | undefined {
        return !!this._rootNode ? this._rootNode.addingNode.asObservable() : undefined;
    }

    /**
     * Weather the tree is eager loaded or not.
     *
     * Defaults to `false`.
     *
     * It is not recommended to eager load large trees as each node sends a separate backend request to load its data.
     */
    public get isEagerLoaded(): boolean {
        return this._isEagerLoaded;
    }

    /**
     * Weather the tree is eager loaded or not.
     *
     * Defaults to `false`.
     *
     * It is not recommended to eager load large trees as each node sends a separate backend request to load its data.
     *
     * @param eager the new setting for eager loading
     */
    public set isEagerLoaded(eager: boolean) {
        this._isEagerLoaded = eager;
    }

    /**
     * Loads and populates the topmost level of the tree.
     *
     * The displayed cases are determined by this object's [rootFilter]{@link CaseTreeService#rootFilter}.
     *
     * Cases are loaded one page at a time and the tree is refreshed after each page.
     * [finishedLoadingFirstLevel$]{@link CaseTreeService#treeRootLoaded$}
     * will emit `true` once the last page loads successfully.
     * `false` will be emitted if any of the requests fail.
     */
    protected loadTreeRoot() {
        if (this._rootNodesFilter) {
            this._caseResourceService.searchCases(this._rootNodesFilter).subscribe(page => {
                if (hasContent(page)) {
                    this._rootNode = new CaseTreeNode(page.content[0], undefined);
                    if (page.content.length !== 1) {
                        this._logger.warn('Filter for tree root returned more than one case. Using the first value as tree root...');
                    }
                    this._treeRootLoaded$.next(true);
                } else {
                    this._logger.error('Tree root cannot be generated from the provided filter', page);
                }
            }, error => {
                this._logger.error('Root node of the case tree could not be loaded', error);
                this._treeRootLoaded$.next(false);
            });
        }
    }

    /**
     * Adds the loaded tree root to the display based on the setting.
     * @param showRoot whether the root of the tree should be displayed in the tree or not.
     * If the root is not displayed it's children will be displayed on the first level.
     * @returns an Observable that emits when the tree finishes initialization.
     */
    public initializeTree(showRoot: boolean): Observable<void> {
        if (!this._rootNode) {
            this._logger.error('Set a Filter before initializing the case tree');
            return throwError(new Error('Set a Filter before initializing the case tree'));
        }

        this._showRoot = showRoot;

        if (showRoot) {
            this.dataSource.data = [this._rootNode];
        } else {
            this.dataSource.data = this._rootNode.children;
        }

        let ret: Observable<void>;
        if (!showRoot || this._isEagerLoaded) {
            const result = new ReplaySubject<void>(1);
            ret = result.asObservable();
            this.expandNode(this._rootNode).subscribe(() => {
                this.refreshTree();
                result.next();
                result.complete();
            });
        } else {
            this.refreshTree();
            ret = ofVoid();
        }
        return ret;
    }

    /**
     * Notifies the parent TreeCaseView that a case was clicked in the tree and it's Task should be displayed
     */
    public changeActiveNode(node: CaseTreeNode | undefined): void {
        this._currentNode = node;
        this._treeCaseViewService.loadTask$.next(node ? node.case : undefined);
    }

    /**
     * Toggles the expansion state of a node
     * @param node the {@link CaseTreeNode} who's content should be toggled
     */
    public toggleNode(node: CaseTreeNode): void {
        if (this._treeControl.isExpanded(node)) {
            this._treeControl.collapse(node);
        } else {
            this.expandNode(node);
        }
    }

    /**
     * Expands the target node in the tree and reloads it's children if they are marked as dirty
     * @param node the {@link CaseTreeNode} that should be expanded
     * @returns emits `true` if the node is expanded and `false` if not. If the expansion causes more node expansions
     * (e.g. eager loaded tree) then, the Observable emits after all the subtree expansions complete.
     */
    protected expandNode(node: CaseTreeNode): Observable<boolean> {
        this._logger.debug('Requesting expansion of tree node', node.toLoggableForm());

        if (node.loadingChildren.isActive) {
            this._logger.debug('Node requested for expansion is loading. Expansion canceled.');
            return of(false);
        }

        if (!node.dirtyChildren) {
            this._logger.debug('Node requested for expansion has clean children. Simple expansion.');
            this.treeControl.expand(node);
            return of(true);
        }

        const ret = new ReplaySubject<boolean>(1);
        this.updateNodeChildren(node).subscribe(() => {
            this._logger.debug('Node requested for expansion with dirty children had its children reloaded.');
            if (node.children.length > 0) {
                this._logger.debug('Node expanded.', node.toLoggableForm());
                this.treeControl.expand(node);
                if (this._isEagerLoaded) {
                    this._logger.debug(`Eager loading children of tree node with case id '${node.case.stringId}'`);
                    const innerObservables = node.children.map(childNode => this.expandNode(childNode));
                    // forkJoin doesn't emit with 0 input observables
                    innerObservables.push(of(true));
                    forkJoin(innerObservables).subscribe(() => {
                        ret.next(true);
                        ret.complete();
                    });
                } else {
                    ret.next(true);
                    ret.complete();
                }
            } else {
                ret.next(false);
                ret.complete();
            }
        });
        return ret.asObservable();
    }

    /**
     * Checks whether dirty children need to be reloaded and reloads them if needed.
     * @param node the {@link CaseTreeNode} who's children are updated
     * @returns emits when loading finishes
     */
    protected updateNodeChildren(node: CaseTreeNode): Observable<void> {
        node.loadingChildren.on();

        const childrenCaseRef = getImmediateData(node.case, TreePetriflowIdentifiers.CHILDREN_CASE_REF);
        if (!childrenCaseRef || childrenCaseRef.value.length === 0) {
            node.children = [];
            this.refreshTree();
            node.dirtyChildren = false;
            node.loadingChildren.off();
            return ofVoid();
        }

        if (node.children.length === childrenCaseRef.value.length) {
            const existingChildren = new Set<string>();
            node.children.forEach(childNode => existingChildren.add(childNode.case.stringId));
            if (childrenCaseRef.value.every(caseId => existingChildren.has(caseId))) {
                node.dirtyChildren = false;
                node.loadingChildren.off();
                return ofVoid();
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
        const requestBody = this.createChildRequestBody(node);
        if (!requestBody) {
            this._logger.error('Cannot create filter to find children of the given node', node.case);
            return throwError(new Error('Cannot create filter to find children of the given node'));
        }

        const done = new ReplaySubject<void>(1);

        let params: HttpParams = new HttpParams();
        params = params.set('page', `${pageNumber}`).set('sort', 'creationDate,asc');
        this._caseResourceService.getCases(requestBody, params).subscribe(page => {
            if (!hasContent(page)) {
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
                node.children.push(new CaseTreeNode(newCase, node));
            } else {
                node.children[position].case = newCase;
                node.dirtyChildren = true;
                this.treeControl.collapseDescendants(node.children[position]);
            }
        });
    }

    /**
     * @param node the {@link CaseTreeNode} who's children the {@link Filter} should return
     * @returns a request body that finds all child cases of the given `node`.
     * Returns `undefined` if the provided `node` doesn't contain enough information to create the request body.
     */
    protected createChildRequestBody(node: CaseTreeNode): CaseGetRequestBody {
        const childCaseRef = getImmediateData(node.case, TreePetriflowIdentifiers.CHILDREN_CASE_REF);
        if (!childCaseRef) {
            return undefined;
        }

        return {stringId: (childCaseRef.value as Array<string>)};
    }

    /**
     * Adds a child to the root node.
     *
     * Useful if you are using the layout where the root node is hidden.
     * @returns emits `true` if the child was successfully added, `false` if not
     */
    public addRootChildNode(): Observable<boolean> {
        const ret = new ReplaySubject<boolean>(1);
        this.addChildNode(this._rootNode).subscribe(added => {
            if (added) {
                if (!this._showRoot && this._treeDataSource.data.length === 0) {
                    this._treeDataSource.data = this._rootNode.children;
                    this.refreshTree();
                }
            }
            ret.next(added);
            ret.complete();
        });
        return ret;
    }

    /**
     * Adds a new child node to the given node based on the properties of the node's case
     * @returns emits `true` if the child was successfully added, `false` if not
     */
    public addChildNode(clickedNode: CaseTreeNode): Observable<boolean> {
        clickedNode.addingNode.on();
        const caseRefField = getImmediateData(clickedNode.case, TreePetriflowIdentifiers.CHILDREN_CASE_REF);

        if (caseRefField.allowedNets.length === 0) {
            this._logger.error(`Case ${clickedNode.case.stringId} can add new tree nodes but has no allowed nets`);
            clickedNode.addingNode.off();
            return of(false);
        }

        const ret = new ReplaySubject<boolean>(1);

        if (caseRefField.allowedNets.length === 1) {
            this.createAndAddChildCase(caseRefField.allowedNets[0], clickedNode, ret);
        } else {
            this._processService.getNets(caseRefField.allowedNets).subscribe(nets => {
                const sideMeuRef = this._sideMenuService.open(this._optionSelectorComponent, SideMenuSize.MEDIUM, {
                    title: clickedNode.case.title,
                    options: nets.map(net => ({text: net.title, value: net.identifier}))
                });
                let sideMenuSubscription: Subscription;
                sideMenuSubscription = sideMeuRef.onClose.subscribe(event => {
                    if (!!event.data) {
                        this.createAndAddChildCase(event.data.value, clickedNode, ret);
                        sideMenuSubscription.unsubscribe();
                    } else {
                        clickedNode.addingNode.off();
                        ret.next(false);
                        ret.complete();
                    }
                });
            });
        }
        return ret.asObservable();
    }

    /**
     * Creates a new case and adds it to the children of the specified node
     * @param processIdentifier identifier of the process that should be created
     * @param clickedNode the node that is the parent of the new case
     * @param operationResult the result of the operation will be emitted into this stream when the operation completes
     */
    protected createAndAddChildCase(processIdentifier: string,
                                    clickedNode: CaseTreeNode,
                                    operationResult: Subject<boolean>) {
        this._processService.getNet(processIdentifier).subscribe(net => {
            const childTitleImmediate = getImmediateData(clickedNode.case, TreePetriflowIdentifiers.CHILD_NODE_TITLE);
            let childTitle = this._translateService.instant('caseTree.newNodeDefaultName');
            if (!!childTitleImmediate) {
                childTitle = childTitleImmediate.value;
            } else if (!!net.defaultCaseName) {
                childTitle = net.defaultCaseName;
            }
            this._caseResourceService.createCase({
                title: childTitle,
                netId: net.stringId
            }).subscribe(childCase => {
                const caseRefField = getImmediateData(clickedNode.case, TreePetriflowIdentifiers.CHILDREN_CASE_REF);
                const setCaseRefValue = [...caseRefField.value, childCase.stringId];
                this.performCaseRefCall(clickedNode.case.stringId, setCaseRefValue).subscribe(
                    valueChange => this.updateTreeAfterChildAdd(clickedNode, valueChange ? valueChange : setCaseRefValue, operationResult)
                );
            });
        });
    }

    /**
     * Updates the tree after adding a new child
     * @param clickedNode the parent node
     * @param newCaseRefValue the new value of the parent node's case ref
     * @param operationResult the result of the operation will be emitted into this stream when the operation completes
     */
    protected updateTreeAfterChildAdd(clickedNode: CaseTreeNode, newCaseRefValue: Array<string>, operationResult: Subject<boolean>): void {
        this.updateNodeChildrenFromChangedFields(clickedNode, newCaseRefValue).subscribe(result => {
            clickedNode.addingNode.off();
            this.expandNode(clickedNode).subscribe(expandSuccess => {
                if (expandSuccess) {
                    this.changeActiveNode(clickedNode.children[clickedNode.children.length - 1]);
                    result.executeAfterActions();
                }
                operationResult.next(true);
                operationResult.complete();
            });
        });
    }

    /**
     * removes the provided non-root node if the underlying case allows it.
     *
     * The underlying case is removed from the case ref of it's parent element with the help from the `remove`
     * operation provided by case ref itself.
     * @param node the node that should be removed from the tree
     */
    public removeNode(node: CaseTreeNode): void {
        if (!node.parent) {
            this._logger.error('Case tree doesn\'t support removal of the root node, as it has no parent case ref.');
            return;
        }

        node.removingNode.on();
        const caseRefImmediate = getImmediateData(node.parent.case, TreePetriflowIdentifiers.CHILDREN_CASE_REF);
        const setCaseRefValue = (caseRefImmediate.value as Array<string>).filter(id => id !== node.case.stringId);
        this.performCaseRefCall(node.parent.case.stringId, setCaseRefValue).subscribe(caseRefChange => {
            const newCaseRefValue = caseRefChange ? caseRefChange : setCaseRefValue;
            this.deleteRemovedNodes(node.parent, newCaseRefValue);
            this.updateNodeChildrenFromChangedFields(node.parent, newCaseRefValue);

            node.removingNode.off();
        });

        this.deselectNodeIfDescendantOf(node);
    }

    /**
     * Expands all nodes in the tree dictated by the argument.
     *
     * @param path nodes that should be expanded along with their path from the root node
     */
    public expandPath(path: CaseTreePath): void {
        if (this.dataSource.data.length === 0) {
            return;
        }
        let rootNode = this.dataSource.data[0];
        while (rootNode.parent !== undefined) {
            rootNode = rootNode.parent;
        }
        this.expandLevel([rootNode], this.convertPathToExpansionTree(path));
    }

    /**
     * Transforms a {@Link CaseTreePath} object into an {@link ExpansionTree} object.
     * The result has all the common paths merged into single branches of the resulting tree structure.
     *
     * @param paths nodes that should be expanded along with their path from the root node
     * @returns an {@link ExpansionTree} equivalent to the provided {@link CaseTreePath}
     */
    protected convertPathToExpansionTree(paths: CaseTreePath): ExpansionTree {
        const result = {};
        Object.values(paths).forEach(path => {
            let currentNode = result;
            path.forEach(nodeId => {
                if (currentNode[nodeId] === undefined) {
                    currentNode[nodeId] = {};
                }
                currentNode = currentNode[nodeId];
            });
        });
        return result;
    }

    /**
     * Recursively expands all nodes from the provided array of nodes, that appear in the top level of the {@link ExpansionTree} object.
     *
     * @param levelNodes nodes from which the expansion should start
     * @param targets a tree structure representing the nodes that are to be expanded recursively.
     * The top level nodes are expanded first, from the provided `levelNodes`.
     */
    protected expandLevel(levelNodes: Array<CaseTreeNode>, targets: ExpansionTree): void {
        const desiredIds = new Set(Object.keys(targets));
        if (desiredIds.size === 0) {
            return;
        }

        levelNodes.forEach(n => {
            const node = n;
            if (!desiredIds.has(node.case.stringId)) {
                return; // continue
            }
            this.expandNode(node).subscribe(success => {
                if (!success) {
                    this._logger.debug('Could not expand tree node with ID: ' + node.case.stringId);
                    return;
                }
                this.expandLevel(node.children, targets[node.case.stringId]);
            });
        });
    }

    /**
     * Deletes the subtrees rooted at the nodes that are present in the parent node's child case ref values,
     * but are no longer present in the new value
     * @param parentNode an inner node of the tree that had some of it's children removed
     * @param newCaseRefValue the new value of the parent node's case ref
     */
    protected deleteRemovedNodes(parentNode: CaseTreeNode, newCaseRefValue: Array<string>): void {
        const removedChildren = new Set<string>();
        getImmediateData(parentNode.case, TreePetriflowIdentifiers.CHILDREN_CASE_REF).value.forEach(id => removedChildren.add(id));
        newCaseRefValue.forEach(id => removedChildren.delete(id));
        removedChildren.forEach(removedId => this._caseResourceService.deleteCase(removedId, true)
            .subscribe(responseMessage => {
                if (responseMessage.error) {
                    this._logger.error('Removal of child case unsuccessful', responseMessage.error);
                }
            }));
    }

    /**
     * Deselects the currently selected node if it is a descendant of the provided node
     * @param node the node who's descendants should be deselected
     */
    protected deselectNodeIfDescendantOf(node: CaseTreeNode): void {
        let bubblingNode = this.currentNode;
        while (bubblingNode && bubblingNode !== this._rootNode) {
            if (bubblingNode === node) {
                this.changeActiveNode(undefined);
                break;
            }
            bubblingNode = bubblingNode.parent;
        }
    }

    /**
     * Performs a backend call on the given case, and sets the value of the case ref field in the transition defined by
     * [CASE_REF_TRANSITION]{@link TreePetriflowIdentifiers#CASE_REF_TRANSITION}.
     * @param caseId string ID of the case that should have it's tree case ref set
     * @param newCaseRefValue the new value of the case ref field
     */
    private performCaseRefCall(caseId: string, newCaseRefValue: Array<string>): Observable<Array<string> | undefined> {
        const result$ = new ReplaySubject<Array<string>>(1);

        this._taskResourceService.getTasks(SimpleFilter.fromTaskQuery({
            case: {id: caseId},
            transitionId: TreePetriflowIdentifiers.CASE_REF_TRANSITION
        })).subscribe(page => {
            if (!hasContent(page)) {
                this._logger.error('Case ref accessor task doesn\'t exist!');
                result$.complete();
                return;
            }

            const task = page.content[0];

            this._taskResourceService.assignTask(task.stringId).subscribe(assignResponse => {
                if (!assignResponse.success) {
                    this._logger.error('Case ref accessor task could not be assigned', assignResponse.error);
                }

                const body = {};
                body[TreePetriflowIdentifiers.CHILDREN_CASE_REF] = {
                    type: 'caseRef',
                    value: newCaseRefValue
                };
                this._taskResourceService.setData(task.stringId, body).subscribe(changeContainer => {
                    const changedFields = changeContainer.changedFields;
                    const caseRefChanges = changedFields[TreePetriflowIdentifiers.CHILDREN_CASE_REF];
                    result$.next(caseRefChanges ? caseRefChanges.value : undefined);
                    result$.complete();
                    this._taskResourceService.finishTask(task.stringId).subscribe(finishResponse => {
                        if (finishResponse.success) {
                            this._logger.debug('Case ref accessor task finished', finishResponse.success);
                        } else {
                            this._logger.error('Case ref accessor task finish failed', finishResponse.error);
                        }
                    });
                }, error => {
                    this._logger.error('Could not set data to tree case ref', error);
                    result$.complete();
                });
            }, error => {
                this._logger.error('Case ref accessor task could not be assigned', error);
                result$.complete();
            });
        }, error => {
            this._logger.error('Case ref accessor task could not be found', error);
            result$.complete();
        });
        return result$.asObservable();
    }

    /**
     * Performs an update after adding or removing a node from the tree.
     *
     * If only one node was added adds it into the tree
     *
     * If only one node was removed removes it from the tree
     *
     * Otherwise collapses the affected node and marks it's children as dirty
     *
     * @param affectedNode node that had it's children changed
     * @param newCaseRefValue new value of the caseRef field returned by backend
     * @returns an `Observable` that emits an object with the [result]{@link ResultWithAfterActions#result} attribute set to `true` if
     * the update completes successfully and `false` otherwise.
     */
    private updateNodeChildrenFromChangedFields(affectedNode: CaseTreeNode,
                                                newCaseRefValue: Array<string>): Observable<ResultWithAfterActions<boolean>> {
        const caseRefField = getImmediateData(affectedNode.case, TreePetriflowIdentifiers.CHILDREN_CASE_REF);
        const newChildren = new Set<string>();
        newCaseRefValue.forEach(id => newChildren.add(id));

        let numberOfMissingChildren = 0;
        for (let i = 0; i < caseRefField.value.length && numberOfMissingChildren < 2; i++) {
            if (!newChildren.has(caseRefField.value[i])) {
                numberOfMissingChildren++;
            }
        }

        const exactlyOneChildAdded = caseRefField.value.length + 1 === newCaseRefValue.length
            && caseRefField.value.every(it => newChildren.has(it));

        const exactlyOneChildRemoved = caseRefField.value.length - 1 === newCaseRefValue.length
            && numberOfMissingChildren === 1;

        if (!exactlyOneChildAdded && !exactlyOneChildRemoved) {
            caseRefField.value = newCaseRefValue;
            this._treeControl.collapseDescendants(affectedNode);
            affectedNode.dirtyChildren = true;
            return of(new ResultWithAfterActions(true));
        }

        if (exactlyOneChildAdded) {
            return this.processChildNodeAdd(affectedNode, caseRefField, newCaseRefValue);
        } else {
            return this.processChildNodeRemove(affectedNode, caseRefField, newChildren);
        }
    }

    /**
     * Adds a new child node to the `affectedNode` by adding the last Case from the `newCaseRefValue`
     * @param affectedNode the node in the tree that had a child added - the parent node
     * @param caseRefField the case ref field of the affected node
     * @param newCaseRefValue the new value of the case ref field in the node
     * @returns an `Observable` that emits `true` if a node was successfully added, `false` otherwise.
     */
    protected processChildNodeAdd(affectedNode: CaseTreeNode,
                                  caseRefField: ImmediateData,
                                  newCaseRefValue: Array<string>): Observable<ResultWithAfterActions<boolean>> {
        const result$ = new ReplaySubject<ResultWithAfterActions<boolean>>(1);

        caseRefField.value = newCaseRefValue;
        this._caseResourceService.getOneCase(newCaseRefValue[newCaseRefValue.length - 1]).subscribe(childCase => {
            if (childCase) {
                this._logger.debug('Pushing child node to tree', {childCase, affectedNode: affectedNode.toLoggableForm()});
                const childNode = this.pushChildToTree(affectedNode, childCase);
                result$.next(new ResultWithAfterActions(true, [() => {
                    if (this._isEagerLoaded) {
                        this._logger.debug('Eagerly expanding a newly added node.', childNode.toLoggableForm());
                        this.expandNode(childNode);
                    }
                }]));
            } else {
                this._logger.error('New child case was not found, illegal state', childCase);
                result$.next(new ResultWithAfterActions(false));
            }
            result$.complete();
        }, error => {
            this._logger.error('New child node case could not be found', error);
            result$.next(new ResultWithAfterActions(false));
            result$.complete();
        });

        return result$.asObservable();
    }

    /**
     * Adds a new child node to the target parent node.
     * @param parentNode the nodes whose child should be added
     * @param childCase the child case
     * @returns the newly added node
     */
    protected pushChildToTree(parentNode: CaseTreeNode, childCase: Case): CaseTreeNode {
        const childNode = new CaseTreeNode(childCase, parentNode);
        parentNode.children.push(childNode);
        this.refreshTree();
        return childNode;
    }

    /**
     * Removes the deleted node from the children of the `affectedNode`
     * @param affectedNode the node in the tree that had it's child removed
     * @param caseRefField the case ref field of the affected node
     * @param newCaseRefValues the new value of the case ref field in the node
     * @returns an `Observable` that emits `true` when the remove operation completes.
     */
    protected processChildNodeRemove(affectedNode: CaseTreeNode,
                                     caseRefField: ImmediateData,
                                     newCaseRefValues: Set<string>): Observable<ResultWithAfterActions<boolean>> {
        const index = caseRefField.value.findIndex(it => !newCaseRefValues.has(it));
        caseRefField.value.splice(index, 1);
        affectedNode.children.splice(index, 1);
        this.refreshTree();
        return of(new ResultWithAfterActions(true));
    }

    /**
     * @ignore
     * Forces a rerender of the tree content
     */
    private refreshTree(): void {
        refreshTree(this._treeDataSource);
    }

    /**
     * Reloads the currently selected case node. The {@link Case} object held in the {@link CaseTreeNode} instance is not replaced,
     * but the new Case is `Object.assign`-ed into it. This means that the reference to the Case instance is unchanged but references
     * to all it's non-primitive attributes are changed.
     *
     * If a reload of the current node is initiated before the previous one completed, the new one is ignored.
     *
     * If the currently selected case changed before a response from backend was received the response is ignored.
     *
     * Note that the parent node, nor the child nodes are reloaded.
     */
    protected reloadCurrentCase(): void {
        if (!this._currentNode) {
            this._logger.debug('No Tree Case Node selected, nothing to reload');
            return;
        }
        if (this._reloadedCaseId && this._currentNode.case.stringId !== this._reloadedCaseId) {
            this._logger.debug('Reload of the current case already in progress');
            return;
        }
        this._reloadedCaseId = this._currentNode.case.stringId;
        this._caseResourceService.getOneCase(this._currentCase.stringId).subscribe(reloadedCurrentCase => {
            if (!reloadedCurrentCase) {
                this._logger.error('Current Case Tree Node could not be reloaded. Invalid server response', reloadedCurrentCase);
                return;
            }
            if (this._currentNode && reloadedCurrentCase.stringId === this._currentNode.case.stringId) {
                this._reloadedCaseId = undefined;
                const change = this.determineCaseUpdate(this._currentCase, reloadedCurrentCase);
                Object.assign(this._currentCase, reloadedCurrentCase);
                this._treeCaseViewService.loadTask$.next(this._currentCase);
                if (change.visibleTreePropertiesChanged) {
                    this.refreshTree();
                }
                if (change.childrenChanged) {
                    this._currentNode.dirtyChildren = true;
                    this.expandNode(this._currentNode);
                }
                this._logger.debug('Current Case Tree Node reloaded');
            } else {
                this._logger.debug('Discarding case reload response, since the current node has changed before its case was received');
            }
        }, error => {
            this._logger.error('Current Case Tree Node reload request failed', error);
        });
    }

    /**
     * Determines if anny of the case attributes that are visible on the tree changed.
     * @param oldCase the previous version of the Case object, that is currently displayed on the tree
     * @param newCase the new version of the Case object, that should replace the old one
     */
    private determineCaseUpdate(oldCase: Case, newCase: Case): CaseUpdateResult {
        const visibleAttributes = [
            TreePetriflowIdentifiers.CAN_ADD_CHILDREN,
            TreePetriflowIdentifiers.CAN_REMOVE_NODE,
            TreePetriflowIdentifiers.BEFORE_TEXT_ICON,
            TreePetriflowIdentifiers.TREE_ADD_ICON
        ];

        const result: CaseUpdateResult = {
            visibleTreePropertiesChanged: true, // for short-circuiting the evaluation, if nodes children changed
            childrenChanged: false
        };

        const oldChildCaseRef = getImmediateData(oldCase, TreePetriflowIdentifiers.CHILDREN_CASE_REF);
        if (oldChildCaseRef !== undefined) {
            const oldChildren = new Set(oldChildCaseRef.value);
            const newChildren = new Set(getImmediateData(newCase, TreePetriflowIdentifiers.CHILDREN_CASE_REF).value);

            result.childrenChanged = oldChildren.size !== newChildren.size;
            if (!result.childrenChanged) {
                result.childrenChanged = Array.from(oldChildren).some(childId => !newChildren.has(childId));
            }

            // short-circuit
            if (result.childrenChanged) {
                return result;
            }
        }

        result.visibleTreePropertiesChanged = visibleAttributes.some(attribute => {
            return getImmediateData(oldCase, attribute)
                && getImmediateData(oldCase, attribute).value !== getImmediateData(newCase, attribute).value;
        });

        return result;
    }
}
