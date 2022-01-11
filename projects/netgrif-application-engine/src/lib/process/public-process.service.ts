import { Injectable } from '@angular/core';
import {ProcessService} from './process.service';
import {PublicPetriNetResourceService} from '../resources/engine-endpoint/public/public-petri-net-resource.service';
import {LoggerService} from '../logger/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class PublicProcessService extends ProcessService {
    constructor(private _publicPetriNetResource: PublicPetriNetResourceService, private _logger: LoggerService) {
        super(_publicPetriNetResource, _logger);
    }
}
