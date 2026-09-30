import {Injectable} from '@angular/core';
import {PetriflowCanvasService} from '@netgrif/petriflow.svg';
import {TutorialService} from '../../../tutorial/tutorial-service';
import {ModelExportService} from '../../services/model/model-export.service';
import {ControlPanelButton} from '../control-panel-button';
import {ControlPanelIcon} from '../control-panel-icon';
import {Tool} from '../tools/tool';
import {ToolComponent} from "../tools/tool-component/tool.component";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class SvgExportTool extends Tool {

    constructor(
        private exportService: ModelExportService,
        private canvasService: PetriflowCanvasService,
        tutorialService: TutorialService,
        translateService: TranslateService
    ) {
        super(
            'svg_export',
            new ControlPanelButton(
                new ControlPanelIcon('save_as', false, true),
                translateService.instant('builder.modeler.control-panel.exportSvg'),
            ),
            ToolComponent,
            tutorialService.svgExportTool
        )
    }

    onClick(): void {
        this.exportService.downloadAsSvg(this.canvasService.canvas.svg);
    }
}
