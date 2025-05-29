import {Component, Inject, Input, OnDestroy, OnInit, Optional} from '@angular/core';
import {TaskContentService} from '../services/task-content.service';
import {DataField} from '../../data-fields/models/abstract-data-field';
import {FieldTypeResource} from '../model/field-type-resource';
import {NAE_INFORM_ABOUT_INVALID_DATA} from "../../data-fields/models/invalid-data-policy-token";
import {FormControl} from "@angular/forms";
import {FieldConverterService} from '../services/field-converter.service';

/**
 * Resolves the correct {@link AbstractDataFieldComponent} implementation for the provided data field object.
 */
@Component({
    selector: 'ncc-abstract-field-component-resolver',
    template: ''
})
export abstract class AbstractFieldComponentResolverComponent implements OnInit, OnDestroy {
    @Input() dataField: DataField<any>;


    protected constructor(protected taskContentService: TaskContentService,
                          protected fieldConverter: FieldConverterService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) protected _informAboutInvalidData: boolean | null) {
    }

    ngOnInit() {
        if (!!this.dataField) {
            this.dataField.registerFormControl(new FormControl('', {updateOn: this.dataField.getUpdateOnStrategy()}));
            this.dataField.sendInvalidValues = this._informAboutInvalidData;
        }
    }

    ngOnDestroy() {
        if (!!this.dataField) {
            this.dataField.disconnectFormControl();
        }
    }

    getTaskId(): string {
        return this.taskContentService.task.stringId;
    }

    isCustomHeight(): boolean {
        const component = !!this.dataField.component ? this.dataField.component : null;
        return this.fieldConverter.resolveType(this.dataField) === FieldTypeResource.I18N && !!component
            && (component.name === 'divider'
                || (!!component.properties && 'plainText' in component.properties && component.properties.plaintText === 'true')
            );
    }
}
