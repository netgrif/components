import {Injectable} from '@angular/core';
import {ConfigurationService} from '../configuration/configuration.service';

@Injectable({
    providedIn: 'root'
})
export class FilterRepository {

    constructor(protected _configService: ConfigurationService) {

    }

}
