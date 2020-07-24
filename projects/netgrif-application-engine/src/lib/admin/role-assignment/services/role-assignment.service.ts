import {Injectable} from '@angular/core';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {PetriNetResourceService} from '../../../resources/engine-endpoint/petri-net-resource.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {UserList} from './UserList';
import {ProcessList} from './ProcessList';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';

@Injectable()
export class RoleAssignmentService {

    private readonly _userList: UserList;
    private readonly _processList: ProcessList;

    constructor(userResources: UserResourceService, processResources: PetriNetResourceService,
                snackbar: SnackBarService, private _log: LoggerService) {
        this._userList = new UserList(userResources, snackbar, _log);
        this._processList = new ProcessList(processResources, _log);
    }

    public get userList(): UserList {
        return this._userList;
    }

    public get processList(): ProcessList {
        return this._processList;
    }
}
