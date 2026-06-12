import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {DataVariable, FunctionScope, PetriflowFunction, Role, Transition} from '@netgrif/petriflow';
import {HistoryService} from '../../services/history/history.service';
import {ModelService} from '../../services/model/model.service';
import {ActionEditorTreeService} from '../action-editor/action-editor-tree.service';
import {ActionEditorService} from '../action-editor/action-editor.service';
import {actions} from '../action-editor/classes/command-action';
import {ActionType, ChangeType} from '../action-editor/classes/editable-action';
import {LeafNode, TreeNode} from '../action-editor/classes/leaf-node';
import {MasterItem} from '../action-editor/classes/master-item';
import {ActionsMasterDetailService} from '../actions-master-detail.service';
import {Scope} from '../actions-mode.component';
import {ActionsModeService} from '../actions-mode.service';
import {ActionChangedEvent} from "../action-editor/action-editor-list/action-changed-event";

@Component({
  selector: 'nc-builder-action-detail',
  templateUrl: './action-detail.component.html',
  styleUrl: './action-detail.component.scss'
})
export class ActionDetailComponent implements OnInit, OnDestroy {

    functionScopes: Array<Scope> = [
        {viewValue: 'Process', value: FunctionScope.PROCESS},
        {viewValue: 'Namespace', value: FunctionScope.NAMESPACE},
    ];
    // TREE
    public treeControl = new NestedTreeControl<TreeNode>(node => node.children);
    public dataSource = new MatTreeNestedDataSource<TreeNode>();
    public loading: boolean;

    constructor(private _modelService: ModelService,
                private _actionsModeService: ActionsModeService,
                private actionEditorService: ActionEditorService,
                private _masterService: ActionsMasterDetailService,
                private _actionEditorTreeService: ActionEditorTreeService,
                private _historyService: HistoryService) {
    }

    ngOnInit(): void {
        this._masterService.getSelected$().subscribe(item => {
            if (this.actionEditorService.historySave) {
                this._historyService.save("Actions have been changed.");
                this.actionEditorService.historySave = false;
            }
            if (item instanceof Transition) {
                const transition = this._modelService.model.getTransition(item.id);
                this.actionEditorService.populateEditedActionsFromTransition(transition);
                this.dataSource.data = this._actionEditorTreeService.createTransitionTreeStructure(this.actionEditorService.editedActions, (leaf: TreeNode, actionCount: number) => this.collapseParentCallback(leaf, actionCount));
            } else if (item instanceof DataVariable) {
                const dataVar = this._modelService.model.getData(item.id);
                this.actionEditorService.populateEditedActionsFromDataVariable(dataVar);
                const hiddenParent = {
                    type: ActionType.DATA,
                    actionCount: undefined, // attribute is required but the hiddenParent doesn't use it
                    children: this._actionEditorTreeService.createDatafieldTreeStructure(this.actionEditorService.editedActions[0].editableActions, (leaf: TreeNode, actionCount: number) => this.collapseParentCallback(leaf, actionCount))
                };
                hiddenParent.children.forEach(child => {
                    child.parent = hiddenParent;
                });
                this.dataSource.data = hiddenParent.children;
            } else if (item instanceof MasterItem) {
                if (item.type === ActionType.CASE) {
                    this.actionEditorService.populateEditedActionsFromCaseEvents(item);
                } else {
                    this.actionEditorService.populateEditedActionsFromProcessEvents(item);
                }
                const hiddenParent = {
                    type: item.type,
                    actionCount: undefined,
                    children: this._actionEditorTreeService.createCaseTreeStructure(this.actionEditorService.editedActions[0].editableActions, item.type, (leaf: TreeNode, actionCount: number) => this.collapseParentCallback(leaf, actionCount))
                };
                hiddenParent.children.forEach(child => {
                    child.parent = hiddenParent;
                });
                this.dataSource.data = hiddenParent.children;
            } else if (item instanceof Role) {
                const role = this._modelService.model.getRole(item.id);
                this.actionEditorService.populateEditedActionsFromRole(role);
                this.dataSource.data = this._actionEditorTreeService.createRoleTreeStructure(this.actionEditorService.editedActions[0].editableActions, (leaf: TreeNode, actionCount: number) => this.collapseParentCallback(leaf, actionCount));
            }
        })
    }

    ngOnDestroy() {
        if (this.actionEditorService.historySave) {
            this._historyService.save("Actions have been changed.");
            this.actionEditorService.historySave = false;
        }
    }

    isFunctionsModeSelected(): boolean {
        return this._actionsModeService.activeTool.id === 'functions';
    }

    newAction(node: TreeNode): void {
        const newAction = (node.children[0] as LeafNode).addAction(node.type, node.event, node.phase);
        this.treeControl.expand(node);

        newAction.changeType = ChangeType.CREATED;
        this.actionEditorService.saveActionChange(newAction);
    }

    actionChangedListener(changeEvent: ActionChangedEvent, emittingNode: TreeNode): void {
        if (changeEvent.action.changeType === ChangeType.MOVED) {
            this.moveNodeInTree(changeEvent, emittingNode);
        }

        this.actionEditorService.saveActionChange(changeEvent.action);
    }

    moveNodeInTree(changeEvent: ActionChangedEvent, emittingNode: TreeNode): void {
        let node = emittingNode;
        // emitting node is the leaf node and thus we need to traverse up one extra node to reach the desired ancestor node
        for (let i = 0; i < changeEvent.triggerPath.length + 1; i++) {
            node = node.parent;
        }
        for (const key of changeEvent.triggerPath) {
            node = node.children.find(it => it.id === key);
        }
        // same as above, we need to dive one node deeper to reach our desired leaf
        node = node.children[0];

        if (node instanceof LeafNode) {
            node.pushAction(changeEvent.action);
        }
    }

    isInnerNode(_: number, node: TreeNode): boolean {
        return !!node.children && node.children.length > 0 && !node.canAdd;
    }

    isAddNode(_: number, node: TreeNode): boolean {
        return !!node.canAdd;
    }

    isLeafNode(_: number, node: TreeNode): boolean {
        return node instanceof LeafNode;
    }

    actionsExpandable(parentNode: TreeNode): boolean {
        const child = parentNode.children[0];
        return child instanceof LeafNode && child.hasDisplayableActions();
    }

    collapseParentCallback(leaf: TreeNode, actionCount: number) {
        if (actionCount === 0) {
            this.treeControl.collapse(leaf.parent);
        }
    }

    get selectedFn(): PetriflowFunction {
        return this._masterService.getSelected() as PetriflowFunction;
    }

    isFunctionSelected(): boolean {
        return this._masterService.getSelected() instanceof PetriflowFunction;
    }

    updateFunctions() {
        actions[actions.length - 1].actions = this._modelService.model.functions.map(fn => {
            return {
                label: fn.name,
                action: `${fn.name}()`,
            };
        });
    }


}
