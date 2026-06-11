import {Component} from '@angular/core';
import {PetriNet, Transition} from '@netgrif/petriflow';
import {SelectedTransitionService} from '../../modeler/selected-transition.service';
import {ModelService} from '../../modeler/services/model/model.service';
import {BuilderModeService, BuilderMode} from "../../builder-mode.service";

@Component({
    selector: 'nc-builder-info-label',
    templateUrl: './info-label.component.html',
    styleUrls: ['./info-label.component.scss']
})
export class InfoLabelComponent {

    models: Array<PetriNet>;
    transitions: Array<Transition>;
    selectedTransition: Transition;

    constructor(
        private modelService: ModelService,
        private builderModeService: BuilderModeService,
        private transitionService: SelectedTransitionService,
    ) {
        const id = this.transitionService.id;
        if (id) {
            this.selectedTransition = this.modelService.model.getTransition(id);
        }
    }

    redirect() {
        this.builderModeService.mode = BuilderMode.MODELER;
    }
}
