import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CaseViewService} from '../../service/case-view-service';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {Observable} from 'rxjs';
import {Case} from '../../../../resources/interface/case';
import {HeaderColumn} from '../../../../header/models/header-column';
import {tap} from 'rxjs/operators';
import {LoggerService} from '../../../../logger/services/logger.service';

@Component({
    selector: 'nae-case-list',
    templateUrl: './case-list.component.html',
    styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit, AfterViewInit {

    @Input() footerSize: number;
    @Input() selectedHeaders$: Observable<Array<HeaderColumn>>;
    @Output() caseClick: EventEmitter<Case>;

    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;
    public cases$: Observable<Array<Case>>;
    public loading$: Observable<boolean>;

    constructor(private _caseViewService: CaseViewService, private _log: LoggerService) {
        this.cases$ = this._caseViewService.cases$.pipe(
            tap(c => {
                if (c.length === 0) {
                    this.calculateHeight(0);
                } else {
                    this.calculateHeight();
                }
            })
        );
        this.loading$ = this._caseViewService.loading$;
        this.caseClick = new EventEmitter<Case>();
    }

    ngOnInit(): void {
        this.footerSize = this.footerSize ? this.footerSize : 0;
    }

    ngAfterViewInit(): void {
        this.calculateHeight();
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
        this._caseViewService.nextPage(this.viewport.getRenderedRange().end, this.viewport.getDataLength());
    }

    public onCaseClick(case_: Case) {
        this.caseClick.emit(case_);
    }

    private calculateHeight(preciseHeight?: number): void {
        if (!this.viewport) {
            return;
        }
        const element = this.viewport.getElementRef().nativeElement;
        if (preciseHeight !== null && preciseHeight !== undefined) {
            element.style.height = preciseHeight + 'px';
        } else {
            const viewportHeight = window.innerHeight - element.offsetTop - this.footerSize;
            if (element.style.height !== viewportHeight + 'px') {
                this._log.info('Virtual scroll height change to: ' + viewportHeight);
                element.style.height = viewportHeight + 'px';
            }
        }
    }

}
