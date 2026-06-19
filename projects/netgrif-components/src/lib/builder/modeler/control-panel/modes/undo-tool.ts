import {Injectable} from '@angular/core';
import {HistoryService} from '../../services/history/history.service';
import {ControlPanelButton} from '../control-panel-button';
import {ControlPanelIcon} from '../control-panel-icon';
import {Tool} from '../tools/tool';
import {ToolComponent} from "../tools/tool-component/tool.component";

@Injectable()
export class UndoTool extends Tool {

    public static readonly ID = 'undo';

    constructor(
        private history: HistoryService
    ) {
        super(
            UndoTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('undo', false, true),
                'Undo'
            ),
            ToolComponent
        );
        this.disabled.next(true);
        history.historyChange.subscribe(change => {
            this.disabled.next(change.size === 0 || change.head === 0);
        });
    }

    onClick(): void {
        this.history.undo();
    }
}
