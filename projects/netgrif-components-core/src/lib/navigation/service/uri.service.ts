import { Injectable } from '@angular/core';
import { LoggerService } from '../../logger/services/logger.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UriResourceService } from './uri-resource.service';
import { BehaviorSubject } from 'rxjs';
import { UriNodeResource } from '../model/uri-resource';


@Injectable({
    providedIn: 'root'
})
export class UriService {

    private _uriNodes: BehaviorSubject<Array<UriNodeResource>>

    constructor(protected _logger: LoggerService,
                protected _route: ActivatedRoute,
                protected _router: Router,
                protected _resourceService: UriResourceService) {
        this._uriNodes = new BehaviorSubject<Array<UriNodeResource>>([]);
        this._resourceService.getRoots().subscribe(res => {
            this._uriNodes.next(res);
        });
    }
}
