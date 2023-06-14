import {Component, Inject, Input, OnDestroy, OnInit, Optional} from '@angular/core';
import {TaskContentService} from '../services/task-content.service';
import {DatafieldGridLayoutElement} from '../model/datafield-grid-layout-element';
import {TaskContentElementType, TaskElementType} from '../model/task-content-element-type';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {FieldTypeResource} from '../model/field-type-resource';
import {NAE_INFORM_ABOUT_INVALID_DATA} from "../../data-fields/models/invalid-data-policy-token";
import {FormControl} from "@angular/forms";

/**
 * Resolves the correct {@link AbstractDataFieldComponent} implementation for the provided data field object.
 */
@Component({
    selector: 'ncc-abstract-field-component-resolver',
    template: ''
})
export abstract class AbstractFieldComponentResolverComponent implements OnInit, OnDestroy {
    @Input() gridElement: DatafieldGridLayoutElement;

    public fieldTypeEnum = FieldTypeResource;
    public taskElementEnum = TaskElementType;

    public readonly FIELD_TYPES_WITH_BASIC_UPDATE = [
        FieldTypeResource.BOOLEAN,
        FieldTypeResource.ENUMERATION,
        FieldTypeResource.ENUMERATION_MAP,
        FieldTypeResource.MULTICHOICE,
        FieldTypeResource.MULTICHOICE_MAP
    ]

    protected constructor(protected taskContentService: TaskContentService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) protected _informAboutInvalidData: boolean | null) {
    }

    ngOnInit() {
        if (!!this.gridElement.item) {
            this.gridElement.item.registerFormControl(new FormControl('', {updateOn: this.gridElement.item.getUpdateOnStrategy()}));
            this.gridElement.item.sendInvalidValues = this._informAboutInvalidData;
        }
    }

    ngOnDestroy() {
        if (!!this.gridElement?.item) {
            this.gridElement.item.disconnectFormControl();
        }
    }

    protected isOffsetPresent(): boolean {
        return !!this.taskContentService.task && !!this.taskContentService.task.layout && !!this.taskContentService.task.layout.offset;
    }

    getFieldOffset(): number {
        return this.isOffsetPresent() ? this.taskContentService.task.layout.offset : 0;
    }

    getElementType(): TaskContentElementType {
        return this.gridElement.type as TaskContentElementType;
    }

    getDataGroupTitle(): string {
        return this.gridElement.title;
    }

    getDataField(): DataField<unknown> {
        return this.gridElement.item;
    }

    getTaskId(): string {
        return this.taskContentService.task.stringId;
    }

    isField(): boolean {
        return this.gridElement.type !== TaskElementType.BLANK && this.gridElement.type !== TaskElementType.DATA_GROUP_TITLE;
    }

    isCustomHeight(): boolean {
        const component = !!this.gridElement.item?.component ? this.gridElement.item.component : null;
        return this.gridElement.type === FieldTypeResource.I18N && !!component
            && (component.name === 'divider'
                || (!!component.properties && 'plainText' in component.properties && component.properties.plaintText === 'true')
            );
    }
}
