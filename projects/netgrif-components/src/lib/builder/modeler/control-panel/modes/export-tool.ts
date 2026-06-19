import {Injectable} from '@angular/core';
import {TutorialService} from '../../../tutorial/tutorial-service';
import {ModelExportService} from '../../services/model/model-export.service';
import {ControlPanelButton} from '../control-panel-button';
import {ControlPanelIcon} from '../control-panel-icon';
import {Tool} from '../tools/tool';
import {ToolComponent} from "../tools/tool-component/tool.component";

@Injectable()
export class ExportTool extends Tool {

    constructor(
        private exportService: ModelExportService,
        tutorialService: TutorialService
    ) {
        super(
            'export',
            new ControlPanelButton(
                new ControlPanelIcon('download', false, true),
                'Export as XML',
            ),
            ToolComponent,
            tutorialService.exportTool
        );
    }

    onClick(): void {
        this.exportService.downloadAsXml();
    }
}
