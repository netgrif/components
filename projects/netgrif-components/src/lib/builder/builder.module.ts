import {Injector, NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {BuilderComponent} from './builder.component';
import {MaterialModule, ComponentRegistryService} from '@netgrif/components-core';
import {FormBuilderModule} from './form-builder/form-builder.module';
import {ModelerModule} from './modeler/modeler.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {NgxMatMomentModule} from '@angular-material-components/moment-adapter';
import {TaskContentComponentModule} from '../task-content/task-content.module';
import {MaterialIconPickerComponent} from './modeler/components/material-icon-picker/material-icon-picker.component';
import {BuilderDialogsModule} from './dialogs/dialogs.module';
import {FlexLayoutModule} from "@ngbracket/ngx-layout";
import {ComponentPortal} from '@angular/cdk/portal';
import {ProcessRefDefaultComponent} from '../data-fields/process-ref/process-ref-default/process-ref-default.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
    declarations: [
        BuilderComponent,
        ProcessRefDefaultComponent,
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
        MaterialIconPickerComponent,
        FlexLayoutModule,
        TranslateModule,
    ],
    exports: [BuilderComponent]
})
export class BuilderModule {

    constructor(registry: ComponentRegistryService) {
        registry.register("process-ref-default", (injector: Injector) => new ComponentPortal<any>(ProcessRefDefaultComponent, null, injector));
    }
}
