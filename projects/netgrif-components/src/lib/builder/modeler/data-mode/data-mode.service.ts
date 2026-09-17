import {EventEmitter, Injectable, Injector} from '@angular/core';
import {DataType, DataVariable} from '@netgrif/petriflow';
import {BehaviorSubject} from 'rxjs';
import {TutorialService} from '../../tutorial/tutorial-service';
import {ControlPanelButton} from '../control-panel/control-panel-button';
import {ControlPanelIcon} from '../control-panel/control-panel-icon';
import {Mode} from '../control-panel/modes/mode';
import {ModeService} from '../control-panel/modes/mode-component/mode.service';
import {Tool} from '../control-panel/tools/tool';
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class DataModeService extends ModeService<Tool> {
    event: EventEmitter<void>;
    itemData: BehaviorSubject<DataVariable>;

    constructor(
        private _tutorialService: TutorialService,
        private _parentInjector: Injector,
        private _translateService: TranslateService
    ) {
        super();
        this.event = new EventEmitter();
        this.itemData = new BehaviorSubject<DataVariable>(new DataVariable('first', DataType.TEXT)); // TODO ReplaySubject / undefined init hodnota
        this.mode = new Mode(
            'data',
            new ControlPanelButton(
                new ControlPanelIcon('playlist_add'),
                this._translateService.instant('builder.modeler.data-mode.dataEditView')
            ),
            './data',
            '/modeler/data',
            this._tutorialService.dataEditor,
            this._parentInjector
        );
        this.tools = [];
    }
}
