import {AfterViewInit, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSelectionList} from '@angular/material/list';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {ProcessList, ExtendedProcessRole, ProcessVersion} from '../role-assignment/services/ProcessList';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {RoleAssignmentLdapGroupService} from './services/role-assignment-ldap-group.service';
import {LdapGroupListItem, LdapGroupListServiceService} from '../../groups/services/ldap-group-list-service.service';

export abstract class AbstractLdapGroupRoleAssignment implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('ldapGroupList') public ldapGroupList: MatSelectionList;
    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    public ldapGroup: LdapGroupListServiceService;
    public nets: ProcessList;
    public ldapGroupMultiSelect: boolean;
    public searchLdapGroupControl = new FormControl();
    protected SEARCH_DEBOUNCE_TIME = 600;
    protected subValueChanges: Subscription;
    protected subLdapGroup: Subscription;

    constructor(protected _service: RoleAssignmentLdapGroupService) {
        this.ldapGroup = this._service.ldapGroupList;
        this.nets = this._service.processList;
        this.ldapGroupMultiSelect = true;
    }

    ngOnInit(): void {
        this.nets.loadProcesses();
        this.subValueChanges = this.searchLdapGroupControl.valueChanges.pipe(
            debounceTime(this.SEARCH_DEBOUNCE_TIME)
        ).subscribe(searchText => {
            this.ldapGroup.reload(searchText);
        });
    }

    ngAfterViewInit(): void {
        this.subLdapGroup = this.ldapGroup.ldapGroupsReload$.subscribe(() => {
            this.ldapGroupList.deselectAll();
            this.ldapGroupList.selectedOptions.clear();
            this.autoSelectRoles();
        });
    }

    ngOnDestroy(): void {
        this.subValueChanges.unsubscribe();
        this.subLdapGroup.unsubscribe();
        this.ldapGroup = undefined;
        this.nets = undefined;
    }

    public loadNextLdapGroupPage(): void {
        if (!this.viewport) {
            return;
        }
        this.ldapGroup.nextPage(this.viewport.getRenderedRange().end, this.viewport.getDataLength());
    }

    public autoSelectRoles(): void {
        const all = this.ldapGroupList.selectedOptions.selected.map(option => (option.value as LdapGroupListItem).roles);
        if (all.length === 0) {
            this.nets.selectRoles(new Set<string>([]));
        }

        const intersection = all.reduce((acc, curr) => new Set([...acc].filter(s => curr.has(s))), all[0]);
        console.log(intersection);
        this.nets.selectRoles(intersection);
    }

    public update(role: ExtendedProcessRole): void {
        this.nets.updateSelectedRoles(role);
        const selected = this.ldapGroupList.selectedOptions.selected.map(option => (option.value as LdapGroupListItem));
        this.ldapGroup.updateRoles(selected, this.nets.selectedRoles).subscribe(_ => {
            this.autoSelectRoles();
        });
    }

    public selectAllLdapGroup(select: boolean): void {
        this.ldapGroupList.options.forEach(option => {
            (option.value as LdapGroupListItem).selected = select;
        });
        this.autoSelectRoles();
    }

    public toggleAllRoles(net: ProcessVersion, select: boolean): void {
        net.roles.forEach(r => {
            r.selected = select;
            this.nets.updateSelectedRoles(r);
        });
        const selected = this.ldapGroupList.selectedOptions.selected.map(option => (option.value as LdapGroupListItem));
        this.ldapGroup.updateRoles(selected, this.nets.selectedRoles).subscribe(_ => {
            this.autoSelectRoles();
        });
    }
}
