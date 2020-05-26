import {Injectable} from '@angular/core';
import {ConfigurationService} from '../../configuration/configuration.service';
import {ViewService} from '../view-service/view.service';

@Injectable({
    providedIn: 'root'
})
export class RoutingBuilderService {

    constructor(configService: ConfigurationService, viewService: ViewService) {

    }
}
