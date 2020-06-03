import {Injectable} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';
import {CaseViewService} from '../../view/case-view/service/case-view-service';
import {LanguageService} from '../../translate/language.service';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {ViewService} from '../../routing/view-service/view.service';


export enum CaseMetaField {
    VISUAL_ID = 'visualId',
    TITLE = 'title',
    AUTHOR = 'author',
    CREATION_DATE = 'creationDate',
}

@Injectable()
export class CaseHeaderService extends AbstractHeaderService {
    constructor(protected _caseViewService: CaseViewService,
                private _lang: LanguageService,
                preferences: UserPreferenceService,
                viewService: ViewService) {
        super(HeaderType.CASE, preferences, viewService);
        this._caseViewService.allowedNets$.subscribe(allowedNets => {
            this.setAllowedNets(allowedNets);
        });
    }

    protected createMetaHeaders(): Array<HeaderColumn> {
        return [
            new HeaderColumn(HeaderColumnType.META, CaseMetaField.VISUAL_ID, 'headers.caseMeta.visualID', 'text'),
            new HeaderColumn(HeaderColumnType.META, CaseMetaField.TITLE, 'headers.caseMeta.title', 'text'),
            new HeaderColumn(HeaderColumnType.META, CaseMetaField.AUTHOR, 'headers.caseMeta.author', 'text'),
            new HeaderColumn(HeaderColumnType.META, CaseMetaField.CREATION_DATE, 'headers.caseMeta.creationDate', 'text'),
        ];
    }
}
