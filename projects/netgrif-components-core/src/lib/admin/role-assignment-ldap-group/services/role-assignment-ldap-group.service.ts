import { Injectable } from '@angular/core';
import {ProcessList} from '../../role-assignment/services/ProcessList';
import {PetriNetResourceService} from '../../../resources/engine-endpoint/petri-net-resource.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {TranslateService} from '@ngx-translate/core';
import {LdapGroupListServiceService} from '../../../groups/services/ldap-group-list-service.service';
import {LdapGroupResourceServiceService} from '../../../resources/engine-endpoint/ldap-group-resource-service.service';

@Injectable()
export class RoleAssignmentLdapGroupService {

    private readonly _ldapGroupList: LdapGroupListServiceService;
    private readonly _processList: ProcessList;

    constructor(ldapGroupResources: LdapGroupResourceServiceService, processResources: PetriNetResourceService,
                snackbar: SnackBarService, private _log: LoggerService, private _translate: TranslateService) {
        this._ldapGroupList = new LdapGroupListServiceService(ldapGroupResources, _log, snackbar, _translate);
        this._processList = new ProcessList(processResources, _log);
    }

    public get ldapGroupList(): LdapGroupListServiceService {
        return this._ldapGroupList;
    }

    public get processList(): ProcessList {
        return this._processList;
    }
}
