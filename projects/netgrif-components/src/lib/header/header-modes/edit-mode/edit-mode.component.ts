import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractEditModeComponent, SnackBarService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-edit-mode',
    templateUrl: './edit-mode.component.html',
    styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent extends AbstractEditModeComponent {
    constructor(protected _translate: TranslateService,
                protected _snackbar: SnackBarService) {
        super(_translate, _snackbar);
    }
}
