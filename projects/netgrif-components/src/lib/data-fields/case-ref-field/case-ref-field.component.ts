import {Component} from '@angular/core';
import {AbstractCaseRefFieldComponent, CaseResourceService, PetriNetResourceService} from '@netgrif/components-core';
import {
    PetriflowCanvasConfigurationService,
    PetriflowCanvasFactoryService,
    PetriflowCanvasService
} from '@netgrif/petriflow.svg';

@Component({
  selector: 'nc-case-ref-field',
  templateUrl: './case-ref-field.component.html',
  styleUrls: ['./case-ref-field.component.scss']
})
export class CaseRefFieldComponent extends AbstractCaseRefFieldComponent {

    constructor(protected _petriflowCanvasService: PetriflowCanvasService, protected _petriflowFactoryService: PetriflowCanvasFactoryService,
                protected _petriflowConfigService: PetriflowCanvasConfigurationService, protected _caseResourceService: CaseResourceService,
                protected _petriNetResourceService: PetriNetResourceService){
        super(_petriflowCanvasService, _petriflowFactoryService, _petriflowConfigService, _caseResourceService, _petriNetResourceService);
    }

}
