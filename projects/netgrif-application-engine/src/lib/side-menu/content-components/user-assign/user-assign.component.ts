import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UserValue} from '../../../data-fields/user-field/models/user-value';
import {FormControl} from '@angular/forms';
import {UserAssignListComponent} from './user-assign-list/user-assign-list.component';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nae-user-assign',
    templateUrl: './user-assign.component.html',
    styleUrls: ['./user-assign.component.scss']
})
export class UserAssignComponent implements OnInit, AfterViewInit {

    @ViewChild(UserAssignListComponent) public listComponent: UserAssignListComponent;
    @ViewChild('inputSearch') public input;

    public users: Array<UserValue>;
    public formControl = new FormControl();
    private _currentUser: UserValue;
    public _loading: boolean;

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) private _sideMenuControl: SideMenuControl,
                private _userResourceService: UserResourceService,
                private _snackBar: SnackBarService, private _log: LoggerService, private _translate: TranslateService) {
        this.users = [];
        this.loadUsers();
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.input.matAutocomplete = this.listComponent.autocomplete;
    }

    public userWasSelected(user: UserValue): void {
        this._currentUser = user;
        this._sideMenuControl.publish({
            opened: true,
            message: 'New selected user',
            data: this._currentUser
        });
    }

    public assign(): void {
        if (this._currentUser !== undefined) {
            this._sideMenuControl.close({
                opened: false,
                message: 'Selected user was confirmed',
                data: this._currentUser
            });
        }
    }

    private loadUsers() {
        if (this._loading) {
            return;
        }

        this._loading = true;
        this._userResourceService.getAll().subscribe( result => {
            // TODO 15.6.2020 - handle pagination of users
            if (result.content && result.content instanceof Array) {
                this.users = result.content.map( user => new UserValue(user.id, user.name, user.surname, user.email));
            } else {
                this._snackBar.openWarningSnackBar(this._translate.instant('side-menu.user.noUser'));
            }
            this._loading = false;
        }, error => {
            this._snackBar.openErrorSnackBar(this._translate.instant('side-menu.user.err'));
            this._log.error(error);
            this._loading = false;
        });
    }
}
