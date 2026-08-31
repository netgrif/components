import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconRegistry} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DomSanitizer} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '@netgrif/components-core';
import {PetriflowCanvasModule} from '@netgrif/petriflow.svg';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {GridsterModule} from 'angular-gridster2';
import {ResizableModule} from 'angular-resizable-element';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {MonacoEditorModule} from 'ngx-monaco-editor-v2';
import {BuilderDialogsModule} from '../dialogs/dialogs.module';
import {ActionDetailComponent} from './actions-mode/action-detail/action-detail.component';
import {ActionEditorModule} from './actions-mode/action-editor/action-editor.module';
import {ActionMasterItemComponent} from './actions-mode/action-master/action-master-item/action-master-item.component';
import {ActionMasterComponent} from './actions-mode/action-master/action-master.component';
import {
    FunctionMasterItemComponent,
} from './actions-mode/action-master/function-master-item/function-master-item.component';
import {ActionsModeComponent} from './actions-mode/actions-mode.component';
import {MainMasterItemComponent} from './components/master-detail/main-master-item/main-master-item.component';
import {MainMasterComponent} from './components/master-detail/main-master/main-master.component';
import {MasterDetailComponent} from './components/master-detail/master-detail.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {ImportSuccessfulComponent} from './control-panel/import-successful/import-successful.component';
import {ImportToolButtonComponent} from './control-panel/modes/import-tool-button/import-tool-button.component';
import {ModeComponent} from './control-panel/modes/mode-component/mode.component';
import {FileToolComponent} from './control-panel/tools/file-tool-component/file-tool.component';
import {ToolComponent} from './control-panel/tools/tool-component/tool.component';
import {DataDetailComponent} from './data-mode/data-detail/data-detail.component';
import {DataMasterItemComponent} from './data-mode/data-master-item/data-master-item.component';
import {DataModeComponent} from './data-mode/data-mode.component';
import {TaskRefInitFieldComponent} from './data-mode/task-ref-init-field/task-ref-init-field.component';
import {ContextMenuComponent} from './edit-mode/context-menu/context-menu.component';
import {EditModeComponent} from './edit-mode/edit-mode.component';
import {HistoryDetailComponent} from './history-mode/history-detail/history-detail.component';
import {HistoryMasterItemComponent} from './history-mode/history-master-item/history-master-item.component';
import {HistoryModeComponent} from './history-mode/history-mode.component';
import {I18nModeComponent} from './i18n-mode/i18n-mode.component';
import {FlagComponent} from './i18n-mode/languages/flag/flag.component';
import {LanguagesComponent} from './i18n-mode/languages/languages.component';
import {ProgressComponent} from './i18n-mode/languages/progress/progress.component';
import {I18nFieldComponent} from './i18n-mode/translations/i18n-field/i18n-field.component';
import {
    DataTranslationComponent,
} from './i18n-mode/translations/translation-group/data-translation/data-translation.component';
import {
    ModelTranslationComponent,
} from './i18n-mode/translations/translation-group/model-translation/model-translation.component';
import {
    RoleTranslationComponent,
} from './i18n-mode/translations/translation-group/role-translation/role-translation.component';
import {
    TaskTranslationComponent,
} from './i18n-mode/translations/translation-group/task-translation/task-translation.component';
import {TranslationsComponent} from './i18n-mode/translations/translations.component';
import {ModelerComponent} from './modeler.component';
import {RoleDetailComponent} from './role-mode/role-detail/role-detail.component';
import {RoleMasterItemComponent} from './role-mode/role-master-item/role-master-item.component';
import {RoleModeComponent} from './role-mode/role-mode.component';
import {SimulationModeComponent} from './simulation-mode/simulation-mode.component';
import {CdkPortalOutlet} from '@angular/cdk/portal';
import {CdkTreeModule} from '@angular/cdk/tree';
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import {NgxMatMomentModule} from "@angular-material-components/moment-adapter";
import { DataFieldsComponentModule } from "../../data-fields/data-fields.module";
import {TaskContentComponentModule} from "../../task-content/task-content.module";
import {MaterialIconPickerComponent} from "./components/material-icon-picker/material-icon-picker.component";
import {TaskModeComponent} from "./task-mode/task-mode.component";

@NgModule({
    declarations: [
        DataMasterItemComponent,
        DataDetailComponent,
        ModelerComponent,
        ControlPanelComponent,
        SimulationModeComponent,
        EditModeComponent,
        DataModeComponent,
        RoleModeComponent,
        ActionsModeComponent,
        I18nModeComponent,
        ImportSuccessfulComponent,
        LanguagesComponent,
        TranslationsComponent,
        ProgressComponent,
        FlagComponent,
        ModelTranslationComponent,
        DataTranslationComponent,
        RoleTranslationComponent,
        TaskTranslationComponent,
        EditModeComponent,
        ModeComponent,
        ToolComponent,
        FileToolComponent,
        ImportToolButtonComponent,
        ContextMenuComponent,
        HistoryModeComponent,
        MasterDetailComponent,
        MainMasterComponent,
        MainMasterItemComponent,
        RoleDetailComponent,
        RoleMasterItemComponent,
        ActionMasterComponent,
        ActionMasterItemComponent,
        FunctionMasterItemComponent,
        ActionDetailComponent,
        HistoryMasterItemComponent,
        HistoryDetailComponent,
        TaskRefInitFieldComponent
    ],
    exports: [
        ActionEditorModule,
        TaskRefInitFieldComponent,
        ModelerComponent,
    ],
    imports: [
        ActionEditorModule,
        BuilderDialogsModule,
        CommonModule,
        DataFieldsComponentModule,
        FlexLayoutModule,
        FormsModule,
        GridsterModule,
        MaterialModule,
        NgxDropzoneModule,
        PetriflowCanvasModule,
        MonacoEditorModule,
        ReactiveFormsModule,
        ResizableModule,
        RouterModule,
        TaskContentComponentModule,
        MatProgressSpinnerModule,
        I18nFieldComponent,
        CdkPortalOutlet,
        CdkTreeModule,
        NgxMatDatetimePickerModule,
        NgxMatMomentModule,
        MaterialIconPickerComponent,
        TaskModeComponent
    ]
})
export class ModelerModule {

    arc = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="110px" height="110px" viewBox="0 0 110 110">\n' +
        '    <path fill="none" stroke-width="6" d="M71 3h36v36H71Z"/>\n' +
        '    <path fill="none" stroke-width="4" d="M33.7279 76.2721L61.8076 48.1924"/>\n' +
        '    <path fill="none" stroke-width="6" d="M33.7279 76.2721L61.8076 48.1924"/>\n' +
        '    <path fill="solid" d="M71 39L65.6967 54.9099L55.0901 44.3033z"/>\n' +
        '    <path fill="none" stroke-width="6" d="M3 89a18 18 0 1 0 36 0a18 18 0 1 0 -36 0"/>\n' +
        '</svg>';

    cursor = '<svg xmlns="http://www.w3.org/2000/svg"\n' +
        '     version="1.1" width="24" height="24" viewBox="0 0 24 24">\n' +
        '    <path stroke="none"\n' +
        '        d="M10.07,14.27C10.57,14.03 11.16,14.25 11.4,14.75L13.7,19.74L15.5,18.89L13.19,13.91C12.95,13.41 13.17,12.81 13.67,12.58L13.95,12.5L16.25,12.05L8,5.12V15.9L9.82,14.43L10.07,14.27M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z"/>\n' +
        '</svg>\n';

    inhibitor = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="110px" height="110px" viewBox="0 0 110 110">\n' +
        '    <path fill="none" stroke-width="6" d="M71 3h36v36H71Z"/>\n' +
        '    <path fill="none" stroke-width="4" d="M33.7279 76.2721L61.8076 48.1924"/>\n' +
        '    <path fill="none" stroke-width="6" d="M33.7279 76.2721L61.8076 48.1924"/>\n' +
        '    <path fill="none" stroke-width="6" d="M58.1967 44.3033a7.5 7.5 0 1 0 15 0a7.5 7.5 0 1 0 -15 0"/>\n' +
        '    <path fill="none" stroke-width="6" d="M3 89a18 18 0 1 0 36 0a18 18 0 1 0 -36 0"/>\n' +
        '</svg>';

    read = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="110px" height="110px" viewBox="0 0 110 110">\n' +
        '    <path fill="none" stroke-width="6" d="M71 3h36v36H71Z"/>\n' +
        '    <path fill="none" stroke-width="6" d="M33.7279 76.2721L71.8076 38.1924"/>\n' +
        '    <path fill="solid" stroke-width="6" d="M58.1967 44.3033a7.5 7.5 0 1 0 15 0a7.5 7.5 0 1 0 -15 0"/>\n' +
        '    <path fill="none" stroke-width="6" d="M3 89a18 18 0 1 0 36 0a18 18 0 1 0 -36 0"/>\n' +
        '</svg>\n';

    resetarc = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="110px" height="110px" viewBox="0 0 110 110">\n' +
        '    <path fill="none" stroke-width="6" d="M71 3h36v36H71Z"/>\n' +
        '    <path fill="none" stroke-width="4" d="M34.2754 76.8442L62.262 48.285"/>\n' +
        '    <path fill="none" stroke-width="6" d="M34.2754 76.8442L62.262 48.285"/>\n' +
        '    <path fill="solid"\n' +
        '          d="M71.3609 39L66.2189 54.9628L60.8622 49.7135L55.7203 65.6762L45.0068 55.1776L60.8622 49.7135L55.5055 44.4641z"/>\n' +
        '    <path fill="none" stroke-width="6" d="M3 89a18 18 0 1 0 36 0a18 18 0 1 0 -36 0"/>\n' +
        '</svg>';

    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        matIconRegistry.addSvgIconLiteral('arc', domSanitizer.bypassSecurityTrustHtml(this.arc));
        matIconRegistry.addSvgIconLiteral('cursor-default-outline', domSanitizer.bypassSecurityTrustHtml(this.cursor));
        matIconRegistry.addSvgIconLiteral('inhibitor', domSanitizer.bypassSecurityTrustHtml(this.inhibitor));
        matIconRegistry.addSvgIconLiteral('read', domSanitizer.bypassSecurityTrustHtml(this.read));
        matIconRegistry.addSvgIconLiteral('resetarc', domSanitizer.bypassSecurityTrustHtml(this.resetarc));
    }
}
