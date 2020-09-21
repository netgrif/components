import {Case} from '../../resources/interface/case';
import {Observable} from 'rxjs';
import {HeaderType} from '../../header/models/header-type';
import {CaseViewService} from './service/case-view-service';
import {ViewWithHeaders} from '../abstract/view-with-headers';
import {Authority} from '../../resources/interface/authority';


export abstract class AbstractCaseView extends ViewWithHeaders {

    public readonly headerType: HeaderType = HeaderType.CASE;
    public cases$: Observable<Array<Case>>;
    public loading: boolean;
    public authorityToCreate: Array<string>;

    protected constructor(protected _caseViewService: CaseViewService,
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
        return this._caseViewService.hasAuthority(this.authorityToCreate);
    }
}
