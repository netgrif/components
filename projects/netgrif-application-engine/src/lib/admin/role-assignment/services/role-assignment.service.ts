import {Injectable} from '@angular/core';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {PetriNetResourceService} from '../../../resources/engine-endpoint/petri-net-resource.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {ProcessList} from './ProcessList';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {UserListService} from '../../../user/services/user-list.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class RoleAssignmentService {

    private readonly _userList: UserListService;
    private readonly _processList: ProcessList;

    constructor(userResources: UserResourceService, processResources: PetriNetResourceService,
                snackbar: SnackBarService, private _log: LoggerService, private _translate: TranslateService) {
        this._userList = new UserListService(userResources, _log, snackbar, _translate);
        this._processList = new ProcessList(processResources, _log);
    }

    public get userList(): UserListService {
        return this._userList;
    }

    public get processList(): ProcessList {
        return this._processList;
    }
}
