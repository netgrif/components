import {Input, OnDestroy, OnInit} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';
import {PanelWithHeaderBinding} from '../abstract/panel-with-header-binding';
import {HeaderColumn} from '../../header/models/header-column';
import {Observable} from 'rxjs';
import {LoggerService} from '../../logger/services/logger.service';
import {toMoment} from '../../resources/types/nae-date-type';
import {DATE_TIME_FORMAT_STRING} from '../../moment/time-formats';
import {TextField} from '../../data-fields/text-field/models/text-field';
import {DateTimeField} from '../../data-fields/date-time-field/models/date-time-field';
import {Behavior} from '../../data-fields/models/behavior';
import {Net} from '../../process/net';
import {TranslateService} from '@ngx-translate/core';
import {WorkflowMetaField} from '../../header/workflow-header/workflow-meta-enum';
import {WorkflowViewService} from '../../view/workflow-view/workflow-view.service';
import {FeaturedValue} from '../abstract/featured-value';


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

    protected dataFieldsBehaviour: Behavior = {visible: true, editable: false};

    protected constructor(protected _log: LoggerService,
                          protected _translate: TranslateService,
                          protected _workflowService: WorkflowViewService) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.panelContent = this.createPanelContent();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
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
     * Populate data fields group for every petri net model
     */
    protected createPanelContent(): WorkflowPanelContent {
        return {
            netIdentifier: new TextField('', this._translate.instant('panel.workflow.net'),
                this.workflow.identifier, this.dataFieldsBehaviour),
            title: new TextField('', this._translate.instant('panel.workflow.title'),
                this.workflow.title, this.dataFieldsBehaviour),
            version: new TextField('', this._translate.instant('panel.workflow.version'),
                this.workflow.version, this.dataFieldsBehaviour),
            author: new TextField('', this._translate.instant('panel.workflow.author'),
                this.workflow.author.fullName, this.dataFieldsBehaviour),
            uploaded: new DateTimeField('', this._translate.instant('panel.workflow.upload'),
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
            default:
                this._log.errorAndThrow(new Error(`Unsupported featured meta type '${selectedHeader.fieldIdentifier}'`));
        }
    }

    protected getFeaturedImmediateValue(selectedHeader: HeaderColumn): FeaturedValue {
        this._log.warn('Immediate data in workflow panel headers are currently not supported');
        return {value: '', icon: '', type: ''};
    }

}
