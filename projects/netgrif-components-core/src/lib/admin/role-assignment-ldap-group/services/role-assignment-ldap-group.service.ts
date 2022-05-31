import { Injectable } from '@angular/core';
import {ProcessList} from '../../role-assignment/services/ProcessList';
import {PetriNetResourceService} from '../../../resources/engine-endpoint/petri-net-resource.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {TranslateService} from '@ngx-translate/core';
import {LdapGroupListService} from '../../../groups/services/ldap-group-list.service';
import {LdapGroupResourceService} from '../../../resources/engine-endpoint/ldap-group-resource.service';

@Injectable()
export class RoleAssignmentLdapGroupService {

    protected readonly _ldapGroupList: LdapGroupListService;
    protected readonly _processList: ProcessList;

    constructor(protected ldapGroupResources: LdapGroupResourceService,
                protected processResources: PetriNetResourceService,
                protected snackbar: SnackBarService,
                protected _log: LoggerService,
                protected _translate: TranslateService) {
        this._ldapGroupList = new LdapGroupListService(ldapGroupResources, _log, snackbar, _translate);
        this._processList = new ProcessList(processResources, _log);
    }

    public get ldapGroupList(): LdapGroupListService {
        return this._ldapGroupList;
    }

    public get processList(): ProcessList {
        return this._processList;
    }
}
