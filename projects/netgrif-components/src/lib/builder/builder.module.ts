import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {BuilderComponent} from './builder.component';
import {MaterialModule} from '@netgrif/components-core';
import {FormBuilderModule} from './form-builder/form-builder.module';
import {ModelerModule} from './modeler/modeler.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FieldListService} from './form-builder/field-list/field-list.service';
import {GridsterService} from './form-builder/gridster/gridster.service';
import {ActionEditorService} from './modeler/actions-mode/action-editor/action-editor.service';
import {ActionEditorTreeService} from './modeler/actions-mode/action-editor/action-editor-tree.service';
import {ActionItemProviderService} from './modeler/actions-mode/action-editor/action-item-provider.service';
import {DataActionsTool} from './modeler/actions-mode/tools/data-actions-tool';
import {FunctionsTool} from './modeler/actions-mode/tools/functions-tool';
import {ProcessActionsTool} from './modeler/actions-mode/tools/process-actions-tool';
import {RoleActionsTool} from './modeler/actions-mode/tools/role-actions-tool';
import {TransitionActionsTool} from './modeler/actions-mode/tools/transition-actions-tool';
import {ActionsMasterDetailService} from './modeler/actions-mode/actions-master-detail.service';
import {ActionsModeService} from './modeler/actions-mode/actions-mode.service';
import {ExportTool} from './modeler/control-panel/modes/export-tool';
import {ImportTool} from './modeler/control-panel/modes/import-tool';
import {RedoTool} from './modeler/control-panel/modes/redo-tool';
import {SvgExportTool} from './modeler/control-panel/modes/svg-export-tool';
import {UndoTool} from './modeler/control-panel/modes/undo-tool';
import {GlobalToolRegistry} from './modeler/control-panel/tools/global-tool-registry';
import {ControlPanelService} from './modeler/control-panel/control-panel.service';
import {DataMasterDetailService} from './modeler/data-mode/data-master-detail.service';
import {DataModeService} from './modeler/data-mode/data-mode.service';
import {ArcFactory} from './modeler/edit-mode/domain/arc-builders/arc-factory.service';
import {EditModeService} from './modeler/edit-mode/edit-mode.service';
import {HistoryMasterDetailService} from './modeler/history-mode/history-master-detail.service';
import {HistoryModeService} from './modeler/history-mode/history-mode.service';
import {LanguageSelectService} from './modeler/i18n-mode/languages/language-select.service';
import {LanguagesTool} from './modeler/i18n-mode/languages/languages-tool';
import {TranslationsTool} from './modeler/i18n-mode/translations/translations-tool';
import {I18nModeService} from './modeler/i18n-mode/i18n-mode.service';
import {RoleMasterDetailService} from './modeler/role-mode/role-master-detail.service';
import {RoleModeService} from './modeler/role-mode/role-mode.service';
import {HistoryService} from './modeler/services/history/history.service';
import {ModelService} from './modeler/services/model/model.service';
import {ModelExportService} from './modeler/services/model/model-export.service';
import {ModelSourceService} from './modeler/services/model/model-source.service';
import {ModelerTabsService} from './modeler/services/modeler-tabs.service';
import {SimulationModeService} from './modeler/simulation-mode/simulation-mode.service';
import {GridsterFieldToEngineFieldService} from './modeler/gridster-field-to-engine-field.service';
import {ModelImportService} from './modeler/model-import-service';
import {MortgageService} from './modeler/mortgage.service';
import {SelectedTransitionService} from './modeler/selected-transition.service';
import {TutorialService} from './tutorial/tutorial-service';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {NgxMatMomentModule} from '@angular-material-components/moment-adapter';
import {MatNativeDateModule} from '@angular/material/core';
import {ExportService, ImportService} from '@netgrif/petriflow';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {BuilderPaginatorIntl} from './modeler/components/master-detail/main-master/builder-paginator-inpl';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {BuilderModeService} from './builder-mode.service';
import {TaskContentComponentModule} from '../task-content/task-content.module';
import {I18nControlService} from './modeler/i18n-mode/i18n-control.service';
import {MaterialIconPickerComponent} from './modeler/components/material-icon-picker/material-icon-picker.component';
import {BuilderDialogsModule} from './dialogs/dialogs.module';

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
    ],
    providers: [
        FieldListService,
        GridsterService,
        ActionEditorService,
        ActionEditorTreeService,
        ActionItemProviderService,
        DataActionsTool,
        FunctionsTool,
        ProcessActionsTool,
        RoleActionsTool,
        TransitionActionsTool,
        ActionsMasterDetailService,
        ActionsModeService,
        ExportTool,
        ImportTool,
        RedoTool,
        SvgExportTool,
        UndoTool,
        GlobalToolRegistry,
        ControlPanelService,
        DataMasterDetailService,
        DataModeService,
        ArcFactory,
        EditModeService,
        HistoryMasterDetailService,
        HistoryModeService,
        LanguageSelectService,
        LanguagesTool,
        TranslationsTool,
        I18nModeService,
        RoleMasterDetailService,
        RoleModeService,
        HistoryService,
        ModelService,
        ModelExportService,
        ModelSourceService,
        ModelerTabsService,
        SimulationModeService,
        GridsterFieldToEngineFieldService,
        ModelImportService,
        MortgageService,
        SelectedTransitionService,
        TutorialService,
        ImportService,
        ExportService,
        {provide: MatPaginatorIntl, useClass: BuilderPaginatorIntl},
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
        BuilderModeService,
        I18nControlService,
    ],
})
export class BuilderModule {
}
