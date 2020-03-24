import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
    AuthenticationModule,
    ConfigurationService,
    CovalentModule,
    MaterialModule,
    NewCaseComponent,
    SideMenuModule,
    PanelModule,
    DialogModule,
    UserAssignComponent,
    SimpleDialogComponent,
    QuestionDialogWithAnswerComponent,
    QuestionDialogComponent,
    TabsModule,
    DataFieldsModule
} from '@netgrif/application-engine';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {DocumentationComponent} from './doc/documentation/documentation.component';
import {NaeExampleAppConfigurationService} from './nae-example-app-configuration.service';
import {AuthenticationComponent} from './doc/services/authentication/authentication.component';
import {CaseSidemenuExampleComponent} from './doc/case-sidemenu-example/case-sidemenu-example.component';
import {SidemenuExampleComponent} from './doc/sidemenu-example/sidemenu-example.component';
import { UserAssignSidemenuExampleComponent } from './doc/user-assign-sidemenu-example/user-assign-sidemenu-example.component';
import { PanelExampleComponent } from './doc/panel-example/panel-example.component';
import { CasePanelExampleComponent } from './doc/case-panel-example/case-panel-example.component';
import { SnackBarExampleComponent } from './doc/snack-bar-example/snack-bar-example.component';
import { DialogExampleComponent } from './doc/dialog-example/dialog-example.component';
import { TabViewExampleComponent } from './doc/tab-view-example/tab-view-example.component';
import { ContentComponent } from './doc/tab-view-example/content/content.component';
import { ReactiveTextFieldComponent } from './doc/reactive-text-field/reactive-text-field.component';
import { DateTimePickerComponent } from './doc/date-time-picker/date-time-picker.component';
import {Md2DatepickerModule} from '../../../netgrif-application-engine/src/lib/data-fields/date-time-field/md2/datepicker';
import {MdNativeDateModule} from '../../../netgrif-application-engine/src/lib/data-fields/date-time-field/md2/core/datetime';

@NgModule({
    declarations: [
        AppComponent,
        DocumentationComponent,
        AuthenticationComponent,
        CaseSidemenuExampleComponent,
        SidemenuExampleComponent,
        UserAssignSidemenuExampleComponent,
        PanelExampleComponent,
        CasePanelExampleComponent,
        SnackBarExampleComponent,
        DialogExampleComponent,
        TabViewExampleComponent,
        ContentComponent,
        ReactiveTextFieldComponent,
        DateTimePickerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexModule,
        FlexLayoutModule,
        MaterialModule,
        CovalentModule,
        AuthenticationModule,
        SideMenuModule,
        PanelModule,
        DialogModule,
        TabsModule,
        DataFieldsModule,
        Md2DatepickerModule,
        MdNativeDateModule
    ],
    entryComponents: [
        NewCaseComponent,
        UserAssignComponent,
        SimpleDialogComponent,
        QuestionDialogComponent,
        QuestionDialogWithAnswerComponent,
        ContentComponent
    ],
    providers: [
        {provide: ConfigurationService, useClass: NaeExampleAppConfigurationService}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
