import {AfterViewInit, Component, Input} from '@angular/core';
import {CaseRefField} from '@netgrif/components-core';
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
export class CaseRefFieldComponent implements AfterViewInit{

    @Input() public dataField: CaseRefField;

    constructor(private _petriflowCanvasService: PetriflowCanvasService, private _petriflowFactoryService: PetriflowCanvasFactoryService,
                private _petriflowConfigService: PetriflowCanvasConfigurationService){
    }

    ngAfterViewInit(): void {
        const transition = this._petriflowFactoryService.createTransition(new DOMPoint(100, 100));
        this._petriflowConfigService.addTransitionEvents(transition);

        const place = this._petriflowFactoryService.createPlace(1, new DOMPoint(150, 100));
        this._petriflowConfigService.addPlaceEvents(place);
    }

}
