import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AssignPolicy, DataType, FinishPolicy} from '@netgrif/petriflow';
import {ActionsMasterDetailService} from '../../modeler/actions-mode/actions-master-detail.service';
import {ActionsModeService} from '../../modeler/actions-mode/actions-mode.service';
import {SelectedTransitionService} from '../../modeler/selected-transition.service';
import {ModelService} from '../../modeler/services/model/model.service';
import {DialogManageRolesComponent, RoleRefType} from '../dialog-manage-roles/dialog-manage-roles.component';
import {ChangedTransition} from './changed-transition';
import {BuilderModeService, BuilderMode} from '../../services/builder-mode.service';
import {HistoryService} from "../../modeler/services/history/history.service";
import {CanvasToolContext} from "../../modeler/edit-mode/services/modes/canvas-tool-context";
import {LocalStorageService} from '../../services/local-storage.service';

export interface TransitionEditData {
    transitionId: string;
    context: CanvasToolContext;
}

@Component({
    selector: 'nc-builder-dialog-transition-edit',
    templateUrl: './dialog-transition-edit.component.html',
    styleUrls: ['./dialog-transition-edit.component.scss']
})
export class DialogTransitionEditComponent implements OnInit {

    public transition: ChangedTransition;
    public assignPolicies: Array<AssignPolicy>;
    public finishPolicies: Array<FinishPolicy>;
    public form: FormControl;
    protected counterTags = 0;

    protected _modelService: ModelService;
    private _transitionService: SelectedTransitionService;
    private _actionMode: ActionsModeService;
    private _actionsMasterDetail: ActionsMasterDetailService;
    private _builderModeService: BuilderModeService;
    private _historyService: HistoryService;
    private _localStorageService: LocalStorageService;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: TransitionEditData,
        private router: Router,
        private dialog: MatDialog
    ) {
        this._modelService = data.context.modelService;
        this._transitionService = data.context.transitionService;
        this._actionMode = data.context.actionMode;
        this._actionsMasterDetail = data.context.actionsMasterDetail;
        this._builderModeService = data.context.builderModeService;
        this._historyService = data.context.editModeService.historyService;
        this._localStorageService = data.context.localStorageService;

        this.transition = new ChangedTransition(undefined, this._modelService.model.getTransition(data.transitionId).clone());
        this.form = new FormControl('', [
            Validators.required,
            this.validUnique()
        ]);
    }

    ngOnInit(): void {
        this.assignPolicies = Object.values(AssignPolicy);
        this.finishPolicies = Object.values(FinishPolicy);
    }

    openFormBuilder() {
        // TODO: NAB-326 refactor SelectedTransitionService
        this._transitionService.id = this.transition.id;
        this._builderModeService.mode = BuilderMode.FORM_BUILDER;
    }

    openActions() {
        this._actionMode.activate(this._actionMode.transitionActionsTool);
        this._actionsMasterDetail.select(this.transition.transition);
        this._transitionService.id = this.transition.id;
        this._builderModeService.mode = BuilderMode.ACTION_MODE;
    }

    private validUnique(): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => {
            if (this._modelService.model.getTransition(fc.value) !== undefined && fc.value !== this.transition.id) {
                return ({validUnique: true});
            } else {
                return null;
            }
        };
    }

    openPermissions() {
        this.dialog.open(DialogManageRolesComponent, {
            width: '60%',
            panelClass: "dialog-width-60",
            data: {
                type: RoleRefType.TRANSITION,
                roles: this._modelService.model.getRoles(),
                rolesRefs: this.transition.transition.roleRefs,
                userRefs: this.transition.transition.userRefs,
                userLists: this._modelService.model.getDataSet().filter(item => item.type === DataType.USER_LIST),
                modelService: this._modelService,
                historyService: this._historyService,
                localStorageService: this._localStorageService
            }
        });
    }


    getTags() {
        return Array.from(this.transition.transition.tags, ([key, value]) => ({ key, value }));
    }

    addTag() {
        this.transition.transition.tags.set(this.createKeyId() , 'value');
    }

    deleteTag(key: string) {
        this.transition.transition.tags.delete(key);
    }

    setKey($event, key: string) {
        const value = this.transition.transition.tags.get(key);
        this.transition.transition.tags.delete(key);
        this.transition.transition.tags.set($event.target.value, value);
    }

    setValue($event, key: string) {
        this.transition.transition.tags.set(key, $event.target.value);
    }

    trackByFn(index: any, item: any) {
        return index + item.key;
    }

    createKeyId(): string {
        this.counterTags++;
        if (this.transition.transition.tags.has('key' + this.counterTags)) {
            return this.createKeyId();
        } else {
            return 'key' + String(this.counterTags);
        }
    }
}
