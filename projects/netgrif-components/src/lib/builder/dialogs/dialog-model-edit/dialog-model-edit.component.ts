import {Component, Inject} from '@angular/core';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DataType} from '@netgrif/petriflow';
import {ActionsModeService} from '../../modeler/actions-mode/actions-mode.service';
import {ProcessActionsTool} from '../../modeler/actions-mode/tools/process-actions-tool';
import {ModelChange} from '../../modeler/history-mode/model/model/model-change';
import {ModelService} from '../../modeler/services/model/model.service';
import {DialogManageRolesComponent, RoleRefType} from '../dialog-manage-roles/dialog-manage-roles.component';
import {BuilderModeService, BuilderMode} from "../../services/builder-mode.service";
import {HistoryService} from "../../modeler/services/history/history.service";
import {CanvasToolContext} from "../../modeler/edit-mode/services/modes/canvas-tool-context";
import {LocalStorageService} from '../../services/local-storage.service';

export interface ModelEditData {
    model: ModelChange;
    context: CanvasToolContext
}

@Component({
    selector: 'nc-builder-dialog-model-edit',
    templateUrl: './dialog-model-edit.component.html',
    styleUrls: ['./dialog-model-edit.component.scss']
})
export class DialogModelEditComponent {

    public model: ModelChange;
    public idCtrl: FormControl;
    public versionCtrl: FormControl;
    public titleCtrl: FormControl;
    public initialsCtrl: FormControl;
    protected counterTags = 0;

    public modelService: ModelService;
    private _actionMode: ActionsModeService;
    private _processTool: ProcessActionsTool;
    private _builderModeService: BuilderModeService;
    private historyService: HistoryService;
    private _localStorageService: LocalStorageService;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ModelEditData,
        private dialog: MatDialog,
    ) {
        this.model = data.model;
        this.modelService = data.context.modelService;
        this._actionMode = data.context.actionMode;
        this._processTool = data.context.processTool;
        this._builderModeService = data.context.builderModeService;
        this.historyService = data.context.editModeService.historyService;
        this._localStorageService = data.context.localStorageService;

        this.idCtrl = new FormControl('', [Validators.required]);
        this.versionCtrl = new FormControl('', [
            // Validators.required,
            this.validVersion()
        ]);
        this.titleCtrl = new FormControl('', [Validators.required]);
        this.initialsCtrl = new FormControl('', [Validators.required]);
    }

    openPermissions() {
        this.dialog.open(DialogManageRolesComponent, {
            width: '60%',
            panelClass: "dialog-width-60",
            data: {
                type: RoleRefType.PROCESS,
                roles: this.modelService.model.getRoles(),
                processRolesRefs: this.modelService.model.getRoleRefs(),
                processUserRefs: this.modelService.model.getUserRefs(),
                userLists: this.modelService.model.getDataSet().filter(item => item.type === DataType.USER_LIST),
                modelService: this.modelService,
                historyService: this.historyService,
                localStorageService: this._localStorageService
            }
        });
    }

    openActions() {
        this._actionMode.activate(this._processTool);
        this._builderModeService.mode = BuilderMode.ACTION_MODE;
    }

    private validVersion(): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => {
            const version = fc.value as string;
            if (!version || version.length === 0) {
                return null;
            }
            if (version.match(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/)) {
                return null;
            }
            return ({format: true})
        };
    }

    getTags() {
        return Array.from(this.model.model.tags, ([key, value]) => ({ key, value }));
    }

    addTag() {
        this.model.model.tags.set(this.createKeyId() , 'value');
    }

    deleteTag(key: string) {
        this.model.model.tags.delete(key);
    }

    setKey($event, key: string) {
        const value = this.model.model.tags.get(key);
        this.model.model.tags.delete(key);
        this.model.model.tags.set($event.target.value, value);
    }

    setValue($event, key: string) {
        this.model.model.tags.set(key, $event.target.value);
    }

    trackByFn(index: any, item: any) {
        return index + item.key;
    }

    createKeyId(): string {
        this.counterTags++;
        if (this.model.model.tags.has('key' + this.counterTags)) {
            return this.createKeyId();
        } else {
            return 'key' + String(this.counterTags);
        }
    }
}
