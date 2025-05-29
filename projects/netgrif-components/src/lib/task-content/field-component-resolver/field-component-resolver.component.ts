import {Component, Inject, Input, Optional, Type} from '@angular/core';
import {
    AbstractFieldComponentResolverComponent,
    DateField,
    DateTimeField,
    EnumerationField,
    FieldConverterService,
    FileField,
    FileListField,
    MultichoiceField,
    NAE_INFORM_ABOUT_INVALID_DATA,
    TaskContentService
} from '@netgrif/components-core';

@Component({
    selector: 'nc-field-component-resolver',
    templateUrl: './field-component-resolver.component.html',
    styleUrls: ['./field-component-resolver.component.scss'],
    standalone: false
})
export class FieldComponentResolverComponent extends AbstractFieldComponentResolverComponent {

    constructor(taskContentService: TaskContentService,
                fieldConverter: FieldConverterService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) _informAboutInvalidData: boolean | null) {
        super(taskContentService, fieldConverter, _informAboutInvalidData);
    }

    isEnumOrMulti() {
        return this.dataField instanceof EnumerationField || this.dataField instanceof MultichoiceField;
    }

    isDateType() {
        return this.dataField instanceof DateField || this.dataField instanceof DateTimeField;
    }

    isDateTimeType() {
        return this.dataField instanceof DateTimeField;
    }

    isFileType() {
        return this.dataField instanceof FileField || this.dataField instanceof FileListField;
    }
}
