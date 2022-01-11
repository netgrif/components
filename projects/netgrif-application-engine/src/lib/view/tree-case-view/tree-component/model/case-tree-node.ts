import {Case} from '../../../../resources/interface/case';
import {LoadingEmitter} from '../../../../utility/loading-emitter';
import {TreePetriflowIdentifiers} from '../../model/tree-petriflow-identifiers';
import {ImmediateData} from '../../../../resources/interface/immediate-data';

export class CaseTreeNode {
    public case: Case;
    public children: Array<CaseTreeNode>;
    public dirtyChildren: boolean;
    public loadingChildren: LoadingEmitter;
    public removingNode: LoadingEmitter;
    public addingNode: LoadingEmitter;
    public parent: CaseTreeNode;

    constructor(nodeCase: Case, parentNode: CaseTreeNode) {
        this.case = nodeCase;
        this.children = [];
        this.dirtyChildren = true;
        this.loadingChildren = new LoadingEmitter();
        this.removingNode = new LoadingEmitter();
        this.addingNode = new LoadingEmitter();
        this.parent = parentNode;
    }

    /**
     * @returns whether this node has the value `true` in it's [immediate data field]{@link TreePetriflowIdentifiers#CAN_ADD_CHILDREN}
     * that controls this behavior.
     */
    public canAddChildren(): boolean {
        const immediate = this.searchImmediateData(TreePetriflowIdentifiers.CAN_ADD_CHILDREN);
        return !!immediate && immediate.value;
    }

    /**
     * @returns whether this node has the value `true` in it's [immediate data field]{@link TreePetriflowIdentifiers#CAN_REMOVE_NODE}
     * that controls this behavior.
     */
    public canBeRemoved(): boolean {
        const immediate = this.searchImmediateData(TreePetriflowIdentifiers.CAN_REMOVE_NODE);
        return this.parent && !!immediate && immediate.value;
    }

    /**
     * @returns whether this node's children are currently being loaded
     */
    public isLoadingChildren(): boolean {
        return this.loadingChildren.isActive;
    }

    /**
     * @returns whether this node is being removed from the tree
     */
    public isBeingRemoved(): boolean {
        return this.removingNode.isActive;
    }

    /**
     * @returns whether children are being added to this node
     */
    public isAddingNode(): boolean {
        return this.addingNode.isActive;
    }

    /**
     * @returns return node value, if immediate date of [immediate data field]{@link TreePetriflowIdentifiers#BEFORE_TEXT_ICON} type exists
     */
    public beforeTextIcon(): string {
        const immediate = this.searchImmediateData(TreePetriflowIdentifiers.BEFORE_TEXT_ICON);
        if (immediate === undefined) {
            return undefined;
        }
        return immediate.value;
    }

    /**
     * @returns return node value, if immediate date of [immediate data field]{@link TreePetriflowIdentifiers#TREE_ADD_ICON} type exists
     */
    public treeAddTextIcon(): string {
        const immediate = this.searchImmediateData(TreePetriflowIdentifiers.TREE_ADD_ICON);
        if (immediate === undefined) {
            return undefined;
        }
        return immediate.value;
    }

    /**
     * @returns return node title, if immediate date of [immediate data field]{@link TreePetriflowIdentifiers#BEFORE_TEXT_ICON} type exists
     */
    public beforeTextIconTitle(): string {
        const immediate = this.searchImmediateData(TreePetriflowIdentifiers.BEFORE_TEXT_ICON);
        if (immediate === undefined || !(immediate.name && immediate.name.defaultValue)) {
            return undefined;
        }
        return immediate.name.defaultValue;
    }

    /**
     * @returns return node title if immediate date of [immediate data field]{@link TreePetriflowIdentifiers#TREE_ADD_ICON} type exists
     */
    public treeAddTextIconTitle(): string {
        const immediate = this.searchImmediateData(TreePetriflowIdentifiers.TREE_ADD_ICON);
        if (immediate === undefined || !(immediate.name && immediate.name.defaultValue)) {
            return undefined;
        }
        return immediate.name.defaultValue;
    }

    private searchImmediateData(dataId: string): ImmediateData | undefined {
        return this.case.immediateData.find(data => data.stringId === dataId);
    }

    /**
     * @returns an object representing the same CaseTreeNode, but with circular references removed, so that it can be serialized and logged.
     * The [parent]{@link CaseTreeNode#parent} reference is replaced by the parents case stringId (if defined).
     * The [children]{@link CaseTreeNode#children} references are replaced by the child's case stringId (if defined).
     */
    public toLoggableForm(): object {
        return {
            case: this.case,
            dirtyChildren: this.dirtyChildren,
            parent: this.parent ? this.parent.case.stringId : this.parent,
            children: this.children.map(c => c.case.stringId),
        };
    }
}
