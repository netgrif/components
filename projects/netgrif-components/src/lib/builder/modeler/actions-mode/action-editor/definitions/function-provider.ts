
export function functionCompletionProposals(range, languages) {
    return [
        {
            label: 'taskService',
            kind: languages.CompletionItemKind.Property,
            documentation: 'TaskService',
            insertText: 'taskService.',
            range
        },
        {
            label: 'dataService',
            kind: languages.CompletionItemKind.Property,
            documentation: 'DataService',
            insertText: 'dataService.',
            range
        },
        {
            label: 'workflowService',
            kind: languages.CompletionItemKind.Property,
            documentation: 'WorkflowService',
            insertText: 'workflowService.',
            range
        },
        {
            label: 'userService',
            kind: languages.CompletionItemKind.Property,
            documentation: 'UserService',
            insertText: 'userService.',
            range
        },
        {
            label: 'petriNetService',
            kind: languages.CompletionItemKind.Property,
            documentation: 'PetriNetService',
            insertText: 'petriNetService.',
            range
        },
        {
            label: 'groupService',
            kind: languages.CompletionItemKind.Property,
            documentation: 'GroupService',
            insertText: 'groupService.',
            range
        },
        {
            label: 'pdfGenerator',
            kind: languages.CompletionItemKind.Property,
            documentation: 'PDF Generator',
            insertText: 'pdfGenerator.',
            range
        },
        {
            label: 'mailService',
            kind: languages.CompletionItemKind.Property,
            documentation: 'MailService',
            insertText: 'mailService.',
            range
        },
        {
            label: 'useCase',
            kind: languages.CompletionItemKind.Variable,
            documentation: 'Current Case',
            insertText: 'useCase',
            range
        },
        {
            label: 'copyBehavior(Field field, Transition transition)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Copy Behavior',
            insertText: 'copyBehavior(<field>, <transition>)',
            range
        },
        {
            label: 'make field, behavior',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Set behavior for field on transition according to condition',
            insertText: 'make <field>, <behavior> on <transition> when { <condition> }',
            range
        },
        {
            label: 'execute(String taskId)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Execute Task by taskId',
            insertText: 'execute(<taskId>)',
            range
        },
        {
            label: 'executeTasks(Map dataSet, String taskId, Closure<Predicate> predicateClosure)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Execute multiple Tasks and set data',
            insertText: 'executeTasks(<dataSet>, <taskId>, {<closure>})',
            range
        },
        {
            label: 'executeTask(String transitionId, Map dataSet)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Execute Task and set data',
            insertText: 'executeTask(<transitionId>, <dataSet>)',
            range
        },
        {
            label: 'searchCases(Closure<Predicate> predicates)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Search cases and return their stringIDs',
            insertText: 'searchCases({<closure>})',
            range
        },
        {
            label: 'change field value',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Change field Value',
            insertText: 'change <field> value {<closure>}',
            range
        },
        {
            label: 'change field choices',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Change field Choices',
            insertText: 'change <field> choices {<closure>}',
            range
        },
        {
            label: 'change field allowedNets',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Change field AllowedNets',
            insertText: 'change <field> allowedNets {<closure>}',
            range
        },
        {
            label: 'change field options',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Change field Options',
            insertText: 'change <field> options {<closure>}',
            range
        },
        {
            label: 'psc(Closure find, String input)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Find pcs by input and closure',
            insertText: 'psc({<closure>}, <input>)',
            range
        },
        {
            label: 'findCases(Closure<Predicate> predicate)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Find cases and return List<Case>',
            insertText: 'findCases({<closure>})',
            range
        },
        {
            label: 'findCases(Closure<Predicate> predicate, Pageable pageable)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Find cases and return List<Case>',
            insertText: 'findCases({<closure>}, <pageable>)',
            range
        },
        {
            label: 'findCase(Closure<Predicate> predicate)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Find case and return it',
            insertText: 'findCase({<closure>})',
            range
        },
        {
            label: 'createCase(String identifier, String title = null, String color = "", User author = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Create case and return it',
            insertText: 'createCase(<identifier>)',
            range
        },
        {
            label: 'createCase(PetriNet net, String title = net.defaultCaseName.defaultValue, String color = "", User author = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Create case and return it',
            insertText: 'createCase(<petriNet>)',
            range
        },
        {
            label: 'assignTask(String transitionId, Case aCase = useCase, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Assign Task and return it',
            insertText: 'assignTask(<transition_id>)',
            range
        },
        {
            label: 'assignTask(Task task, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Assign Task and return it',
            insertText: 'assignTask(<task>)',
            range
        },
        {
            label: 'assignTasks(List<task> tasks, User assignee = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Assign multiple Tasks',
            insertText: 'assignTasks(<tasks>)',
            range
        },
        {
            label: 'cancelTask(String transitionId, Case aCase = useCase, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Cancel Task',
            insertText: 'cancelTask(<transitionId>)',
            range
        },
        {
            label: 'cancelTask(Task task, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Cancel Task',
            insertText: 'cancelTask(<task>)',
            range
        },
        {
            label: 'cancelTasks(List<Task> tasks, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Cancel Tasks',
            insertText: 'cancelTasks(<tasks>)',
            range
        },
        {
            label: 'finishTask(String transitionId, Case aCase = useCase, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Finish Task',
            insertText: 'finishTask(<transitionId>)',
            range
        },
        {
            label: 'finishTask(Task task, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Finish Task',
            insertText: 'finishTask(<task>)',
            range
        },
        {
            label: 'finishTask(Task task, User user = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Finish Task',
            insertText: 'finishTask(<task>)',
            range
        },
        {
            label: 'finishTasks(List<Task> tasks, User finisher = userService.loggedOrSystem)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Finish Tasks',
            insertText: 'finishTasks(<tasks>)',
            range
        },
        {
            label: 'findTasks(Closure<Predicate> predicate)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Find Tasks and return List<Task>',
            insertText: 'findTasks({<closure>})',
            range
        },
        {
            label: 'findTasks(Closure<Predicate> predicate, Pageable pageable)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Find Tasks and return List<Task>',
            insertText: 'findTasks({<closure>}, <pageable>)',
            range
        },
        {
            label: 'findTask(Closure<Predicate> predicate)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Find Task and return it',
            insertText: 'findTask({<closure>})',
            range
        },
        {
            label: 'findTask(String mongoId)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Find Task and return it',
            insertText: 'findTask(<mongoId>)',
            range
        },
        {
            label: 'getTaskId(String transitionId, Case aCase = useCase)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Get TaskId from transitionId',
            insertText: 'getTaskId(<transitionId>)',
            range
        },
        {
            label: 'getTaskId(String transitionId, Case aCase = useCase)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Get TaskId from transitionId',
            insertText: 'getTaskId(<transitionId>)',
            range
        },
        {
            label: 'assignRole(String roleImportId, User user = userService.loggedUser)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Assign role to user',
            insertText: 'assignRole(<roleImportId>)',
            range
        },
        {
            label: 'setData(Task task, Map dataSet)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Set data to task',
            insertText: 'setData(<task>, <dataSet>)',
            range
        },
        {
            label: 'setData(Transition transition, Map dataSet)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Set data by transition',
            insertText: 'setData(<transition>, <dataSet>)',
            range
        },
        {
            label: 'setData(String transitionId, Case useCase, Map dataSet)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Set data by transition id and useCase',
            insertText: 'setData(<transitionId>, <usecase>, <dataSet>)',
            range
        },
        {
            label: 'setDataWithPropagation(String transitionId, Case caze, Map dataSet)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Set data by transition id and useCase',
            insertText: 'setDataWithPropagation(<transitionId>, <usecase>, <dataSet>)',
            range
        },
        {
            label: 'setDataWithPropagation(Task task, Map dataSet)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Set data to task',
            insertText: 'setDataWithPropagation(<task>, <dataSet>)',
            range
        },
        {
            label: 'setDataWithPropagation(String taskId, Map dataSet)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Set data to task',
            insertText: 'setDataWithPropagation(<taskId>, <dataSet>)',
            range
        },
        {
            label: 'getData(Task task)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Get data of task',
            insertText: 'getData(<task>)',
            range
        },
        {
            label: 'getData(Transition transition)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Get data of transition',
            insertText: 'getData(<transition>)',
            range
        },
        {
            label: 'getData(String transitionId, Case useCase)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Get data of transition',
            insertText: 'getData(<transitionId>, <usecase>)',
            range
        },
        {
            label: 'loggedUser()',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Get logged User',
            insertText: 'loggedUser()',
            range
        },
        {
            label: 'generatePDF(String transitionId, String fileFieldId)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Generate PDF from transition id, save it to file field by fileFieldId',
            insertText: 'generatePDF(<transitionId>, <fileFieldId>)',
            range
        },
        {
            label: 'generatePDF(String transitionId, String fileFieldId, List<String> excludedFields)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Generate PDF from transition id, save it to file field by fileFieldId',
            insertText: 'generatePDF(<transitionId>, <fileFieldId>, <excludedFields>)',
            range
        },
        {
            label: 'generatePdfWithTemplate(String transitionId, String fileFieldId, String template)',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Generate PDF with template from transition id, save it to file field by fileFieldId',
            insertText: 'generatePdfWithTemplate(<transitionId>, <fileFieldId>, <template>)',
            range
        },
        {
            label: 'generatePdfWithLocale(String transitionId, String fileFieldId, Locale locale',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Generate PDF with locale from transition id, save it to file field by fileFieldId',
            insertText: 'generatePdfWithLocale(<transitionId>, <fileFieldId>, <locale>)',
            range
        },
        {
            label: 'generate into field',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Generate into field',
            insertText: 'generate <method>,<closure> into <field>',
            range
        },
        {
            label: 'changeCaseProperty',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Change case property',
            insertText: 'changeCaseProperty <property> about {<closure>}',
            range
        },
        {
            label: 'save useCase',
            kind: languages.CompletionItemKind.Function,
            documentation: 'Save useCase',
            insertText: 'workflowService.save(<usecase>)',
            range
        }
    ];
}
