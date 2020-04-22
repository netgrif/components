import {Case} from '../../resources/interface/case';
import {BehaviorSubject} from 'rxjs';
import {HeaderType} from '../../header/models/header-type';
import {CaseViewService} from './case-view-service';
import {ViewWithHeaders} from '../abstract/view-with-headers';
import {FilterType} from '../../filter/models/filter-type';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {Filter} from '../../filter/models/filter';


export abstract class AbstractCaseView extends ViewWithHeaders {

    public readonly headerType: HeaderType = HeaderType.CASE;
    public cases$: BehaviorSubject<Array<Case>>;
    public loading: boolean;

    protected constructor(protected _caseViewService: CaseViewService,
                          baseFilter: Filter = new SimpleFilter('', FilterType.CASE, {})) {
        super(_caseViewService);
        this._caseViewService.loading$.subscribe( loading => {
            this.loading = loading;
        });
        this.cases$ = new BehaviorSubject<Array<Case>>([]);
        this._caseViewService.baseFilter = baseFilter;
        this._caseViewService.cases$.subscribe(newCases => {
            this.cases$.next(newCases);
        });
        this._caseViewService.loadCases();
    }

    public createNewCase(): void {
        this._caseViewService.createNewCase();
    }

    public abstract handleCaseClick(clickedCase: Case): void;
}
