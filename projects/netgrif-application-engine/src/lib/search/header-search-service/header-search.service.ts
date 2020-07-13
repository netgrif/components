import {Injectable} from '@angular/core';
import {SearchService} from '../search-service/search.service';
import {AbstractHeaderService} from '../../header/abstract-header-service';

@Injectable()
export class HeaderSearchService {

    protected _headerService: AbstractHeaderService;

    constructor(protected _searchService: SearchService) {
    }

    public set headerService(headerService: AbstractHeaderService) {

    }

}
