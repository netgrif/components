import {Component, OnDestroy} from '@angular/core';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Role} from '@netgrif/petriflow';
import {ActionsMasterDetailService} from '../../actions-mode/actions-master-detail.setvice';
import {ActionsModeService} from '../../actions-mode/actions-mode.service';
import {ModelerUtils} from '../../modeler-utils';
import {HistoryService} from '../../services/history/history.service';
import {ModelService} from '../../services/model/model.service';
import {RoleMasterDetailService} from '../role-master-detail.service';
import {ChangedRole} from './changed-role';
import {BuilderMode, BuilderModeService} from "../../../builder-mode.service";

@Component({
    selector: 'nc-builder-role-detail',
    templateUrl: './role-detail.component.html',
    styleUrl: './role-detail.component.scss',
})
export class RoleDetailComponent implements OnDestroy {

    public role: ChangedRole;
    public shouldSave: boolean = false;
    public roleIdForm: FormControl;

    public constructor(
        private _masterService: RoleMasterDetailService,
        private _modelService: ModelService,
        private _router: Router,
        private _actionMode: ActionsModeService,
        private _actionsMasterDetail: ActionsMasterDetailService,
        protected _historyService: HistoryService,
        protected _builderModeService: BuilderModeService
    ) {
        this._masterService.getSelected$().subscribe(item => {
            this.saveChange();
            if (item === undefined) {
                return;
            }
            this.role = new ChangedRole(item.clone());
        });
        this.roleIdForm = new FormControl('', [
            Validators.required,
            this.validUnique(),
        ]);
    }

    ngOnDestroy(): void {
        this.saveChange();
    }

    private saveChange(): void {
        if (!this.shouldSave) {
            return;
        }
        this._modelService.updateRole(this.role);
        this._historyService.save(`Role ${this.role.id} has been changed.`);
        this.shouldSave = false;
    }

    private validUnique(): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => {
            if (this._modelService.model.getRole(fc.value) !== undefined && fc.value !== this.item.id) {
                return ({validUnique: true});
            } else {
                return null;
            }
        };
    }

    changeId($event): void {
        this.role.role.id = $event.target.value;
        this.shouldSave = true;
    }

    changeTitle($event): void {
        this.role.role.title.value = $event.target.value;
        this.shouldSave = true;
    }

    changeGlobalFlag($event): void {
        this.role.role.global = $event.checked;
        this.shouldSave = true;
    }

    get item(): Role {
        return this.service.getSelected();
    }

    get service(): RoleMasterDetailService {
        return this._masterService;
    }

    openActions(): void {
        this._actionMode.activate(this._actionMode.roleActionsTool);
        this._actionsMasterDetail.select(this.item);
        this._builderModeService.mode = BuilderMode.ACTION_MODE;
    }

    numberOfActions(): number {
        return ModelerUtils.numberOfEventActions(this.role.role.getEvents());
    }
}
