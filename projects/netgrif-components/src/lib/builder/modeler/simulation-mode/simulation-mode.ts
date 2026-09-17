import {Injector} from '@angular/core';
import {TutorialStep} from '../../tutorial/tutorial-step';
import {ControlPanelButton} from '../control-panel/control-panel-button';
import {ControlPanelIcon} from '../control-panel/control-panel-icon';
import {Mode} from '../control-panel/modes/mode';
import {TranslateService} from "@ngx-translate/core";

export class SimulationMode extends Mode {

    constructor(
        tutorialStep: TutorialStep,
        injector: Injector,
        translateService: TranslateService
    ) {
        super(
            'simulation',
            new ControlPanelButton(
                new ControlPanelIcon('play_circle'),
                translateService.instant('builder.modeler.simulation-mode.simulationView')
            ),
            './simulation',
            '/modeler/simulation',
            tutorialStep,
            injector
        );
    }
}
