import {AfterViewInit, Input, ViewChild} from '@angular/core';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {WorkflowViewService} from './workflow-view.service';
import {AbstractHeaderComponent} from '../../header/abstract-header.component';
import {ViewWithHeaders} from '../abstract/view-with-headers';
import {HeaderType} from '../../header/models/header-type';
import {Observable} from 'rxjs';
import {Net} from '../../process/net';
import {tap} from 'rxjs/operators';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {LoggerService} from '../../logger/services/logger.service';
import {ProcessService} from '../../process/process.service';

export abstract class AbstractWorkflowViewComponent extends ViewWithHeaders implements AfterViewInit {

    @Input() public footerSize: number;
    @ViewChild('header') public workflowHeader: AbstractHeaderComponent;

    public readonly headerType = HeaderType.WORKFLOW;
    public workflows$: Observable<Array<Net>>;
    public loading$: Observable<boolean>;

    protected _viewport: CdkVirtualScrollViewport;

    constructor(protected _sideMenuService: SideMenuService,
                protected _workflowViewService: WorkflowViewService,
                protected _log: LoggerService,
                protected _processService: ProcessService) {
        super(_workflowViewService);
        this.workflows$ = this._workflowViewService.workflows$.pipe(
            tap(nets => {
                nets.length === 0 ? this.calculateListHeight(0) : this.calculateListHeight();
            })
        );
        this.loading$ = this._workflowViewService.loading$;
        this.footerSize = 0;
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.workflowHeader);
        this.calculateListHeight();
    }

    @ViewChild('scrollViewport')
    public set viewport(viewport: CdkVirtualScrollViewport) {
        this._viewport = viewport;
        this.calculateListHeight();
    }

    public importSidemenuNet(component) {
        this._sideMenuService.open(component).onClose.subscribe(event => {
            if (event.data !== undefined) {
                this._workflowViewService.reload();
                if (event.data.net) {
                    this._processService.updateNet(new Net(event.data.net));
                }
            }
        });
    }

    public trackBy(i, item): any {
        return i + '_' + item;
    }

    protected calculateListHeight(preciseHeight?: number): void {
        if (!this._viewport) {
            return;
        }
        const element = this._viewport.getElementRef().nativeElement;
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
