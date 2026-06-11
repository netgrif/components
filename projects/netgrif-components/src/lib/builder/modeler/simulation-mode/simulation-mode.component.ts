import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {PetriflowCanvasService} from '@netgrif/petriflow.svg';
import {ModelerUtils} from '../modeler-utils';
import {ModelService} from '../services/model/model.service';
import {SimulationModeService} from './simulation-mode.service';

@Component({
    selector: 'nc-builder-simulation-mode',
    templateUrl: './simulation-mode.component.html',
    styleUrls: ['./simulation-mode.component.scss']
})
export class SimulationModeComponent implements AfterViewInit, OnDestroy {
    public static readonly URL = 'simulation';
    @ViewChild('canvas') canvas: ElementRef;

    constructor(
        public canvasService: PetriflowCanvasService,
        private simulationService: SimulationModeService,
        private modelService: ModelService
    ) {
    }

    @HostListener('contextmenu', ['$event'])
    onRightClick(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

    ngAfterViewInit() {
        ModelerUtils.clearSelection();
        this.simulationService.originalModel.next(this.modelService.model);
        this.simulationService.activate();
    }

    ngOnDestroy(): void {
        this.simulationService.activeTool.unbind();
    }
}
