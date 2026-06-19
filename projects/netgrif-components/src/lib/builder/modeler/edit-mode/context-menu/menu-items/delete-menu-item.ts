import {MenuItem} from './menu-item';

export abstract class DeleteMenuItem extends MenuItem {

    protected constructor(onClick: () => void) {
        super(
            'Delete',
            'delete',
            onClick
        );
    }
}
