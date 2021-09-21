import {Input} from '@angular/core';
import {TaskContentService} from '../services/task-content.service';
import {DatafieldGridLayoutElement} from '../model/datafield-grid-layout-element';
import {TaskContentElementType, TaskElementType} from '../model/task-content-element-type';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {FieldTypeResource} from '../model/field-type-resource';

/**
 * Resolves the correct {@link AbstractDataFieldComponent} implementation for the provided data field object.
 */
export abstract class AbstractFieldComponentResolverComponent {
    @Input() gridElement: DatafieldGridLayoutElement;

    public fieldTypeEnum = FieldTypeResource;
    public taskElementEnum = TaskElementType;

    protected constructor(protected taskContentService: TaskContentService) {
    }

    getFieldOffset(): number {
        return this.taskContentService.task?.layout?.offset ?? 0;
    }

    getElementType(): TaskContentElementType {
        return this.gridElement.type as TaskContentElementType;
    }

    getDataGroupTitle(): string | undefined {
        return this.gridElement.title;
    }

    getDataField(): DataField<unknown> | undefined {
        return this.gridElement.item;
    }

    getTaskId(): string | undefined {
        return this.taskContentService?.task?.stringId;
    }

    isField(): boolean {
        return this.gridElement.type !== TaskElementType.BLANK && this.gridElement.type !== TaskElementType.DATA_GROUP_TITLE;
    }
}
