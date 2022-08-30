import {Component, Input} from '@angular/core';
import {TaskContentService} from '../services/task-content.service';
import {DatafieldGridLayoutElement} from '../model/datafield-grid-layout-element';
import {TaskContentElementType, TaskElementType} from '../model/task-content-element-type';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {FieldTypeResource} from '../model/field-type-resource';

/**
 * Resolves the correct {@link AbstractDataFieldComponent} implementation for the provided data field object.
 */
@Component({
    selector: 'ncc-abstract-field-component-resolver',
    template: ''
})
export abstract class AbstractFieldComponentResolverComponent {
    @Input() gridElement: DatafieldGridLayoutElement;

    public fieldTypeEnum = FieldTypeResource;
    public taskElementEnum = TaskElementType;

    protected constructor(protected taskContentService: TaskContentService) {
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
        const referencedTaskId = this.taskContentService.getReferencedFieldTask(this.getDataField().stringId);
        return referencedTaskId ?? this.taskContentService.task.stringId;
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
