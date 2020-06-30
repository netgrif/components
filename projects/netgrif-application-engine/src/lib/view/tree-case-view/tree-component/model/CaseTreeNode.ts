import {Case} from '../../../../resources/interface/case';
import {LoadingEmitter} from '../../../../utility/loading-emitter';
import {TreePetriflowIdentifiers} from '../../model/tree-petriflow-identifiers';
import {ImmediateData} from '../../../../resources/interface/immediate-data';

export class CaseTreeNode {
    public case: Case;
    public children: Array<CaseTreeNode>;
    public dirtyChildren: boolean;
    public loadingChildren: LoadingEmitter;
    public parent: CaseTreeNode;

    constructor(nodeCase: Case, parentNode: CaseTreeNode) {
        this.case = nodeCase;
        this.children = [];
        this.dirtyChildren = true;
        this.loadingChildren = new LoadingEmitter();
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
        return !!immediate && immediate.value;
    }

    private searchImmediateData(dataId: string): ImmediateData | undefined {
        return this.case.immediateData.find(data => data.stringId === dataId);
    }
}
