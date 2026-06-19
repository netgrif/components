import {Injectable} from '@angular/core';
import {PetriflowCanvasService} from '@netgrif/petriflow.svg';
import {TutorialService} from '../../../tutorial/tutorial-service';
import {ModelExportService} from '../../services/model/model-export.service';
import {ControlPanelButton} from '../control-panel-button';
import {ControlPanelIcon} from '../control-panel-icon';
import {Tool} from '../tools/tool';
import {ToolComponent} from "../tools/tool-component/tool.component";

@Injectable()
export class SvgExportTool extends Tool {

    constructor(
        private exportService: ModelExportService,
        private canvasService: PetriflowCanvasService,
        tutorialService: TutorialService
    ) {
        super(
            'svg_export',
            new ControlPanelButton(
                new ControlPanelIcon('save_as', false, true),
                'Export as SVG',
            ),
            ToolComponent,
            tutorialService.svgExportTool
        )
    }

    onClick(): void {
        this.exportService.downloadAsSvg(this.canvasService.canvas.svg);
    }
}
