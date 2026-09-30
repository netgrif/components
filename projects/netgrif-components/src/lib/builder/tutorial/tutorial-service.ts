import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {MortgageService} from '../modeler/mortgage.service';
import {ModelService} from '../modeler/services/model/model.service';
import {TutorialStep} from './tutorial-step';
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class TutorialService {

    welcome: TutorialStep;
    demo: TutorialStep;
    youtube: TutorialStep;
    github: TutorialStep;
    mortgage: TutorialStep;
    modeler: TutorialStep;
    simulator: TutorialStep;
    roleEditor: TutorialStep;
    dataEditor: TutorialStep;
    actions: TutorialStep;
    i18n: TutorialStep;
    history: TutorialStep;
    importTool: TutorialStep;
    exportTool: TutorialStep;
    svgExportTool: TutorialStep;
    bug: TutorialStep;
    steps: Array<string>;
    onClose: () => void;
    mortgageLoaded: boolean;

    constructor(
        private mortgageService: MortgageService,
        private router: Router,
        private modelService: ModelService,
        protected _translateService: TranslateService
    ) {
        this.welcome = TutorialStep.of(
            'welcome',
            this._translateService.instant('builder.tutorial.welcome'),
            this._translateService.instant('builder.tutorial.intro'),
            () => {
                this.mortgageLoaded = false;
                if (modelService.model.getTransitions().length === 0 && modelService.model.getPlaces().length === 0 && modelService.model.getArcs().length === 0 &&
                    modelService.model.getDataSet().length === 0 && modelService.model.getTransactions().length === 0 && modelService.model.getRoles().length === 0) {
                    this.mortgageService.loadModel();
                    this.mortgageLoaded = true;
                }
                this.router.navigate(['/modeler']);
            },
            () => {
            },
            'center'
        );
        this.modeler = TutorialStep.of(
            'modeler',
            this._translateService.instant('builder.tutorial.processModelerTitle'),
            this._translateService.instant('builder.tutorial.processModeler'),
            () => {
                this.router.navigate(['/modeler/simulation']);
            },
            () => {
                this.onClose();
            },
            'right'
        );
        this.simulator = TutorialStep.of(
            'simulator',
            this._translateService.instant('builder.tutorial.processSimulationTitle'),
            this._translateService.instant('builder.tutorial.processSimulation'),
            () => {
                this.router.navigate(['/modeler/data']);
            },
            () => {
                this.router.navigate(['/modeler']);
            },
            'right'
        );
        this.dataEditor = TutorialStep.of(
            'dataEditor',
            this._translateService.instant('builder.tutorial.dataEditorTitle'),
            this._translateService.instant('builder.tutorial.dataEditor'),
            () => {
                this.router.navigate(['/modeler/roles']);
            },
            () => {
                this.router.navigate(['/modeler/simulation']);
            },
            'right'
        );
        this.roleEditor = TutorialStep.of(
            'roleEditor',
            this._translateService.instant('builder.tutorial.roleEditorTitle'),
            this._translateService.instant('builder.tutorial.roleEditor'),
            () => {
                this.router.navigate(['/modeler/actions']);
            },
            () => {
                this.router.navigate(['/modeler/data']);
            },
            'right'
        );
        this.actions = TutorialStep.of(
            'actions',
            this._translateService.instant('builder.tutorial.actionsEditorTitle'),
            this._translateService.instant('builder.tutorial.actionsEditor'),
            () => {
                this.router.navigate(['/modeler/i18n']);
            },
            () => {
                this.router.navigate(['/modeler/roles']);
            },
            'right'
        );
        this.i18n = TutorialStep.of(
            'i18n',
            this._translateService.instant('builder.tutorial.internationalizationTitle'),
            this._translateService.instant('builder.tutorial.internationalization'),
            () => {
                this.router.navigate(['/modeler/history']);
            },
            () => {
                this.router.navigate(['/modeler/actions']);
            },
            'right'
        );
        this.history = TutorialStep.of(
            'history',
            this._translateService.instant('builder.tutorial.historyTitle'),
            this._translateService.instant('builder.tutorial.history'),
            () => {
            },
            () => {
                this.router.navigate(['/modeler/i18n']);
            },
            'right'
        );
        this.importTool = TutorialStep.of(
            'importTool',
            this._translateService.instant('builder.tutorial.modelImportTitle'),
            this._translateService.instant('builder.tutorial.modelImport'),
            () => {
            },
            () => {
                this.router.navigate(['/modeler/history']);
            },
            'right'
        );
        this.exportTool = TutorialStep.of(
            'exportTool',
            this._translateService.instant('builder.tutorial.modelExportTitle'),
            this._translateService.instant('builder.tutorial.modelExport'),
            () => {
            },
            () => {
            },
            'right'
        );
        this.svgExportTool = TutorialStep.of(
            'svgExportTool',
            this._translateService.instant('builder.tutorial.svgExportTitle'),
            this._translateService.instant('builder.tutorial.svgExport'),
            () => {
            },
            () => {
            },
            'right'
        );
        this.demo = TutorialStep.of(
            'demo',
            this._translateService.instant('builder.tutorial.netgrifEtaskTitle'),
            this._translateService.instant('builder.tutorial.netgrifEtask'),
            () => {
            },
            () => {
            },
            'right'
        );
        this.youtube = TutorialStep.of(
            'youtube',
            this._translateService.instant('builder.tutorial.netgrifAcademyTitle'),
            this._translateService.instant('builder.tutorial.netgrifAcademy'),
            () => {
            },
            () => {
            },
            'right'
        );
        this.github = TutorialStep.of(
            'github',
            this._translateService.instant('builder.tutorial.netgrifGithubTitle'),
            this._translateService.instant('builder.tutorial.netgrifGithub'),
            () => {
            },
            () => {
            },
            'right'
        );
        this.mortgage = TutorialStep.of(
            'mortgage',
            this._translateService.instant('builder.tutorial.mortgageDemoTitle'),
            this._translateService.instant('builder.tutorial.mortgageDemo'),
            () => {
            },
            () => {
            },
            'right'
        );
        this.bug = TutorialStep.of(
            'bug',
            this._translateService.instant('builder.tutorial.bugReportTitle'),
            this._translateService.instant('builder.tutorial.bugReport'),
            () => {
            },
            () => {
            },
            'right'
        );
        this.steps = [
            this.welcome.step,
            this.modeler.step,
            this.simulator.step,
            this.dataEditor.step,
            this.roleEditor.step,
            this.actions.step,
            this.i18n.step,
            this.history.step,
            this.importTool.step,
            this.exportTool.step,
            this.svgExportTool.step,
            this.demo.step,
            this.youtube.step,
            this.github.step,
            this.mortgage.step,
            this.bug.step
        ];
        this.onClose = () => {
            this.router.navigate(['/modeler']);
            if (this.mortgageLoaded) {
                this.modelService.model = this.modelService.newModel();
            }
        };
    }
}
