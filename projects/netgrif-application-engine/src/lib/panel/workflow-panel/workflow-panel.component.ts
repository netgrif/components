import {Component, Input, OnInit} from '@angular/core';
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


export interface WorkflowPanelContent {
    netIdentifier: TextField;
    title: TextField;
    version: TextField;
    author: TextField;
    uploaded: DateTimeField;
}

@Component({
    selector: 'nae-workflow-panel',
    templateUrl: './workflow-panel.component.html',
    styleUrls: ['./workflow-panel.component.scss']
})
export class WorkflowPanelComponent extends PanelWithHeaderBinding implements OnInit {

    @Input() public workflow: Net;
    @Input() public selectedHeaders$: Observable<Array<HeaderColumn>>;
    public panelRef: MatExpansionPanel;
    public panelContent: WorkflowPanelContent;

    private dataFieldsBehaviour: Behavior = {visible: true, editable: false};

    constructor(private _log: LoggerService, private _translate: TranslateService) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.panelContent = this.createPanelContent();
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
     * Populate data fields group for every petri net model
     */
    private createPanelContent(): WorkflowPanelContent {
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

    protected getFeaturedMetaValue(selectedHeader: HeaderColumn): string {
        switch (selectedHeader.fieldIdentifier) {
            case WorkflowMetaField.INITIALS:
                return this.workflow.initials;
            case WorkflowMetaField.TITLE:
                return this.workflow.title;
            case WorkflowMetaField.VERSION:
                return this.workflow.version;
            case WorkflowMetaField.AUTHOR:
                return this.workflow.author.fullName;
            case WorkflowMetaField.CREATION_DATE:
                return toMoment(this.workflow.createdDate).format(DATE_TIME_FORMAT_STRING);
        }
    }

    protected getFeaturedImmediateValue(selectedHeader: HeaderColumn): string {
        this._log.warn('Immediate data in workflow panel headers are currently not supported');
        return '';
    }

}
