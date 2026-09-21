import {ChangeDetectionStrategy, Component, Inject, Optional} from '@angular/core';
import {BuilderMode, BuilderModeService} from "./services/builder-mode.service";
import {ModelService} from "./modeler/services/model/model.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {HistoryService} from "./modeler/services/history/history.service";
import {CaseResourceService, LoadingEmitter, NAE_TAB_DATA, ImmediateData} from "@netgrif/components-core";
import {InjectedTabbedBuilderViewData} from "./injected-builder-data";
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
import {ModelExportService} from './modeler/services/model/model-export.service';
import {ModelSourceService} from './modeler/services/model/model-source.service';
import {ModelerTabsService} from './modeler/services/modeler-tabs.service';
import {SimulationModeService} from './modeler/simulation-mode/simulation-mode.service';
import {GridsterFieldToEngineFieldService} from './modeler/gridster-field-to-engine-field.service';
import {ModelImportService} from './modeler/model-import-service';
import {MortgageService} from './modeler/mortgage.service';
import {SelectedTransitionService} from './modeler/selected-transition.service';
import {TutorialService} from './tutorial/tutorial-service';
import {ExportService, ImportService} from '@netgrif/petriflow';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {BuilderPaginatorIntl} from './modeler/components/master-detail/main-master/builder-paginator-inpl';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {I18nControlService} from './modeler/i18n-mode/i18n-control.service';
import {BuilderIntegrationService} from "./services/builder-integration.service";
import {TaskModeService} from "./modeler/task-mode/task-mode.service";
import {LocalStorageService} from "./services/local-storage.service";

@Component({
    selector: 'nc-builder',
    templateUrl: './builder.component.html',
    styleUrl: './builder.component.scss',
    providers: [FieldListService,
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
        BuilderIntegrationService,
        TaskModeService,
        LocalStorageService
    ]
})
export class BuilderComponent {
    public typeMode = BuilderMode;
    public loading: LoadingEmitter;

    constructor(private modelService: ModelService, private router: Router,
                public dialog: MatDialog,
                private route: ActivatedRoute,
                private httpClient: HttpClient,
                private _importService: ImportService,
                private historyService: HistoryService,
                public builderModeService: BuilderModeService,
                protected _caseResourceService: CaseResourceService,
                protected _builderIntegrationService: BuilderIntegrationService,
                @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedBuilderViewData) {
        this.loading = new LoadingEmitter(true);
        if (injectedTabData?.processCase) {
            this._builderIntegrationService.isIntegrated = true;
            this._builderIntegrationService.processCase = injectedTabData.processCase;
            this.resolveIntegratedMode();
            this._builderIntegrationService.reloadCase.subscribe(() => {
                this._caseResourceService.getOneCase(this._builderIntegrationService.processCase.stringId).subscribe(processCase => {
                    this._builderIntegrationService.processCase = processCase;
                    this.resolveIntegratedMode()
                    this._builderIntegrationService.reloadModes = true;
                })
            });
        } else {
            this.loading.off();
            this.resolveRouterModel();
            if (!this.modelService.model) {
                this.modelService.model = this.modelService.newModel();
                this.historyService.save(`New model has been created.`);
            }
        }
    }

    public onlyTaskMode() {
        return this._builderIntegrationService.isIntegrated && this._builderIntegrationService.onlyTaskView;
    }

    protected resolveIntegratedMode() {
        if (this._builderIntegrationService.processCase.immediateData.find((data: ImmediateData) => data.stringId === 'state')?.value === 'draft') {
            const taskId = this._builderIntegrationService.processCase.tasks.find(taskPair => taskPair.transition === 'edit')?.task;
            this._builderIntegrationService.editTaskId = taskId;
            this._builderIntegrationService.onlyTaskView = false;
            this._builderIntegrationService.getXml().subscribe(value => {
                this.parseModel(value, BuilderMode.TASK_MODE);
                this.loading.off();
            }, error => {
                console.log(error);
                this.loading.off();
            })
        } else if (this._builderIntegrationService.processCase.immediateData.find((data: ImmediateData) => data.stringId === 'state')?.value === 'deployed') {
            const taskId = this._builderIntegrationService.processCase.tasks.find(taskPair => taskPair.transition === 'view')?.task;
            this._builderIntegrationService.editTaskId = undefined;
            this._builderIntegrationService.onlyTaskView = true;
            this._builderIntegrationService.getXml(taskId).subscribe(value => {
                this.parseModel(value, BuilderMode.TASK_MODE);
                this.loading.off();
            }, error => {
                console.log(error);
                this.loading.off();
            })
        } else {
            this.loading.off();
            this._builderIntegrationService.editTaskId = undefined;
            this._builderIntegrationService.onlyTaskView = true;
        }
        this.builderModeService.mode = BuilderMode.TASK_MODE;
    }

    protected parseModel(data: string, mode: BuilderMode) {
        try {
            if (data !== undefined) {
                const model = this._importService.parseFromXml(data)?.model;
                if (model) {
                    this.modelService.model = model;
                    this.historyService.save(`Model ${this.modelService.model.id} has been imported.`);
                }
            } else if (!this.modelService.model) {
                this.modelService.model = this.modelService.newModel();
                this.historyService.save(`New Model has been created.`);
            }
        } catch (e) {
            console.log(e);
        }
        this.builderModeService.mode = mode;
    }

    protected resolveRouterModel() {
        this.route.queryParams.subscribe(params => {
            if (params.modelUrl) {
                this.httpClient.get(params.modelUrl, {
                    responseType: 'text'
                }).subscribe((data) => {
                    this.parseModel(data as string, BuilderMode.MODELER);
                }, error => {
                    console.log(error);
                    this.builderModeService.mode = BuilderMode.MODELER;
                });
            }
        });
    }
}
