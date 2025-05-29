import { Injectable } from '@angular/core';
import {PetriNetResourceService} from '../../../resources/engine-endpoint/petri-net-resource.service';
import {LoggerService} from '../../../logger/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class UserInviteService {

    // private readonly _processList: ProcessList;

    constructor(processResources: PetriNetResourceService, private _log: LoggerService) {
        // this._processList = new ProcessList(processResources, _log);
    }

    public get processList(): any {
        return undefined;
        // return this._processList;
    }
}
