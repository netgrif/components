import {MenuItem} from './menu-item';
import {TranslateService} from "@ngx-translate/core";

export abstract class DeleteMenuItem extends MenuItem {

    protected constructor(onClick: () => void, translateService: TranslateService) {
        super(
            translateService.instant('builder.modeler.edit-mode.context-menu.delete'),
            'delete',
            onClick
        );
    }
}
