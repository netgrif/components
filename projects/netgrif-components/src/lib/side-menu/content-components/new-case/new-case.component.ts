import {Component, Inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {TranslateService} from '@ngx-translate/core';
import {HotkeysService} from 'angular2-hotkeys';
import {
    AbstractNewCaseComponent,
    CaseResourceService,
    NAE_SIDE_MENU_CONTROL,
    SideMenuControl,
    SnackBarService
} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-new-case',
    templateUrl: './new-case.component.html',
    styleUrls: ['./new-case.component.scss'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
    }]
})
export class NewCaseComponent extends AbstractNewCaseComponent {

    isVersionVisible: boolean;

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                protected _formBuilder: FormBuilder,
                protected _snackBarService: SnackBarService,
                protected _caseResourceService: CaseResourceService,
                _hotkeysService: HotkeysService,
                protected _translate: TranslateService) {
        super(_sideMenuControl, _formBuilder, _snackBarService, _caseResourceService, _hotkeysService, _translate);
        this.isVersionVisible = _sideMenuControl.isVersionVisible;
    }

}
