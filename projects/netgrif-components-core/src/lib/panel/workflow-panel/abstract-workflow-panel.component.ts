import {Input, OnDestroy, OnInit} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';
import {PanelWithHeaderBinding} from '../abstract/panel-with-header-binding';
import {HeaderColumn} from '../../header/models/header-column';
import {Observable, Subscription} from 'rxjs';
import {LoggerService} from '../../logger/services/logger.service';
import {toMoment} from '../../resources/types/nae-date-type';
import {DATE_TIME_FORMAT_STRING} from '../../moment/time-formats';
import {TextField} from '../../data-fields/text-field/models/text-field';
import {DateTimeField} from '../../data-fields/date-time-field/models/date-time-field';
import {Behavior} from '../../data-fields/models/behavior';
import {Net} from '../../process/net';
import {TranslateService, TranslationChangeEvent} from '@ngx-translate/core';
import {WorkflowMetaField} from '../../header/workflow-header/workflow-meta-enum';
import {WorkflowViewService} from '../../view/workflow-view/workflow-view.service';
import {FeaturedValue} from '../abstract/featured-value';
import {PetriNetResourceService} from '../../resources/engine-endpoint/petri-net-resource.service';
import {ProgressType, ProviderProgress} from '../../resources/resource-provider.service';


export interface WorkflowPanelContent {
    netIdentifier: TextField;
    title: TextField;
    version: TextField;
    author: TextField;
    uploaded: DateTimeField;
}

export abstract class AbstractWorkflowPanelComponent extends PanelWithHeaderBinding implements OnInit, OnDestroy {

    @Input() public workflow: Net;
    @Input() public selectedHeaders$: Observable<Array<HeaderColumn>>;
    @Input() responsiveBody = true;
    @Input() showDeleteMenu = false;
    public panelRef: MatExpansionPanel;
    public panelContent: WorkflowPanelContent;
    private _subscription: Subscription;
    private readonly TRANSLATION_NET = 'panel.workflow.net';
    private readonly TRANSLATION_TITLE = 'panel.workflow.title';
    private readonly TRANSLATION_VERSION = 'panel.workflow.version';
    private readonly TRANSLATION_AUTHOR = 'panel.workflow.author';
    private readonly TRANSLATION_UPLOAD = 'panel.workflow.upload';

    protected dataFieldsBehaviour: Behavior = {visible: true, editable: false};

    protected constructor(protected _log: LoggerService,
                          protected _translate: TranslateService,
                          protected _workflowService: WorkflowViewService,
                          protected _petriNetResource: PetriNetResourceService) {
        super();

        this._subscription = _translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
            this.panelContent.netIdentifier.title = this._translate.instant(this.TRANSLATION_NET);
            this.panelContent.title.title = this._translate.instant(this.TRANSLATION_TITLE);
            this.panelContent.version.title = this._translate.instant(this.TRANSLATION_VERSION);
            this.panelContent.author.title = this._translate.instant(this.TRANSLATION_AUTHOR);
            this.panelContent.uploaded.title = this._translate.instant(this.TRANSLATION_UPLOAD);
        });
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.panelContent = this.createPanelContent();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._subscription.unsubscribe();
    }

    public show(event: MouseEvent): boolean {
        event.stopPropagation();
        return false;
    }

    public collapse() {
    }

    public setPanelRef(panelRef: MatExpansionPanel) {
        this.panelRef = panelRef;
    }

    /**
     * Handles the logic that should be executed when the "delete workflow" button is clicked.
     *
     * Calls the appropriate method in the {@link WorkflowViewService}.
     */
    public deleteWorkflow(): void {
        this._workflowService.deleteWorkflow(this.workflow);
    }

    /**
     * Handles the logic that should be executed when the "download workflow" button is clicked.
     *
     * Calls the appropriate method in the {@link WorkflowViewService}.
     */
    public downloadNetFile() {
        this._petriNetResource.getNetFile(this.workflow.stringId).subscribe(response => {
            if (!(response as ProviderProgress).type || (response as ProviderProgress).type !== ProgressType.DOWNLOAD) {
                this._log.debug(`File ${this.workflow.identifier} was successfully downloaded`);
                this.downloadViaAnchor(response as Blob);
            }
        }, error => {
            this._log.error(`Downloading file ${this.workflow.identifier} has failed!`, error);
        });
    }

    protected downloadViaAnchor(blob: Blob): void {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        blob = new Blob([blob], {type: blob.type});

        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = this.workflow.identifier;
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    /**
     * Populate data fields group for every petri net model
     */
    protected createPanelContent(): WorkflowPanelContent {
        return {
            netIdentifier: new TextField('', this._translate.instant(this.TRANSLATION_NET),
                this.workflow.identifier, this.dataFieldsBehaviour),
            title: new TextField('', this._translate.instant(this.TRANSLATION_TITLE),
                this.workflow.title, this.dataFieldsBehaviour),
            version: new TextField('', this._translate.instant(this.TRANSLATION_VERSION),
                this.workflow.version, this.dataFieldsBehaviour),
            author: new TextField('', this._translate.instant(this.TRANSLATION_AUTHOR),
                this.workflow.author.fullName, this.dataFieldsBehaviour),
            uploaded: new DateTimeField('', this._translate.instant(this.TRANSLATION_UPLOAD),
                toMoment(this.workflow.createdDate), this.dataFieldsBehaviour)
        };
    }

    protected resolveFeaturedFieldsValues(): void {
        if (!this._lastSelectedHeaders) {
            return;
        }

        this.featuredFieldsValues.splice(0, this.featuredFieldsValues.length);
        this._lastSelectedHeaders.forEach(header => {
            this.featuredFieldsValues.push(this.getFeaturedValue(header));
        });
    }

    protected getFeaturedMetaValue(selectedHeader: HeaderColumn): FeaturedValue {
        switch (selectedHeader.fieldIdentifier) {
            case WorkflowMetaField.INITIALS:
                return {value: this.workflow.initials, icon: '', type: 'meta'};
            case WorkflowMetaField.TITLE:
                return {value: this.workflow.title, icon: '', type: 'meta'};
            case WorkflowMetaField.NET_ID:
                return {value: this.workflow.stringId, icon: '', type: 'meta'};
            case WorkflowMetaField.VERSION:
                return {value: this.workflow.version, icon: '', type: 'meta'};
            case WorkflowMetaField.AUTHOR:
                return {value: this.workflow.author.fullName, icon: 'account_circle', type: 'meta'};
            case WorkflowMetaField.CREATION_DATE:
                return {value: toMoment(this.workflow.createdDate).format(DATE_TIME_FORMAT_STRING), icon: 'event', type: 'meta'};
        }
    }

    protected getFeaturedImmediateValue(selectedHeader: HeaderColumn): FeaturedValue {
        this._log.warn('Immediate data in workflow panel headers are currently not supported');
        return {value: '', icon: '', type: ''};
    }

}
