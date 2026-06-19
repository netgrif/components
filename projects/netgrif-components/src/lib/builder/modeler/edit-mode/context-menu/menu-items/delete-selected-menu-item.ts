import {SelectTool} from '../../services/modes/select-tool';
import {MenuItem} from './menu-item';

export class DeleteSelectedMenuItem extends MenuItem {

    constructor(selectTool: SelectTool) {
        super(
            `Delete${selectTool.selectedElements.totalSize() > 1 ? ' all' : ''}`,
            'delete',
            () => {
                selectTool.deleteSelected();
            }
        );
    }
}
