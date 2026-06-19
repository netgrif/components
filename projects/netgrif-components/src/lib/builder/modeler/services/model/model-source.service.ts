import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {PetriNet} from '@netgrif/petriflow';
import {SimulationModeComponent} from '../../simulation-mode/simulation-mode.component';
import {SimulationModeService} from '../../simulation-mode/simulation-mode.service';
import {ModelService} from './model.service';

@Injectable()
export class ModelSourceService {

    constructor(
        private router: Router,
        private modelService: ModelService,
        private simulationService: SimulationModeService
    ) {
    }

    public getModel(): PetriNet {
        if (this.router.url.includes(SimulationModeComponent.URL)) {
            return this.simulationService.model;
        }
        return this.modelService.model;
    }
}
