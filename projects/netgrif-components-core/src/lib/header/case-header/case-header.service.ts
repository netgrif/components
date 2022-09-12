import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {AbstractHeaderService} from '../abstract-header-service';
import {HeaderType} from '../models/header-type';
import {HeaderColumn, HeaderColumnType} from '../models/header-column';
import {CaseMetaField} from './case-menta-enum';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {LoggerService} from '../../logger/services/logger.service';
import {NAE_DEFAULT_HEADERS} from '../models/default-headers-token';
import {Subscription} from 'rxjs';
import {OverflowService} from '../services/overflow.service';
import {ViewIdService} from '../../user/services/view-id.service';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';


@Injectable()
export class CaseHeaderService extends AbstractHeaderService implements OnDestroy {
    protected subAllowedNets: Subscription;

    constructor(protected _allowedNetsService: AllowedNetsService,
                preferences: UserPreferenceService,
                logger: LoggerService,
                @Optional() viewIdService: ViewIdService,
                @Optional() protected overflowService: OverflowService,
                @Optional() @Inject(NAE_DEFAULT_HEADERS) naeDefaultHeaders: Array<string>) {
        super(HeaderType.CASE, preferences, logger, viewIdService, overflowService);
        this.subAllowedNets = _allowedNetsService.allowedNets$.subscribe(allowedNets => {
            this.setAllowedNets(allowedNets);
            if (naeDefaultHeaders && Array.isArray(naeDefaultHeaders) && naeDefaultHeaders.length > 0) {
                this.initDefaultHeaders = naeDefaultHeaders;
                this.initializeDefaultHeaderState();
            } else {
                this.loadHeadersFromPreferences();
            }
            this.loading.off();
        });
    }

    protected createMetaHeaders(): Array<HeaderColumn> {
        return [
            new HeaderColumn(HeaderColumnType.META, CaseMetaField.VISUAL_ID, 'headers.caseMeta.visualID', 'text'),
            new HeaderColumn(HeaderColumnType.META, CaseMetaField.MONGO_ID, 'headers.caseMeta.mongoID', 'text', false),
            new HeaderColumn(HeaderColumnType.META, CaseMetaField.TITLE, 'headers.caseMeta.title', 'text'),
            new HeaderColumn(HeaderColumnType.META, CaseMetaField.AUTHOR, 'headers.caseMeta.author', 'user'),
            new HeaderColumn(HeaderColumnType.META, CaseMetaField.CREATION_DATE, 'headers.caseMeta.creationDate', 'date'),
        ];
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.subAllowedNets.unsubscribe();
    }

    public updateColumnCount() {
        this.updateHeaderColumnCount();
    }

    protected saveState() {
        if (this.overflowService) {
            this.overflowService.saveState();
        }
    }

    protected saveNewState() {
        if (this.overflowService) {
            this.overflowService.saveNewState();
        }
        this.updateHeaderColumnCount();
    }

    protected restoreLastState() {
        if (this.overflowService) {
            this.overflowService.restoreLastState();
        }
    }
}
