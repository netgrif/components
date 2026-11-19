import {Case} from '../../resources/interface/case';
import {Observable, Subscription} from 'rxjs';
import {HeaderType} from '../../header/models/header-type';
import {CaseViewService} from './service/case-view-service';
import {AbstractViewWithHeadersComponent} from '../abstract/view-with-headers';
import {Authority} from '../../resources/interface/authority';
import {OverflowService} from '../../header/services/overflow.service';
import {
    NAE_NEW_CASE_CREATION_CONFIGURATION_DATA,
    NewCaseCreationConfigurationData
} from '../../side-menu/content-components/new-case/model/new-case-injection-data';
import {Component, Inject, Optional, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ncc-abstract-case-view',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractCaseViewComponent extends AbstractViewWithHeadersComponent implements OnDestroy{

    /** @deprecated the width of the case list is no longer computed ({@link getWidth} is always 100%) */
    public readonly MINIMAL_OFFSET = 120;
    public readonly headerType: HeaderType = HeaderType.CASE;
    public cases$: Observable<Array<Case>>;
    public loading: boolean;
    public canCreate: boolean;
    public authorityToCreate: Array<string>;
    protected canCreateSub: Subscription;

    protected constructor(protected _caseViewService: CaseViewService,
                          protected _overflowService?: OverflowService,
                          protected _authority: Array<Authority> = [{authority: 'ROLE_USER'}],
                          @Optional() @Inject(NAE_NEW_CASE_CREATION_CONFIGURATION_DATA) protected _newCaseCreationConfig: NewCaseCreationConfigurationData = {
                              enableCaseTitle: true,
                              isCaseTitleRequired: true
                          },
                          protected _activatedRoute?: ActivatedRoute) {
        super(_caseViewService, _activatedRoute);
        this._caseViewService.loading$.subscribe(loading => {
            this.loading = loading;
        });
        this.canCreateSub = this._caseViewService.getNewCaseAllowedNets().subscribe(allowedNets => {
            this.canCreate = allowedNets.length > 0;
        });
        this.cases$ = this._caseViewService.cases$;
        this.authorityToCreate = _authority.map(a => a.authority);
    }

    get newCaseCreationConfig(): NewCaseCreationConfigurationData {
        return this._newCaseCreationConfig;
    }

    public abstract handleCaseClick(clickedCase: Case): void;

    public hasAuthority(): boolean {
        return (this._caseViewService.hasAuthority(this.authorityToCreate) && this.canCreate);
    }

    /**
     * Width of the header and the rows. Always the width of the view: in table mode the columns have a minimal width
     * (`OverflowService.MIN_COLUMN_WIDTH`) and the list grows (scrolls horizontally) only when they do not fit.
     */
    public getWidth() {
        return '100%';
    }

    public getOverflowStatus() {
        return this._overflowService ? this._overflowService.overflowMode : false;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.canCreateSub) {
            this.canCreateSub.unsubscribe();
        }
    }
}
