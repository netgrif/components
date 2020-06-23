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

@Injectable()
export class CaseTreeService {

    protected _currentNode: CaseTreeNode;
    private _rootNodesFilter: Filter;
    private readonly _treeDataSource: MatTreeNestedDataSource<CaseTreeNode>;
    private readonly _treeControl: NestedTreeControl<CaseTreeNode>;

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
    }

    public set rootFilter(filter: Filter) {
        this._rootNodesFilter = filter;
        this.loadNodes();
    }

    public get dataSource(): MatTreeNestedDataSource<CaseTreeNode> {
        return this._treeDataSource;
    }

    public get treeControl(): NestedTreeControl<CaseTreeNode> {
        return this._treeControl;
    }

    protected get _currentCase(): Case | undefined {
        return this._currentNode ? this._currentNode.case : undefined;
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
            if (!Array.isArray(clickedNode.children)) {
                clickedNode.children = [];
            }
            clickedNode.children.push({
                case: page.content[0],
            });
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

    protected loadNodes() {
        // TODO pagination
        if (this._rootNodesFilter) {
            let params: HttpParams = new HttpParams();
            params = params.set('size', 100 + '');
            params = params.set('page', 0 + '');
            this._caseResourceService.searchCases(this._rootNodesFilter, params).subscribe(cases => {
                if (cases && cases.content && Array.isArray(cases.content)) {
                    const array = [];
                    cases.content.forEach(c => {
                        array.push({case: c});
                    });
                    this.dataSource.data = array;
                }
            });
        }
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
            this._caseResourceService.searchCases(this.createCaseFilter(this._currentCase.stringId)).subscribe( page => {
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
