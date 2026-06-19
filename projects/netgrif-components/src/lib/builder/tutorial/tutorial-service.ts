import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {MortgageService} from '../modeler/mortgage.service';
import {ModelService} from '../modeler/services/model/model.service';
import {TutorialStep} from './tutorial-step';

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
        private modelService: ModelService
    ) {
        this.welcome = TutorialStep.of(
            'welcome',
            `Welcome to the Netgrif Application Builder v2.2.0`,
            'Netgrif Application Builder (NAB) is the tool for building process driven applications using Petriflow language. NAB is composed of several modules that help you in different stages of application development.',
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
            'Process Modeler',
            'In Process Modeler you can model business processes by defining tasks and their routing. As a modelling formalism for processes Petriflow language uses Petri nets that consist of state variables, tasks and their interconnections. It supports import of processes in BPMN 2.0 and its automatic translation into Petri nets.',
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
            'Process Simulation',
            'In Process Simulation you can simulate modeled processes by executing sequences of tasks or task events.',
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
            'Data Editor',
            'In Data Editor you can define data variables used in the processes. Petriflow supports all types of data variables you will need for your application, including text, numbers, date, datetime, enumerations and choices, files, images and many others. Validation and initial values of the data variables can be easily specified in Petriflow. Petriflow supports reference to a list of tasks as a data type.',
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
            'Role Editor',
            'In Role Editor you can define roles and specify which roles can perform tasks in the process.',
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
            'Actions Editor',
            'In Action Editor you can program reactions on events of process instances, its tasks and data fields. Actions use Groovy as a programming language. Types of events that you can catch includes construction of the process instance, assignment of a task to a user, cancellation of a task, finish  of a task, and change of a data field value. In actions that react on events, you can trigger events in different process instances and in this way for example create a new instance when you finish a task, to assign a new task to a user when you finish actual task, to recalculate a value of a data field whenever you change another data field, or hide/show data fields when you change another data field. In actions you can use search functions to find specific process instances or tasks based on values of process attributes, process instance attributes, task attributes and data variables. In actions you can also call external functions as well as to send and receive data from external systems via rest or soap web services.',
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
            'Internationalization',
            'You can add translations for different languages.',
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
            'History',
            'You can review recent changes of the model as well as download or revert to previous version of the model.',
            () => {
            },
            () => {
                this.router.navigate(['/modeler/i18n']);
            },
            'right'
        );
        this.importTool = TutorialStep.of(
            'importTool',
            'Model import',
            'You can import existing model saved in XML file or transform BPMN file into Petriflow model.',
            () => {
            },
            () => {
                this.router.navigate(['/modeler/history']);
            },
            'right'
        );
        this.exportTool = TutorialStep.of(
            'exportTool',
            'Model export',
            'You can export current model as XML file. In simulation mode this will export the simulated model in current state of simulation.',
            () => {
            },
            () => {
            },
            'right'
        );
        this.svgExportTool = TutorialStep.of(
            'svgExportTool',
            'SVG export',
            'You can export current model as SVG file. In simulation mode this will export the simulated model exactly as seen on canvas.',
            () => {
            },
            () => {
            },
            'right'
        );
        this.demo = TutorialStep.of(
            'demo',
            'Netgrif eTask',
            'You can deploy your Petriflow models in our eTask application after registration.',
            () => {
            },
            () => {
            },
            'right'
        );
        this.youtube = TutorialStep.of(
            'youtube',
            'Netgrif Academy',
            'Educational videos and tutorials can be found on our Youtube channel.',
            () => {
            },
            () => {
            },
            'right'
        );
        this.github = TutorialStep.of(
            'github',
            'Netgrif Github',
            'Source codes of our community products are available on Github.',
            () => {
            },
            () => {
            },
            'right'
        );
        this.mortgage = TutorialStep.of(
            'mortgage',
            'Mortgage demo process',
            'To load a Mortgage demo process click here.',
            () => {
            },
            () => {
            },
            'right'
        );
        this.bug = TutorialStep.of(
            'bug',
            'Bug report',
            'You can use our github issue page to report any bug you encounter while using the Netgrif Application Builder.',
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
