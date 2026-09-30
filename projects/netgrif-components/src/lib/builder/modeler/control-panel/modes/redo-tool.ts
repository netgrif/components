import {Injectable} from '@angular/core';
import {HistoryService} from '../../services/history/history.service';
import {ControlPanelButton} from '../control-panel-button';
import {ControlPanelIcon} from '../control-panel-icon';
import {Tool} from '../tools/tool';
import {ToolComponent} from "../tools/tool-component/tool.component";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class RedoTool extends Tool {

    public static readonly ID = 'redo';

    constructor(
        private history: HistoryService,
        translateService: TranslateService
    ) {
        super(
            RedoTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('redo', false, true),
                translateService.instant('builder.modeler.control-panel.redo')
            ),
            ToolComponent
        );
        this.disabled.next(true);
        history.historyChange.subscribe(change => {
            this.disabled.next(change.size === 0 || change.head === change.size - 1);
        });
    }

    onClick(): void {
        this.history.redo();
    }
}
