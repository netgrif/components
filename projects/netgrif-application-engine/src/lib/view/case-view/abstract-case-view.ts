import {Case} from '../../resources/interface/case';
import {Observable} from 'rxjs';
import {HeaderType} from '../../header/models/header-type';
import {CaseViewService} from './service/case-view-service';
import {ViewWithHeaders} from '../abstract/view-with-headers';


export abstract class AbstractCaseView extends ViewWithHeaders {

    public readonly headerType: HeaderType = HeaderType.CASE;
    public cases$: Observable<Array<Case>>;
    public loading: boolean;

    protected constructor(protected _caseViewService: CaseViewService) {
        super(_caseViewService);
        this._caseViewService.loading$.subscribe(loading => {
            this.loading = loading;
        });
        this.cases$ = this._caseViewService.cases$;
    }

    public createNewCase(): void {
        this._caseViewService.createNewCase();
    }

    public abstract handleCaseClick(clickedCase: Case): void;
}
