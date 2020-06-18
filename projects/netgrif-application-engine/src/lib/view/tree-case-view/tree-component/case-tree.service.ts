import {Injectable} from '@angular/core';
import {Filter} from '../../../filter/models/filter';
import {HttpParams} from '@angular/common/http';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {MatTreeNestedDataSource} from '@angular/material';
import {CaseTreeNode} from './interfaces/CaseTreeNode';
import {NestedTreeControl} from '@angular/cdk/tree';
import {TreeCaseViewService} from '../tree-case-view.service';
import {Case} from '../../../resources/interface/case';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {ImmediateData} from '../../../resources/interface/immediate-data';
import {SimpleFilter} from '../../../filter/models/simple-filter';
import {FilterType} from '../../../filter/models/filter-type';

@Injectable()
export class CaseTreeService {

    private _rootNodesFilter: Filter;
    private _treeDataSource: MatTreeNestedDataSource<CaseTreeNode>;
    private _treeControl: NestedTreeControl<CaseTreeNode>;

    constructor(protected _caseResourceService: CaseResourceService,
                protected _treeCaseViewService: TreeCaseViewService,
                protected _taskResourceService: TaskResourceService,
                protected _logger: LoggerService) {
        this._treeDataSource = new MatTreeNestedDataSource<CaseTreeNode>();
        this._treeControl = new NestedTreeControl<CaseTreeNode>(node => node.children);
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

    /**
     * Notifies the parent TreeCaseView that a case was clicked in the tree and it's Task should be displayed
     */
    public openCaseTask(clickedCase: Case): void {
        this._treeCaseViewService.case.next(clickedCase);
    }

    /**
     * Adds a new child node to the given node based on the properties of the node's case
     */
    public addChildNode(clickedNode: CaseTreeNode): void {
        // TODO support with multiple allowed nets
        this._taskResourceService.getTasks({
            case: clickedNode.case.stringId,
            transition: 'add_tree_child'
        }).subscribe( page => {
            if (page.content.length === 0) {
                // TODO notify user about error
                this._logger.error('Task for adding tree nodes doesn\'t exist');
            }
            const task = page.content[0];
            const caseRefField = clickedNode.case.immediateData.find(it => it.stringId === 'treeChildCases');
            this._taskResourceService.setData(task.stringId, {
                treeChildCases: {
                    type: 'caseRef',
                    value: {
                        operation: 'add',
                        title: 'New Node', // TODO some default value for each case?
                        processId: caseRefField.allowedNets[0]
                    }
                }
            }).subscribe( changeContainer => {
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
        }, error => {
            // TODO notify user about error
            this._logger.error('Task for adding tree nodes could not be found', error);
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

    private refreshTree(): void {
        const d = this._treeDataSource.data;
        this._treeDataSource.data = null;
        this._treeDataSource.data = d;
    }

    protected loadNodes() {
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
}
