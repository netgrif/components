import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {AbstractResourceService, ResourceProvider} from '../../resources/public-api';
import {ConfigurationService} from '../../configuration/configuration.service';
import {UserService} from '../../user/services/user.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {FilterRepository} from '../../filter/filter.repository';
import {LoggerService} from '../../logger/services/logger.service';

@Injectable({
    providedIn: 'root'
})
export class ImpersonationService extends AbstractResourceService {

    public constructor(protected provider: ResourceProvider,
                       protected _router: Router,
                       protected _configService: ConfigurationService,
                       protected _userService: UserService,
                       protected _snackbar: SnackBarService,
                       protected _filter: FilterRepository,
                       protected _log: LoggerService,
                       private _translate: TranslateService) {
        super('impersonation', provider, _configService);
    }

    public impersonate(userId: number): void {
        this.provider.post$('impersonate/' + userId, this.SERVER_URL, {}).subscribe(user => {
            this._triggerReload();
            this._snackbar.openSuccessSnackBar(this._translate.instant('impersonation.user.successfullyRepresented'));
        }, (response => {
            if (response.status === 400) {
                response.error.alreadyImpersonated ?
                    this._snackbar.openErrorSnackBar(this._translate.instant('impersonation.user.currentlyAlreadyRepresented')) :
                    this._snackbar.openErrorSnackBar(this._translate.instant('impersonation.user.currentlyLogged'));
            } else {
                this._snackbar.openErrorSnackBar(this._translate.instant('impersonation.action.failed'));
            }
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

    private _triggerReload(): void {
        this._userService.user$.pipe(take(1)).subscribe(user => {
            this._filter.removeAllFilters();
            // TODO 1678 return observable
        });
        this._userService.reload();
    }

}

export class UserQuery {
    protected search;

    constructor(search) {
        this.search = search;
    }
}
