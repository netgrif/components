import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions} from '@angular/material/checkbox';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DataVariable, ProcessPermissionRef, Role, TransitionPermissionRef} from '@netgrif/petriflow';
import {ModelerConfig} from '../../modeler/modeler-config';
import {HistoryService} from '../../modeler/services/history/history.service';
import {ModelService} from '../../modeler/services/model/model.service';
import {CanvasToolContext} from "../../modeler/edit-mode/services/modes/canvas-tool-context";
import {LocalStorageService} from "../../services/local-storage.service";

export enum RoleRefType {
    TRANSITION = 'transition',
    PROCESS = 'process'
}

export interface ManagePermissionData {
    type: RoleRefType;
    roles: Array<Role>;
    userLists: Array<DataVariable>;
    rolesRefs?: Array<TransitionPermissionRef>;
    processRolesRefs?: Array<ProcessPermissionRef>;
    userRefs?: Array<TransitionPermissionRef>;
    processUserRefs?: Array<ProcessPermissionRef>;
    modelService: ModelService;
    historyService: HistoryService;
}

@Component({
    selector: 'nc-builder-dialog-manage-roles',
    templateUrl: './dialog-manage-roles.component.html',
    styleUrls: ['./dialog-manage-roles.component.scss'],
    providers: [
        {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: {clickAction: 'noop'} as MatCheckboxDefaultOptions}
    ]
})
export class DialogManageRolesComponent implements OnInit, OnDestroy {
    pageSizes = [5, 10, 20];
    defaultPageSize = 10;
    displayedColumns: Array<string>;
    usersDisplayedColumns: Array<string>;
    dataSource: MatTableDataSource<TransitionPermissionRef | ProcessPermissionRef>;
    usersDataSource: MatTableDataSource<TransitionPermissionRef | ProcessPermissionRef>;
    @ViewChild('matPaginator', {static: true}) paginator: MatPaginator;
    @ViewChild('matUserPaginator', {static: true}) userPaginator: MatPaginator;
    @ViewChild('firstTableSort', {static: true}) sort: MatSort;
    @ViewChild('secondTableSort', {static: true}) userSort: MatSort;
    private historyChange: boolean;

    private modelService: ModelService;
    private historyService: HistoryService;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ManagePermissionData,
        protected _localStorageService: LocalStorageService
    ) {
        this.modelService = data.modelService;
        this.historyService = data.historyService;
        if (this.data.type === RoleRefType.TRANSITION) {
            const arrayRoleRefs = [...this.data.rolesRefs];
            this.addDefaultRoleRefs(arrayRoleRefs);
            const arrayUserRefs = [...this.data.userRefs];
            this.displayedColumns = ['id', 'perform', 'delegate', 'cancel', 'assign', 'view'];
            this.usersDisplayedColumns = ['id', 'perform', 'delegate', 'cancel', 'assign', 'view'];
            this.data.roles.forEach(item => {
                if (this.data.rolesRefs.find(itm => itm.id === item.id) === undefined) {
                    (arrayRoleRefs as Array<TransitionPermissionRef>).push(new  TransitionPermissionRef(item.id));
                }
            });
            this.data.userLists.forEach(item => {
                if (this.data.userRefs.find(itm => itm.id === item.id) === undefined) {
                    (arrayUserRefs as Array<TransitionPermissionRef>).push(new  TransitionPermissionRef(item.id));
                }
            });
            this.dataSource = new MatTableDataSource<TransitionPermissionRef | ProcessPermissionRef>(arrayRoleRefs);
            this.usersDataSource = new MatTableDataSource<TransitionPermissionRef | ProcessPermissionRef>(arrayUserRefs);
        } else {
            const arrayRoleRefs = [...this.data.processRolesRefs];
            this.addDefaultProcessRoleRefs(arrayRoleRefs);
            const arrayUserRefs = [...this.data.processUserRefs];
            this.displayedColumns = ['id', 'create', 'delete', 'view'];
            this.usersDisplayedColumns = ['id', 'create', 'delete', 'view'];
            this.data.roles.forEach(item => {
                if (this.data.processRolesRefs.find(itm => itm.id === item.id) === undefined) {
                    (arrayRoleRefs as Array<ProcessPermissionRef>).push(new ProcessPermissionRef(item.id));
                }
            });
            this.data.userLists.forEach(item => {
                if (this.data.processUserRefs.find(itm => itm.id === item.id) === undefined) {
                    (arrayUserRefs as Array<ProcessPermissionRef>).push(new ProcessPermissionRef(item.id));
                }
            });
            this.dataSource = new MatTableDataSource<TransitionPermissionRef | ProcessPermissionRef>(arrayRoleRefs);
            this.usersDataSource = new MatTableDataSource<TransitionPermissionRef | ProcessPermissionRef>(arrayUserRefs);
        }
        this.dataSource.sortData = (data: (TransitionPermissionRef | ProcessPermissionRef)[], sort: MatSort): (TransitionPermissionRef | ProcessPermissionRef)[] => {
            return this.sortRefs(sort, data) as (TransitionPermissionRef | ProcessPermissionRef)[];
        };
        this.usersDataSource.sortData = (data: (TransitionPermissionRef | ProcessPermissionRef)[], sort: MatSort): (TransitionPermissionRef | ProcessPermissionRef)[] => {
            return this.sortRefs(sort, data) as (TransitionPermissionRef | ProcessPermissionRef)[];
        }
    }

    private sortRefs(sort: MatSort, data: ((TransitionPermissionRef | ProcessPermissionRef)[])) {
        if (sort.active === undefined) {
            return data;
        }
        const order = sort.direction === 'desc' ? -1 : (sort.direction === 'asc' ? 1 : 0);
        return data.sort((a: TransitionPermissionRef | ProcessPermissionRef, b: TransitionPermissionRef | ProcessPermissionRef) => {
            const refA = this.refStringValue(a, sort.active);
            const refB = this.refStringValue(b, sort.active);
            if (refA === refB || order === 0) {
                return a.id.localeCompare(b.id);
            }
            return refA.localeCompare(refB) * order;
        });
    }

    refStringValue(item: TransitionPermissionRef | ProcessPermissionRef, property: string): string {
        const value: boolean | undefined = item.logic[property];
        return value === undefined ? '' : `${value.toString()}`;
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.usersDataSource.paginator = this.userPaginator;
        this.dataSource.sort = this.sort;
        this.usersDataSource.sort = this.userSort;
        this.sort.sort(({
            id: this._localStorageService.getItem(ModelerConfig.LOCALSTORAGE.PERMISSION_DIALOG.ROLE_SORT),
            start: this._localStorageService.getItem(ModelerConfig.LOCALSTORAGE.PERMISSION_DIALOG.ROLE_DIRECTION)
        }) as MatSortable);
        this.userSort.sort(({
            id: this._localStorageService.getItem(ModelerConfig.LOCALSTORAGE.PERMISSION_DIALOG.USER_REF_SORT),
            start: this._localStorageService.getItem(ModelerConfig.LOCALSTORAGE.PERMISSION_DIALOG.USER_REF_DIRECTION)
        }) as MatSortable);
    }

    setValue(id: string, change: string) {
        if (this.data.type === RoleRefType.TRANSITION) {
            this.setRoleRef(this.data.rolesRefs.find(item => item.id === id), id, change);
        } else {
            this.setProcessRoleRef(this.data.processRolesRefs.find(item => item.id === id), id, change);
        }
        this.historyChange = true;
    }

    setUserValue(id: string, change: string) {
        if (this.data.type === RoleRefType.TRANSITION) {
            this.setUserRef(this.data.userRefs.find(item => item.id === id), id, change);
        } else {
            this.setProcessUserRef(this.data.processUserRefs.find(item => item.id === id), id, change);
        }
        this.historyChange = true;
    }

    private setRoleRef(roleRef: TransitionPermissionRef, id: string, change: string) {
        if (roleRef === undefined) {
            this.data.rolesRefs.push(new TransitionPermissionRef(id));
            this.data.rolesRefs.find(item => item.id === id).logic[change] = true;
            (this.dataSource.data.find(item => item.id === id) as TransitionPermissionRef).logic[change] = true;
        } else {
            const newValue = this.resolveNewValue(roleRef, change);
            this.data.rolesRefs.find(item => item.id === id).logic[change] = newValue;
            (this.dataSource.data.find(item => item.id === id) as TransitionPermissionRef).logic[change] = newValue;
        }
    }

    private setProcessRoleRef(processRoleRef: ProcessPermissionRef, id: string, change: string) {
        if (processRoleRef === undefined) {
            const roleRef = new ProcessPermissionRef(id);
            this.data.processRolesRefs.push(roleRef);
            this.modelService.model.addRoleRef(roleRef);
            this.data.processRolesRefs.find(item => item.id === id).logic[change] = true;
            (this.dataSource.data.find(item => item.id === id) as ProcessPermissionRef).logic[change] = true;
        } else {
            const newValue = this.resolveNewValue(processRoleRef, change);
            this.data.processRolesRefs.find(item => item.id === id).logic[change] = newValue;
            (this.dataSource.data.find(item => item.id === id) as ProcessPermissionRef).logic[change] = newValue;
        }
    }

    private setUserRef(userRef: TransitionPermissionRef, id: string, change: string) {
        if (userRef === undefined) {
            this.data.userRefs.push(new TransitionPermissionRef(id));
            this.data.userRefs.find(item => item.id === id).logic[change] = true;
            (this.usersDataSource.data.find(item => item.id === id) as TransitionPermissionRef).logic[change] = true;
        } else {
            const newValue = this.resolveNewValue(userRef, change);
            this.data.userRefs.find(item => item.id === id).logic[change] = newValue;
            (this.usersDataSource.data.find(item => item.id === id) as TransitionPermissionRef).logic[change] = newValue;
        }
    }

    private setProcessUserRef(processUserRef: ProcessPermissionRef, id: string, change: string) {
        if (processUserRef === undefined) {
            const ref = new ProcessPermissionRef(id);
            this.data.processUserRefs.push(ref);
            this.modelService.model.addUserRef(ref);
            this.data.processUserRefs.find(item => item.id === id).logic[change] = true;
            (this.usersDataSource.data.find(item => item.id === id) as ProcessPermissionRef).logic[change] = true;
        } else {
            const newValue = this.resolveNewValue(processUserRef, change);
            this.data.processUserRefs.find(item => item.id === id).logic[change] = newValue;
            (this.usersDataSource.data.find(item => item.id === id) as ProcessPermissionRef).logic[change] = newValue;
        }
    }

    protected resolveNewValue(roleRef: ProcessPermissionRef | TransitionPermissionRef, change: string) {
        let newValue;
        if (roleRef.logic[change] === undefined) {
            newValue = true;
        } else if (roleRef.logic[change] === true) {
            newValue = false;
        }
        return newValue;
    }

    stringValue(logic: boolean): string {
        if (logic === undefined) {
            return ' ';
        }
        return `${logic}`;
    }

    getChecked(logic: boolean): boolean {
        return logic === true;
    }

    getIndeterminate(logic: boolean): boolean {
        return logic === false;
    }

    private addDefaultRoleRefs(arrayRoleRefs: Array<TransitionPermissionRef>) {
        if (!arrayRoleRefs.find(roleRef => roleRef.id === Role.DEFAULT)) {
            arrayRoleRefs.push(new TransitionPermissionRef(Role.DEFAULT));
        }
        if (!arrayRoleRefs.find(roleRef => roleRef.id === Role.ANONYMOUS)) {
            arrayRoleRefs.push(new TransitionPermissionRef(Role.ANONYMOUS));
        }
    }

    private addDefaultProcessRoleRefs(arrayRoleRefs: Array<ProcessPermissionRef>) {
        if (!arrayRoleRefs.find(roleRef => roleRef.id === Role.DEFAULT)) {
            arrayRoleRefs.push(new ProcessPermissionRef(Role.DEFAULT));
        }
        if (!arrayRoleRefs.find(roleRef => roleRef.id === Role.ANONYMOUS)) {
            arrayRoleRefs.push(new ProcessPermissionRef(Role.ANONYMOUS));
        }
    }

    sortRoleRefs(sort: Sort): void {
        this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.PERMISSION_DIALOG.ROLE_SORT, sort.active);
        this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.PERMISSION_DIALOG.ROLE_DIRECTION, sort.direction);
    }

    sortUserRefs(sort: Sort): void {
        this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.PERMISSION_DIALOG.USER_REF_SORT, sort.active);
        this._localStorageService.setItem(ModelerConfig.LOCALSTORAGE.PERMISSION_DIALOG.USER_REF_DIRECTION, sort.direction);
    }

    ngOnDestroy(): void {
        if (this.historyChange) {
            this.historyService.save("Role assignments has been changed.");
        }
    }
}
