import {Case} from '../../resources/interface/case';
import {Observable} from 'rxjs';
import {HeaderType} from '../../header/models/header-type';
import {CaseViewService} from './service/case-view-service';
import {ViewWithHeaders} from '../abstract/view-with-headers';
import {Authority} from '../../resources/interface/authority';
import {OverflowService} from '../../header/services/overflow.service';


export abstract class AbstractCaseView extends ViewWithHeaders {

    public readonly MINIMAL_OFFSET = 120;
    public readonly headerType: HeaderType = HeaderType.CASE;
    public cases$: Observable<Array<Case>>;
    public loading: boolean;
    public authorityToCreate: Array<string>;

    protected constructor(protected _caseViewService: CaseViewService,
                          protected _overflowService?: OverflowService,
                          protected _authority: Array<Authority> = [{authority: 'ROLE_USER'}]) {
        super(_caseViewService);
        this._caseViewService.loading$.subscribe(loading => {
            this.loading = loading;
        });
        this.cases$ = this._caseViewService.cases$;
        this.authorityToCreate = _authority.map(a => a.authority);
    }

    public createNewCase(): void {
        this._caseViewService.createNewCase();
    }

    public abstract handleCaseClick(clickedCase: Case): void;

    public hasAuthority(): boolean {
        return (this._caseViewService.hasAuthority(this.authorityToCreate) && this._caseViewService.hasAllowedNets());
    }

    public getWidth() {
        return (this._overflowService && this._overflowService.overflowMode && this._overflowService.columnCount) ?
            `${this._overflowService.columnCount * this._overflowService.columnWidth + this.MINIMAL_OFFSET}px` : '100%';
    }

    public getOverflowStatus() {
        return this._overflowService ? this._overflowService.overflowMode : false;
    }
}
