import {TranslateService} from "@ngx-translate/core";

export function functionCompletionProposals(range, languages, translateService: TranslateService) {
    return [
        {
            label: 'taskService',
            kind: languages.CompletionItemKind.Property,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.taskService'),
            insertText: 'taskService.',
            range
        },
        {
            label: 'dataService',
            kind: languages.CompletionItemKind.Property,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.dataService'),
            insertText: 'dataService.',
            range
        },
        {
            label: 'workflowService',
            kind: languages.CompletionItemKind.Property,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.workflowService'),
            insertText: 'workflowService.',
            range
        },
        {
            label: 'userService',
            kind: languages.CompletionItemKind.Property,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.userService'),
            insertText: 'userService.',
            range
        },
        {
            label: 'petriNetService',
            kind: languages.CompletionItemKind.Property,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.petriNetService'),
            insertText: 'petriNetService.',
            range
        },
        {
            label: 'groupService',
            kind: languages.CompletionItemKind.Property,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.groupService'),
            insertText: 'groupService.',
            range
        },
        {
            label: 'pdfGenerator',
            kind: languages.CompletionItemKind.Property,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.pdfGenerator'),
            insertText: 'pdfGenerator.',
            range
        },
        {
            label: 'mailService',
            kind: languages.CompletionItemKind.Property,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.mailService'),
            insertText: 'mailService.',
            range
        },
        {
            label: 'useCase',
            kind: languages.CompletionItemKind.Variable,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.useCase'),
            insertText: 'useCase',
            range
        },
        {
            label: 'copyBehavior(Field field, Transition transition)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.copyBehavior'),
            insertText: 'copyBehavior(<field>, <transition>)',
            range
        },
        {
            label: 'make field, behavior',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.makeFieldBehavior'),
            insertText: 'make <field>, <behavior> on <transition> when { <condition> }',
            range
        },
        {
            label: 'execute(String taskId)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.executeByTaskId'),
            insertText: 'execute(<taskId>)',
            range
        },
        {
            label: 'executeTasks(Map dataSet, String taskId, Closure<Predicate> predicateClosure)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.executeTasks'),
            insertText: 'executeTasks(<dataSet>, <taskId>, {<closure>})',
            range
        },
        {
            label: 'executeTask(String transitionId, Map dataSet)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.executeTask'),
            insertText: 'executeTask(<transitionId>, <dataSet>)',
            range
        },
        {
            label: 'searchCases(Closure<Predicate> predicates)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.searchCases'),
            insertText: 'searchCases({<closure>})',
            range
        },
        {
            label: 'change field value',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.changeFieldValue'),
            insertText: 'change <field> value {<closure>}',
            range
        },
        {
            label: 'change field choices',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.changeFieldChoices'),
            insertText: 'change <field> choices {<closure>}',
            range
        },
        {
            label: 'change field allowedNets',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.changeFieldAllowedNets'),
            insertText: 'change <field> allowedNets {<closure>}',
            range
        },
        {
            label: 'change field options',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.changeFieldOptions'),
            insertText: 'change <field> options {<closure>}',
            range
        },
        {
            label: 'psc(Closure find, String input)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.psc'),
            insertText: 'psc({<closure>}, <input>)',
            range
        },
        {
            label: 'findCases(Closure<Predicate> predicate)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.findCases'),
            insertText: 'findCases({<closure>})',
            range
        },
        {
            label: 'findCases(Closure<Predicate> predicate, Pageable pageable)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.findCasesPageable'),
            insertText: 'findCases({<closure>}, <pageable>)',
            range
        },
        {
            label: 'findCase(Closure<Predicate> predicate)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.findCase'),
            insertText: 'findCase({<closure>})',
            range
        },
        {
            label: 'createCase(String identifier, String title = null, String color = "", User author = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.createCaseByIdentifier'),
            insertText: 'createCase(<identifier>)',
            range
        },
        {
            label: 'createCase(PetriNet net, String title = net.defaultCaseName.defaultValue, String color = "", User author = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.createCaseByNet'),
            insertText: 'createCase(<petriNet>)',
            range
        },
        {
            label: 'assignTask(String transitionId, Case aCase = useCase, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.assignTaskByTransitionId'),
            insertText: 'assignTask(<transition_id>)',
            range
        },
        {
            label: 'assignTask(Task task, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.assignTaskByTask'),
            insertText: 'assignTask(<task>)',
            range
        },
        {
            label: 'assignTasks(List<task> tasks, User assignee = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.assignTasks'),
            insertText: 'assignTasks(<tasks>)',
            range
        },
        {
            label: 'cancelTask(String transitionId, Case aCase = useCase, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.cancelTaskByTransitionId'),
            insertText: 'cancelTask(<transitionId>)',
            range
        },
        {
            label: 'cancelTask(Task task, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.cancelTaskByTask'),
            insertText: 'cancelTask(<task>)',
            range
        },
        {
            label: 'cancelTasks(List<Task> tasks, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.cancelTasks'),
            insertText: 'cancelTasks(<tasks>)',
            range
        },
        {
            label: 'finishTask(String transitionId, Case aCase = useCase, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.finishTaskByTransitionId'),
            insertText: 'finishTask(<transitionId>)',
            range
        },
        {
            label: 'finishTask(Task task, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.finishTaskByTask'),
            insertText: 'finishTask(<task>)',
            range
        },
        {
            label: 'finishTask(Task task, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.finishTaskByTask'),
            insertText: 'finishTask(<task>)',
            range
        },
        {
            label: 'finishTasks(List<Task> tasks, User finisher = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.finishTasks'),
            insertText: 'finishTasks(<tasks>)',
            range
        },
        {
            label: 'findTasks(Closure<Predicate> predicate)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.findTasks'),
            insertText: 'findTasks({<closure>})',
            range
        },
        {
            label: 'findTasks(Closure<Predicate> predicate, Pageable pageable)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.findTasksPageable'),
            insertText: 'findTasks({<closure>}, <pageable>)',
            range
        },
        {
            label: 'findTask(Closure<Predicate> predicate)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.findTaskByClosure'),
            insertText: 'findTask({<closure>})',
            range
        },
        {
            label: 'findTask(String mongoId)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.findTaskByMongoId'),
            insertText: 'findTask(<mongoId>)',
            range
        },
        {
            label: 'getTaskId(String transitionId, Case aCase = useCase)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.getTaskId'),
            insertText: 'getTaskId(<transitionId>)',
            range
        },
        {
            label: 'getTaskId(String transitionId, Case aCase = useCase)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.getTaskId'),
            insertText: 'getTaskId(<transitionId>)',
            range
        },
        {
            label: 'assignRole(String roleImportId, User user = userService.loggedUser)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.assignRole'),
            insertText: 'assignRole(<roleImportId>)',
            range
        },
        {
            label: 'setData(Task task, Map dataSet)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.setDataByTask'),
            insertText: 'setData(<task>, <dataSet>)',
            range
        },
        {
            label: 'setData(Transition transition, Map dataSet)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.setDataByTransition'),
            insertText: 'setData(<transition>, <dataSet>)',
            range
        },
        {
            label: 'setData(String transitionId, Case useCase, Map dataSet)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.setDataByTransitionId'),
            insertText: 'setData(<transitionId>, <usecase>, <dataSet>)',
            range
        },
        {
            label: 'setDataWithPropagation(String transitionId, Case caze, Map dataSet)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.setDataWithPropagationByTransitionId'),
            insertText: 'setDataWithPropagation(<transitionId>, <usecase>, <dataSet>)',
            range
        },
        {
            label: 'setDataWithPropagation(Task task, Map dataSet)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.setDataWithPropagationByTask'),
            insertText: 'setDataWithPropagation(<task>, <dataSet>)',
            range
        },
        {
            label: 'setDataWithPropagation(String taskId, Map dataSet)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.setDataWithPropagationByTaskId'),
            insertText: 'setDataWithPropagation(<taskId>, <dataSet>)',
            range
        },
        {
            label: 'getData(Task task)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.getDataByTask'),
            insertText: 'getData(<task>)',
            range
        },
        {
            label: 'getData(Transition transition)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.getDataByTransition'),
            insertText: 'getData(<transition>)',
            range
        },
        {
            label: 'getData(String transitionId, Case useCase)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.getDataByTransitionId'),
            insertText: 'getData(<transitionId>, <usecase>)',
            range
        },
        {
            label: 'loggedUser()',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.loggedUser'),
            insertText: 'loggedUser()',
            range
        },
        {
            label: 'generatePDF(String transitionId, String fileFieldId)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.generatePDF1'),
            insertText: 'generatePDF(<transitionId>, <fileFieldId>)',
            range
        },
        {
            label: 'generatePDF(String transitionId, String fileFieldId, List<String> excludedFields)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.generatePDF2'),
            insertText: 'generatePDF(<transitionId>, <fileFieldId>, <excludedFields>)',
            range
        },
        {
            label: 'generatePdfWithTemplate(String transitionId, String fileFieldId, String template)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.generatePdfWithTemplate'),
            insertText: 'generatePdfWithTemplate(<transitionId>, <fileFieldId>, <template>)',
            range
        },
        {
            label: 'generatePdfWithLocale(String transitionId, String fileFieldId, Locale locale)',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.generatePdfWithLocale'),
            insertText: 'generatePdfWithLocale(<transitionId>, <fileFieldId>, <locale>)',
            range
        },
        {
            label: 'generate into field',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.generateIntoField'),
            insertText: 'generate <method>,<closure> into <field>',
            range
        },
        {
            label: 'changeCaseProperty',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.changeCaseProperty'),
            insertText: 'changeCaseProperty <property> about {<closure>}',
            range
        },
        {
            label: 'save useCase',
            kind: languages.CompletionItemKind.Function,
            documentation: translateService.instant('builder.modeler.actions-mode.action-editor.definitions.function-provider.function-provider.saveUseCase'),
            insertText: 'workflowService.save(<usecase>)',
            range
        }
    ];
}
