import {Case} from '../../resources/interface/case';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {HeaderComponent} from '../../header/header.component';
import {HeaderType} from '../../header/models/header-type';
import {CaseViewService} from './case-view-service';
import {HeaderColumn} from '../../header/models/header-column';


export abstract class AbstractCaseView {

    public readonly headerType: HeaderType = HeaderType.CASE;
    public selectedHeaders$: ReplaySubject<Array<HeaderColumn>>;
    public cases$: BehaviorSubject<Array<Case>>;

    protected constructor(protected _caseViewService: CaseViewService,
                          baseFilter: string = '{}') {
        this.selectedHeaders$ = new ReplaySubject<Array<HeaderColumn>>(1);
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

    protected initializeHeader(caseHeaderComponent: HeaderComponent): void {
        caseHeaderComponent.headerService.selectedHeaders$.subscribe(selectedHeaders => this.selectedHeaders$.next(selectedHeaders));
        this._caseViewService.registerHeaderChange(caseHeaderComponent.headerService.headerChange$);
    }

    public abstract handleCaseClick(clickedCase: Case): void;
}
