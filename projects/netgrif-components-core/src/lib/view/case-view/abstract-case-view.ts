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
import {Component, Inject, Optional, OnDestroy} from '@angular/core';

@Component({
    selector: 'ncc-abstract-case-view',
    template: ''
})
export abstract class AbstractCaseViewComponent extends AbstractViewWithHeadersComponent implements OnDestroy{

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
                          }) {
        super(_caseViewService);
        this._caseViewService.loading$.subscribe(loading => {
            this.loading = loading;
        });
        this.canCreateSub = this._caseViewService.getNewCaseAllowedNets().subscribe(allowedNets => {
            this.canCreate = allowedNets.length > 0;
        });
        this.cases$ = this._caseViewService.cases$;
        this.authorityToCreate = _authority.map(a => a.authority);
    }

    public createNewCase(): Observable<Case> {
        if (this._newCaseCreationConfig.enableCaseTitle === false && this._caseViewService.getAllowedNetsCount() === 1) {
            return this._caseViewService.createDefaultNewCase();
        } else {
            return this._caseViewService.createNewCase(this._newCaseCreationConfig);
        }
    }

    public abstract handleCaseClick(clickedCase: Case): void;

    public hasAuthority(): boolean {
        return (this._caseViewService.hasAuthority(this.authorityToCreate) && this.canCreate);
    }

    public getWidth() {
        return (this._overflowService && this._overflowService.overflowMode && this._overflowService.columnCount) ?
            `${this._overflowService.columnCount * this._overflowService.columnWidth + this.MINIMAL_OFFSET}px` : '100%';
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
