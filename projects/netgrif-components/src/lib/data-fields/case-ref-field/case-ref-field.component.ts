import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractCaseRefFieldComponent,
    CaseResourceService,
    PetriNetResourceService,
    LoggerService,
    SnackBarService, NAE_INFORM_ABOUT_INVALID_DATA
} from '@netgrif/components-core';
import {
    PetriflowCanvasConfigurationService,
    PetriflowCanvasFactoryService,
    PetriflowCanvasService
} from '@netgrif/petriflow.svg';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'nc-case-ref-field',
  templateUrl: './case-ref-field.component.html',
  styleUrls: ['./case-ref-field.component.scss']
})
export class CaseRefFieldComponent extends AbstractCaseRefFieldComponent {

    constructor(protected _petriflowCanvasService: PetriflowCanvasService, protected _petriflowFactoryService: PetriflowCanvasFactoryService,
                protected _petriflowConfigService: PetriflowCanvasConfigurationService, protected _caseResourceService: CaseResourceService,
                protected _petriNetResourceService: PetriNetResourceService, protected _log: LoggerService, protected _snackBar: SnackBarService,
                protected _translate: TranslateService, @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null){
        super(_petriflowCanvasService, _petriflowFactoryService, _petriflowConfigService, _caseResourceService, _petriNetResourceService,
            _log, _snackBar, _translate, informAboutInvalidData);
    }

}
