import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSelectionList} from '@angular/material/list';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {
    ProcessList,
    ExtendedProcessRole,
    ProcessVersion,
    ProcessListItem
} from '../role-assignment/services/ProcessList';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {RoleAssignmentLdapGroupService} from './services/role-assignment-ldap-group.service';
import {LdapGroupListItem, LdapGroupListService} from '../../groups/services/ldap-group-list.service';

@Component({
    selector: 'ncc-abstract-ldap-group-role-assignment',
    template: ''
})
export abstract class AbstractLdapGroupRoleAssignmentComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('ldapGroupList') public ldapGroupList: MatSelectionList;
    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    public ldapGroup: LdapGroupListService;
    public nets: ProcessList;
    public filteredProcesses: Array<ProcessListItem> = [];
    public ldapGroupMultiSelect: boolean;
    public searchLdapGroupControl = new FormControl();
    public searchNetControl = new FormControl();
    protected SEARCH_DEBOUNCE_TIME = 600;
    protected subValueChanges: Subscription;
    protected subNetValueChanges: Subscription;
    protected subLdapGroup: Subscription;

    constructor(protected _service: RoleAssignmentLdapGroupService) {
        this.ldapGroup = this._service.ldapGroupList;
        this.nets = this._service.processList;
        this.ldapGroupMultiSelect = true;
    }

    ngOnInit(): void {
        this.nets.loadProcesses().subscribe(processes => {
            this.filteredProcesses = processes;
        });
        this.subValueChanges = this.searchLdapGroupControl.valueChanges.pipe(
            debounceTime(this.SEARCH_DEBOUNCE_TIME)
        ).subscribe(searchText => {
            this.ldapGroup.reload(searchText);
        });
        this.subNetValueChanges = this.searchNetControl.valueChanges.pipe(debounceTime(this.SEARCH_DEBOUNCE_TIME)).subscribe(searchText => {
            this.filteredProcesses = this.nets.processes.filter(itm => itm.title.toLowerCase().includes(searchText.toLowerCase()));
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
        this.subNetValueChanges.unsubscribe();
        this.nets = undefined;
        this.filteredProcesses = undefined;
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
