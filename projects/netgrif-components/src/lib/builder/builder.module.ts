import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {BuilderComponent} from './builder.component';
import {MaterialModule} from '@netgrif/components-core';
import {FormBuilderModule} from './form-builder/form-builder.module';
import {ModelerModule} from './modeler/modeler.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {NgxMatMomentModule} from '@angular-material-components/moment-adapter';
import {MatNativeDateModule} from '@angular/material/core';
import {TaskContentComponentModule} from '../task-content/task-content.module';
import {MaterialIconPickerComponent} from './modeler/components/material-icon-picker/material-icon-picker.component';
import {BuilderDialogsModule} from './dialogs/dialogs.module';
import {FlexLayoutModule} from "@ngbracket/ngx-layout";


@NgModule({
    declarations: [
        BuilderComponent,
    ],
    imports: [
        BuilderDialogsModule,
        CommonModule,
        FormBuilderModule,
        MaterialModule,
        ModelerModule,
        NgOptimizedImage,
        TaskContentComponentModule,
        MatProgressSpinnerModule,
        NgxMatDatetimePickerModule,
        NgxMatMomentModule,
        MatNativeDateModule,
        MaterialIconPickerComponent,
        FlexLayoutModule,
    ],
    exports: [BuilderComponent]
})
export class BuilderModule {
}
