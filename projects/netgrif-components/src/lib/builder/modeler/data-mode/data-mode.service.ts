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

export interface TypeArray {
    viewValue: string;
    value: string;
}

@Injectable()
export class DataModeService extends ModeService<Tool> {
    event: EventEmitter<void>;
    itemData: BehaviorSubject<DataVariable>;
    _typeArray: Array<TypeArray>;

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
        this._typeArray = [
            {viewValue: this._translateService.instant('builder.modeler.data-mode.boolean'), value: DataType.BOOLEAN},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.button'), value: DataType.BUTTON},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.caseRef'), value: DataType.CASE_REF},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.processRef'), value: DataType.PROCESS_REF},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.date'), value: DataType.DATE},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.datetime'), value: DataType.DATETIME},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.enumeration'), value: DataType.ENUMERATION},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.enumerationMap'), value: DataType.ENUMERATION_MAP},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.file'), value: DataType.FILE},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.fileList'), value: DataType.FILE_LIST},
            {viewValue: 'Filter (deprecated)', value: DataType.FILTER},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.caseFilter'), value: DataType.CASE_FILTER},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.taskFilter'), value: DataType.TASK_FILTER},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.processFilter'), value: DataType.PROCESS_FILTER},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.i18n'), value: DataType.I18N},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.multichoice'), value: DataType.MULTICHOICE},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.multichoiceMap'), value: DataType.MULTICHOICE_MAP},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.number'), value: DataType.NUMBER},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.user'), value: DataType.USER},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.userList'), value: DataType.USER_LIST},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.stringCollection'), value: DataType.STRING_COLLECTION},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.taskRef'), value: DataType.TASK_REF},
            {viewValue: this._translateService.instant('builder.modeler.data-mode.text'), value: DataType.TEXT}
        ];
    }

    public get typeArray(): Array<TypeArray> {
        return this._typeArray;
    }
}
