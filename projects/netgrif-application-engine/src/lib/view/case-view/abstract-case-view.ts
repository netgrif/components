import {Case} from '../../resources/interface/case';
import {BehaviorSubject} from 'rxjs';
import {HeaderType} from '../../header/models/header-type';
import {CaseViewService} from './case-view-service';
import {ViewWithHeaders} from '../abstract/view-with-headers';


export abstract class AbstractCaseView extends ViewWithHeaders {

    public readonly headerType: HeaderType = HeaderType.CASE;
    public cases$: BehaviorSubject<Array<Case>>;

    protected constructor(protected _caseViewService: CaseViewService,
                          baseFilter: string = '{}') {
        super(_caseViewService);
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
