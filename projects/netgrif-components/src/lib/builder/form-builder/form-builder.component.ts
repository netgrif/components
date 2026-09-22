import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DataGroup, LayoutType} from '@netgrif/petriflow';
import {ModelerConfig} from '../modeler/modeler-config';
import {ModelerUtils} from '../modeler/modeler-utils';
import {SelectedTransitionService} from '../modeler/selected-transition.service';
import {ModelService} from '../modeler/services/model/model.service';
import {BuilderMode, BuilderModeService} from "../services/builder-mode.service";
import {GridsterService} from './gridster/gridster.service';

@Component({
    selector: 'nc-builder-form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements AfterViewInit, OnDestroy {
    title = 'form-builder';
    width: number;

    @ViewChild('rightPanel') rightPanel: ElementRef<HTMLDivElement>;
    private rightPanelResizeObserver: ResizeObserver;

    constructor(private router: Router,
                private modelService: ModelService,
                private transitionService: SelectedTransitionService,
                private _builderModeService: BuilderModeService,
                private _gridsterService: GridsterService) {
        if (!this.modelService.model) {
            this._builderModeService.mode = BuilderMode.MODELER;
        }
        if (this.modelService.model.getTransition(this.transitionService.id)?.dataGroups?.length === 0) {
            const dataGroup = new DataGroup(`${this.transitionService.id}_0`);
            dataGroup.layout = LayoutType.GRID;
            dataGroup.cols = ModelerConfig.LAYOUT_DEFAULT_COLS;
            this.modelService.model.getTransition(this.transitionService.id).dataGroups.push(dataGroup);
        }
    }

    ngAfterViewInit(): void {
        ModelerUtils.clearSelection();
        this.rightPanelResizeObserver = new ResizeObserver(() => {
            this._gridsterService.options?.api?.optionsChanged();
        });
        this.rightPanelResizeObserver.observe(this.rightPanel.nativeElement);
    }

    ngOnDestroy(): void {
        this.rightPanelResizeObserver?.disconnect();
    }

    onResizeEvent(event: any): void {
        if (event.rectangle.width > 450) {
            this.width = 450;
        } else if (event.rectangle.width < 200) {
            this.width = 200;
        } else {
            this.width = event.rectangle.width;
        }
        this._gridsterService.options?.api?.optionsChanged();
    }
}
