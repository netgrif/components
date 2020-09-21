import {AfterViewInit, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CaseViewService} from '../../service/case-view-service';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {Observable} from 'rxjs';
import {Case} from '../../../../resources/interface/case';
import {HeaderColumn} from '../../../../header/models/header-column';
import {LoggerService} from '../../../../logger/services/logger.service';

export abstract class AbstractCaseListComponent implements OnInit, AfterViewInit {

    @Input() selectedHeaders$: Observable<Array<HeaderColumn>>;
    @Input() responsiveBody = true;
    @Output() caseClick: EventEmitter<Case>;
    @Input() showCasePanelIcon = true;
    @Input() showDeleteMenu = false;

    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;
    public cases$: Observable<Array<Case>>;
    public loading$: Observable<boolean>;

    protected constructor(protected _caseViewService: CaseViewService, protected _log: LoggerService) {
        this.cases$ = this._caseViewService.cases$;
        this.loading$ = this._caseViewService.loading$;
        this.caseClick = new EventEmitter<Case>();
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    public trackBy(i): any {
        return i;
    }

    public get loadedDataSize(): number {
        return this.viewport && this.viewport.getDataLength() ? this.viewport.getDataLength() : 0;
    }

    public loadNextPage(): void {
        if (!this.viewport) {
            return;
        }
        this._caseViewService.nextPage(this.viewport.getRenderedRange(), this.viewport.getDataLength());
    }

    public onCaseClick(case_: Case) {
        this.caseClick.emit(case_);
    }

}
