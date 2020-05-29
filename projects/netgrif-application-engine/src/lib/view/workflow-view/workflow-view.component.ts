import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {ImportNetComponent} from '../../side-menu/content-components/import-net/import-net.component';
import {WorkflowViewService} from './workflow-view.service';
import {HeaderComponent} from '../../header/header.component';
import {ViewWithHeaders} from '../abstract/view-with-headers';
import {HeaderType} from '../../header/models/header-type';
import {Observable} from 'rxjs';
import {Net} from '../../process/net';
import {tap} from 'rxjs/operators';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {LoggerService} from '../../logger/services/logger.service';


@Component({
    selector: 'nae-workflow-view',
    templateUrl: './workflow-view.component.html',
    styleUrls: ['./workflow-view.component.scss'],
    providers: [WorkflowViewService]
})
export class WorkflowViewComponent extends ViewWithHeaders implements AfterViewInit {

    @Input() public footerSize: number;
    @ViewChild('header') public workflowHeader: HeaderComponent;

    public readonly headerType = HeaderType.WORKFLOW;
    public workflows$: Observable<Array<Net>>;
    public loading$: Observable<boolean>;

    private _viewport: CdkVirtualScrollViewport;

    constructor(private _sideMenuService: SideMenuService, private _workflowViewService: WorkflowViewService, private _log: LoggerService) {
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

    public importNet() {
        this._sideMenuService.open(ImportNetComponent).onClose.subscribe(event => {
            if (event.data !== undefined) {
                this._workflowViewService.reload();
            }
        });
    }

    public trackBy(i, item): any {
        return i + '_' + item;
    }

    private calculateListHeight(preciseHeight?: number): void {
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
