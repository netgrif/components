import {AfterViewInit, Component} from '@angular/core';
import {Router} from '@angular/router';
import {DataGroup, LayoutType} from '@netgrif/petriflow';
import {ModelerConfig} from '../modeler/modeler-config';
import {ModelerUtils} from '../modeler/modeler-utils';
import {SelectedTransitionService} from '../modeler/selected-transition.service';
import {ModelService} from '../modeler/services/model/model.service';
import {BuilderMode, BuilderModeService} from "../builder-mode.service";

@Component({
    selector: 'nc-builder-form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements AfterViewInit {
    title = 'form-builder';
    width: number;

    constructor(private router: Router,
                private modelService: ModelService,
                private transitionService: SelectedTransitionService,
                private _builderModeService: BuilderModeService) {
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
    }

    onResizeEvent(event: any): void {
        if (event.rectangle.width > 450) {
            this.width = 450;
        } else if (event.rectangle.width < 200) {
            this.width = 200;
        } else {
            this.width = event.rectangle.width;
        }
    }
}
