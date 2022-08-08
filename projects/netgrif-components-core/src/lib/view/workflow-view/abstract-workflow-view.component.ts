import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
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

@Component({
    selector: 'ncc-abstract-workflow-view',
    template: ''
})
export abstract class AbstractWorkflowViewComponent extends AbstractViewWithHeadersComponent implements AfterViewInit {

    @Input() public footerSize: number;
    @Input() showDeleteMenu = false;
    @ViewChild('header') public workflowHeader: AbstractHeaderComponent;

    public readonly headerType = HeaderType.WORKFLOW;
    public workflows$: Observable<Array<Net>>;
    public loading$: Observable<boolean>;

    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    protected constructor(protected _sideMenuService: SideMenuService,
                          protected _workflowViewService: WorkflowViewService,
                          protected _log: LoggerService,
                          protected _processService: ProcessService,
                          _activatedRoute?: ActivatedRoute) {
        super(_workflowViewService, _activatedRoute);
        this.workflows$ = this._workflowViewService.workflows$;
        this.loading$ = this._workflowViewService.loading$;
        this.footerSize = 0;
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.workflowHeader);
    }

    public importSidemenuNet(component) {
        this._sideMenuService.open(component).onClose.subscribe(event => {
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
