import {Case} from '../../../../resources/interface/case';
import {LoadingEmitter} from '../../../../utility/loading-emitter';

export class CaseTreeNode {
    public case: Case;
    public children: Array<CaseTreeNode>;
    public dirtyChildren: boolean;
    public loadingChildren: LoadingEmitter;

    constructor(nodeCase: Case) {
        this.case = nodeCase;
        this.children = [];
        this.dirtyChildren = true;
        this.loadingChildren = new LoadingEmitter();
    }
}
