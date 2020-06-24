import {Case} from '../../../../resources/interface/case';

export interface CaseTreeNode {
    case: Case;
    children: CaseTreeNode[];
    dirtyChildren: boolean;
}
