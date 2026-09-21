import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {RolesObject, UserListItem, UserListService} from "../../../../user/services/user-list.service";
import {FormControl} from "@angular/forms";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {debounceTime} from "rxjs/operators";
import {UserValue} from "../../../../data-fields/user-field/models/user-value";

@Component({
    selector: 'ncc-base-user-assign-list',
    template: ''
})
export abstract class AbstractBaseUserAssignListComponent implements OnInit, OnDestroy {

    protected SEARCH_DEBOUNCE_TIME = 600;

    @Input() searchUserControl: FormControl;

    @Input() roles: RolesObject | Array<string>;

    @Input() negativeRoles: RolesObject | Array<string>;

    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    constructor(protected _userListService: UserListService) {

    }

    ngOnInit() {
        this.searchUserControl.valueChanges.pipe(debounceTime(this.SEARCH_DEBOUNCE_TIME)).subscribe(searchText => {
            this._userListService.reload(searchText);
        });
        if (this.roles instanceof Array) {
            this._userListService.rolesQuery = this.roles;
        } else if (this.roles !== undefined && this.roles !== null) {
            this._userListService.rolesQuery = Object.keys(this.roles);
        }
        if (this.negativeRoles instanceof Array) {
            this._userListService.negativeRolesQuery = this.negativeRoles;
        } else if (this.negativeRoles !== undefined && this.negativeRoles !== null) {
            this._userListService.negativeRolesQuery = Object.keys(this.negativeRoles);
        }
    }

    abstract ngOnDestroy();

    abstract select(selectedUser: UserListItem);

    public trackBy(index: number, item: UserValue): any {
        return item.id;
    }

    public get loading(): boolean {
        return this._userListService.loading;
    }

    public loadNextPage(): void {
        if (!this.viewport) {
            return;
        }
        this._userListService.nextPage(this.viewport.getRenderedRange().end, this.viewport.getDataLength());
    }
}
