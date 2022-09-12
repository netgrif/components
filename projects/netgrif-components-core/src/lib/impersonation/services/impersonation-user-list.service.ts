import {UserListItem, UserListService} from '../../user/services/user-list.service';
import {Injectable} from '@angular/core';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from '../../logger/services/logger.service';
import {ImpersonationUserResourceService} from './impersonation-user-resource.service';
import {Observable} from 'rxjs';

@Injectable()
export class ImpersonationUserListService extends UserListService {

    constructor(_resources: ImpersonationUserResourceService,
                protected _logService: LoggerService,
                _snackbar: SnackBarService,
                _translate: TranslateService) {
        super(_resources, _logService, _snackbar, _translate);
    }

    public loadPage(page: number): Observable<{ [k: string]: UserListItem }> {
        return super.loadPage(page);
    }
}
