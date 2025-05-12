import {Injectable, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AbstractResourceService, ResourceProvider, IdentityResource} from '../../resources/public-api';
import {ConfigurationService} from '../../configuration/configuration.service';
import {IdentityService} from '../../identity/services/identity.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {FilterRepository} from '../../filter/filter.repository';
import {LoggerService} from '../../logger/services/logger.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {Identity} from '../../identity/models/Identity';

@Injectable({
    providedIn: 'root'
})
export class ImpersonationService extends AbstractResourceService implements OnDestroy {

    private _impersonating$ = new Subject<boolean>();

    private _lastUser: Identity;
    private _sub: Subscription;

    public constructor(protected provider: ResourceProvider,
                       protected _router: Router,
                       protected _configService: ConfigurationService,
                       protected _userService: IdentityService,
                       protected _snackbar: SnackBarService,
                       protected _filter: FilterRepository,
                       protected _log: LoggerService,
                       protected _translate: TranslateService) {
        super('impersonation', provider, _configService);
        this._sub = this._userService.identity$.subscribe(user => this._resolveUserChange(user));
    }

    public get impersonating$(): Observable<boolean> {
        return this._impersonating$.asObservable();
    }

    public impersonateUser(userId: string): void {
        this.provider.post$('impersonate/user/' + userId, this.SERVER_URL, {}).subscribe((user: IdentityResource) => {
            this._resolveSuccess(user);
        }, (response => {
            this._resolveError(response);
        }));
    }

    public impersonateByConfig(configId: string): void {
        this.provider.post$('impersonate/config/' + configId, this.SERVER_URL, {}).subscribe((user: IdentityResource) => {
            this._resolveSuccess(user);
        }, (response => {
            this._resolveError(response);
        }));
    }

    public cease(): void {
        this.provider.post$('impersonate/clear', this.SERVER_URL, {}).subscribe(user => {
            this._snackbar.openSuccessSnackBar(this._translate.instant('impersonation.action.deactivated'));
            return this._triggerReload();
        }, (error => {
            this._snackbar.openErrorSnackBar(this._translate.instant('impersonation.action.failed'));
        }));
    }

    protected _resolveSuccess(user: IdentityResource) {
        this._snackbar.openSuccessSnackBar(this._translate.instant('impersonation.user.successfullyRepresented'));
        this._triggerReload();
    }

    protected _resolveError(response: any) {
        if (response.status === 400) {
            response.error.alreadyImpersonated ?
                this._snackbar.openErrorSnackBar(this._translate.instant('impersonation.user.currentlyAlreadyRepresented')) :
                this._snackbar.openErrorSnackBar(this._translate.instant('impersonation.user.currentlyLogged'));
        } else {
            this._snackbar.openErrorSnackBar(this._translate.instant('impersonation.action.failed'));
        }
    }

    protected _triggerReload(): void {
        this._userService.reload();
    }

    protected _resolveUserChange(user: Identity) {
        if (this._lastUser && this._lastUser.isImpersonating() != user.isImpersonating()) {
            this._filter.removeAllFilters();
            this._impersonating$.next(user.isImpersonating());
        }
        this._lastUser = user;
    }

    ngOnDestroy(): void {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }
}
