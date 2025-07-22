import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {WorkflowViewService} from './workflow-view.service';
import {AbstractHeaderComponent} from '../../header/abstract-header.component';
import {AbstractViewWithHeadersComponent} from '../abstract/view-with-headers';
import {HeaderType} from '../../header/models/header-type';
import {Observable} from 'rxjs';
import {Net} from '../../process/net';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {LoggerService} from '../../logger/services/logger.service';
import {ProcessService} from '../../process/process.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from "@angular/forms";
import {debounceTime, filter, map, take, tap} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'ncc-abstract-workflow-view',
    template: ''
})
export abstract class AbstractWorkflowViewComponent extends AbstractViewWithHeadersComponent implements OnInit, AfterViewInit {

    @Input() public footerSize: number;
    @Input() showDeleteMenu = false;
    @ViewChild('header') public workflowHeader: AbstractHeaderComponent;

    public readonly headerType = HeaderType.WORKFLOW;
    public workflows$: Observable<Array<Net>>;
    public loading$: Observable<boolean>;
    public fullTextFormControl: FormControl;

    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    protected constructor(protected _dialog: MatDialog,
                          protected _workflowViewService: WorkflowViewService,
                          protected _log: LoggerService,
                          protected _processService: ProcessService,
                          _activatedRoute?: ActivatedRoute) {
        super(_workflowViewService, _activatedRoute);
        this.workflows$ = this._workflowViewService.workflows$;
        this.loading$ = this._workflowViewService.loading$;
        this.footerSize = 0;
        this.fullTextFormControl = new FormControl();
    }

    ngOnInit(): void {
        this.fullTextFormControl.valueChanges.pipe(
            debounceTime(600),
            filter(newValue => typeof newValue === 'string'),
            map((newValue: string) => newValue.trim())
        ).subscribe((fulltext: string) => {
            if (fulltext.length === 0) {
                this._workflowViewService.clearSearchTitle();
            } else {
                this._workflowViewService.setSearchTitle(fulltext);
            }
        });
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.workflowHeader);
    }

    public importSidemenuNet(component) {
        const dialogRef = this._dialog.open(component, {
            width: '40%',
            minWidth: '300px',
            panelClass: "dialog-responsive",
        });
        dialogRef.afterClosed().subscribe(event => {
            if (event.data?.net !== undefined) {
                this._workflowViewService.reload();
                if (event.data?.net) {
                    this._processService.updateNet(new Net(event.data.net));
                }
            } else {
                this._log.debug('');
            }
        });
    }

    public trackBy(i): any {
        return i;
    }

    public loadNextPage(): void {
        if (!this.viewport) {
            return;
        }
        this._workflowViewService.nextPage(this.viewport.getRenderedRange(), this.viewport.getDataLength());
    }

    protected calculateListHeight(preciseHeight?: number): void {
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
