import { Injectable } from '@angular/core';
import {ResourceProvider, AbstractTaskJsonResourceService} from '@netgrif/application-engine';

@Injectable({
  providedIn: 'root'
})
export class TaskExampleAppService extends AbstractTaskJsonResourceService {

    constructor(provider: ResourceProvider) {
        super(provider, 'http://localhost:8080/api/');
    }
}
