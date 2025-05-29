import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskContentComponent} from './task-content/task-content.component';
import {DataFieldsComponentModule} from '../data-fields/data-fields.module';
import {FlexModule} from '@ngbracket/ngx-layout';
import {MaterialModule, SnackBarModule, TranslateLibModule} from '@netgrif/components-core';
import {FieldComponentResolverComponent} from './field-component-resolver/field-component-resolver.component';
import {LayoutContainerWrapperComponent} from './layout-container-wrapper/layout-container-wrapper.component';


@NgModule({
    declarations: [
        TaskContentComponent,
        FieldComponentResolverComponent,
        LayoutContainerWrapperComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        TranslateLibModule,
        SnackBarModule,
        DataFieldsComponentModule
    ],
    exports: [
        TaskContentComponent
    ]
})
export class TaskContentComponentModule {
}
