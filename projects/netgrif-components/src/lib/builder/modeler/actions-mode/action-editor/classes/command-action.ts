import {TranslateService} from "@ngx-translate/core";

export interface CommandAction {
    label?: string;
    action?: string;
    header?: string;
    description?: string;
    example?: string;
}

export interface CommandActions {
    label?: string;
    badge?: string;
    actions?: Array<CommandAction>;
}

export function getActions(translateService: TranslateService): Array<CommandActions> {
    return [
        {
            label: translateService.instant('builder.modeler.classes.command-action.basicFunctions.label'),
            badge: 'code',
            actions: [
                {
                    label: translateService.instant('builder.modeler.classes.command-action.basicFunctions.ifElseStatement.label'),
                    header: translateService.instant('builder.modeler.classes.command-action.basicFunctions.ifElseStatement.label'),
                    action: 'if (<condition>) {\n\t\n}else {\n\t\n}',
                    description: translateService.instant('builder.modeler.classes.command-action.basicFunctions.ifElseStatement.description'),
                    example: 'if (a<100) { \n' +
                        '  println("The value is less than 100"); \n' +
                        '  } else { \n' +
                        '  println("The value is greater than 100"); \n' +
                        '}'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.basicFunctions.nestedIfStatement.label'),
                    header: translateService.instant('builder.modeler.classes.command-action.basicFunctions.nestedIfStatement.label'),
                    action: 'if (<condition>) {\n\t\n} else if (<condition>) {\n\t\n} else {\n\t\n}',
                    description: translateService.instant('builder.modeler.classes.command-action.basicFunctions.nestedIfStatement.description'),
                    example: 'if (a<100) { \n' +
                        '  println("The value is less than 100"); \n' +
                        '} else if(a < 50) { \n' +
                        '  println("The value is less than 50"); \n' +
                        '} else { \n' +
                        '  println("The value is greater than 50 and 100"); \n' +
                        '}'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.basicFunctions.switchStatement.label'),
                    header: translateService.instant('builder.modeler.classes.command-action.basicFunctions.switchStatement.label'),
                    action: 'switch(<value>) {\n\tcase 1:\n\t\t\n\t\tbreak;\n\tcase 2:\n\t\t\n\t\tbreak;\n\tdefault:\n\t\t\n\t\tbreak;\n}\n',
                    description: translateService.instant('builder.modeler.classes.command-action.basicFunctions.switchStatement.description'),
                    example: 'int a = 2\n' +
                        'switch(a) {\n' +
                        '  case 1: \n' +
                        '    println("The value of a is One"); \n' +
                        '    break; \n' +
                        '  case 2: \n' +
                        '    println("The value of a is Two"); \n' +
                        '    break; \n' +
                        '  case 3: \n' +
                        '    println("The value of a is Three"); \n' +
                        '    break; \n' +
                        '  default: \n' +
                        '    println("The value is unknown"); \n' +
                        '    break; \n' +
                        '}'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.basicFunctions.whileStatement.label'),
                    header: translateService.instant('builder.modeler.classes.command-action.basicFunctions.whileStatement.label'),
                    action: 'while(<condition>){\n\n}',
                    description: translateService.instant('builder.modeler.classes.command-action.basicFunctions.whileStatement.description'),
                    example: 'int count = 0;\n' +
                        'while(count<5) {\n' +
                        '  println(count);\n' +
                        '  count++;\n' +
                        '}'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.basicFunctions.forInStatement.label'),
                    header: translateService.instant('builder.modeler.classes.command-action.basicFunctions.forInStatement.label'),
                    action: 'for(<value> in <value>){\n\t\n}',
                    description: translateService.instant('builder.modeler.classes.command-action.basicFunctions.forInStatement.description'),
                    example: 'int[] array = [0,1,2,3]; \n' +
                        'for(int i in array) { \n' +
                        '  println(i); \n' +
                        '} '
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.basicFunctions.groovyTutorial.label'),
                    header: translateService.instant('builder.modeler.classes.command-action.basicFunctions.groovyTutorial.header'),
                    description: '<a href="https://www.tutorialspoint.com/groovy/index.htm" target="_blank"></a> ' + translateService.instant('builder.modeler.classes.command-action.basicFunctions.groovyTutorial.description')
                }
            ]
        },
        {
            label: translateService.instant('builder.modeler.classes.command-action.dataFields.label'),
            badge: 'edit',
            actions: [
                {
                    label: translateService.instant('builder.modeler.classes.command-action.dataFields.changeValue.label'),
                    header: 'change <Field f> value <Closure calculation>',
                    action: 'change <datafield> value { <value>; }',
                    description: translateService.instant('builder.modeler.classes.command-action.dataFields.changeValue.description'),
                    example: 'period: f.108001,\n' +
                        'sum: f.308011;\n' +
                        'change period value {\n' +
                        '    def limit = 20.0;\n' +
                        '    if (period.value == "half-year")\n' +
                        '        limit = 40.0;\n' +
                        '    if (period.value == "quarter-year")\n' +
                        '        limit = 80.0;\n' +
                        '    if ((sum.value as Double) < (limit as Double))\n' +
                        '        return "year";\n' +
                        '    return unchanged;\n' +
                        '}'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.dataFields.changeChoices.label'),
                    header: 'change <Field f> choices <Closure calculation>',
                    action: 'change <datafield> choices { <choices>; }',
                    description: translateService.instant('builder.modeler.classes.command-action.dataFields.changeChoices.description'),
                    example: 'other: f.410001,\n' +
                        'field: f.field;\n' +
                        'change field choices {\n' +
                        '    if (other.value == "Real estate")\n' +
                        '        return field.choices + ["construction site"];\n' +
                        '    return field.choices;\n' +
                        '}'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.dataFields.changeOptions.label'),
                    header: 'change <Field f> options <Closure calculation>',
                    action: 'change <datafield> options { <options>; }',
                    description: translateService.instant('builder.modeler.classes.command-action.dataFields.changeOptions.description'),
                    example: 'other: f.410001,\n' +
                        'field: f.field;\n' +
                        'change field options {\n' +
                        '    if (other.value == "Real estate")\n' +
                        '        return field.options + ["cs":"construction site"];\n' +
                        '    return field.choices;\n' +
                        '}'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.dataFields.changeAllowedNets.label'),
                    header: 'change <Field f> allowedNets <Closure nets>',
                    action: 'change <datafield> allowedNets { <netIds>; }',
                    description: translateService.instant('builder.modeler.classes.command-action.dataFields.changeAllowedNets.description'),
                    example: 'other: f.410001,\n' +
                        'field: f.field;\n' +
                        'change field options {\n' +
                        '    if (other.value == "Real estate")\n' +
                        '        return field.options + ["cs":"construction site"];\n' +
                        '    return field.choices;\n' +
                        '}'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.dataFields.changeBehaviour.label'),
                    header: 'make <Field f>,<Closure behaviour> on <Transition t> when <Closure<Boolean> condition>',
                    action: 'make <datafield>, <behaviour> on <transition> when { <condition> }',
                    description: translateService.instant('builder.modeler.classes.command-action.dataFields.changeBehaviour.description'),
                    example: 'garage_check: f.garage_check,\n' +
                        'garage_cost: f.garage_cost,\n' +
                        'garage: t.garage;\n' +
                        'make garage_cost,visible on garage when {\n' +
                        '\treturn garage_check.value == true;\n' +
                        '}'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.dataFields.changeMultipleBehaviour.label'),
                    header: 'make <List<Field> f>,<Closure behaviour> on <List<Transition> t> when <Closure<Boolean> condition>',
                    action: 'make [<datafield>], <behaviour> on ([<transition>]) when { <condition> }',
                    description: translateService.instant('builder.modeler.classes.command-action.dataFields.changeMultipleBehaviour.description'),
                    example:
                        'condition: f.conditionId,\n' +
                        'text: f.textId,\n' +
                        'anotherText: f.anotherTextId,\n' +
                        'transition: t.transitionId,\n' +
                        'anotherTransition: t.anotherTransitionId;\n' +
                        'make [text, anotherText], visible on ([transition, anotherTransition]) when { condition.value == true }\n' +
                        '---\n' +
                        'taskRef: f.taskRef_0;\n' +
                        'def tasks = [taskService.findOne(taskRef_0.value[0])] as List\n' +
                        'def field = getFieldOfTask(tasks[0].stringId, "referenced_text")\n' +
                        'make [field], editable on tasks when { true }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.dataFields.setDataByTransition.label'),
                    header: 'SetDataEventOutcome setData(Transition transition, Map dataSet)',
                    action: 'setData(<transition>, <dataSet>);',
                    description: translateService.instant('builder.modeler.classes.command-action.dataFields.setDataByTransition.description'),
                    example: 'transition: t.edit_limit;\n' +
                        'setData(transition, [\n' +
                        '    "new_limit": [\n' +
                        '        "value": "10000",\n' +
                        '        "type" : "number"\n' +
                        '    ],\n' +
                        '])'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.dataFields.setDataByTask.label'),
                    header: 'SetDataEventOutcome setData(Task task, Map dataSet)',
                    action: 'setData(<task>, <dataSet>);',
                    description: translateService.instant('builder.modeler.classes.command-action.dataFields.setDataByTask.description'),
                    example:
                        'taskRef: f.taskRef;\n' +
                        'def task = findTask(taskRef.value.first())\n' +
                        'setData(task, [\n' +
                        '    "new_limit": [\n' +
                        '        "value": "10000",\n' +
                        '        "type" : "number"\n' +
                        '    ],\n' +
                        '])'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.dataFields.setDataByTransitionId.label'),
                    header: 'setData(String transitionId, Case useCase, Map dataSet)',
                    action: 'setData(<transitionId>, <processInstanceId>, <dataSet>);',
                    description: translateService.instant('builder.modeler.classes.command-action.dataFields.setDataByTransitionId.description'),
                    example: 'def usecase = findCase({ it.title.eq("Limits") }).first()\n' +
                        'setData("edit_limit", usecase, [\n' +
                        '    "new_limit": [\n' +
                        '        "value": "10000",\n' +
                        '        "type" : "number"\n' +
                        '    ],\n' +
                        '])'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.dataFields.setDataByTaskId.label'),
                    header: 'setData(String taskId, Map dataSet)',
                    action: 'setData(<taskId>, <dataSet>);',
                    description: translateService.instant('builder.modeler.classes.command-action.dataFields.setDataByTaskId.description'),
                    example: 'def usecase = findCase({ it.title.eq("Limits") }).first()\n' +
                        'setData("edit_limit", usecase, [\n' +
                        '    "new_limit": [\n' +
                        '        "value": "10000",\n' +
                        '        "type" : "number"\n' +
                        '    ],\n' +
                        '])'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.dataFields.getDataByTransition.label'),
                    header: 'Map<String, Field> getData(Transition transition)\n',
                    action: 'getData(<transition>);',
                    description: translateService.instant('builder.modeler.classes.command-action.dataFields.getDataByTransition.description'),
                    example: 'view_limit: t.view_limit;\n' +
                        'actual_limit: f.actual_limit;\n' +
                        'def data = getData(view_limit)\n' +
                        'change actual_limit value {\n' +
                        '    data["remote_limit"].value\n' +
                        '}'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.dataFields.getDataByTransitionId.label'),
                    header: 'Map<String, Field> getData(String transitionId, Case useCase))',
                    action: 'getData(<transitionId>, <processInstanceId>);',
                    description: translateService.instant('builder.modeler.classes.command-action.dataFields.getDataByTransitionId.description'),
                    example: 'view_limit: t.view_limit;\n' +
                        'def usecase = findCase({ it.title.eq("Limits") }).first()\n' +
                        'def data = getData("view_limit", usecase)\n' +
                        'change actual_limit value {\n' +
                        '    data["remote_limit"].value\n' +
                        '}'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.dataFields.getDataByTask.label'),
                    header: 'Map<String, Field> getData(Task task)',
                    action: 'getData(<task>);',
                    description: translateService.instant('builder.modeler.classes.command-action.dataFields.getDataByTask.description'),
                    example:
                        'taskRef: f.taskRef;\n' +
                        'def task = findTask(taskRef.value.first());\n' +
                        'def data = getData(task)',
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.dataFields.getDataByTaskId.label'),
                    header: 'Map<String, Field> getData(String taskId)',
                    action: 'getData(<taskId>);',
                    description: translateService.instant('builder.modeler.classes.command-action.dataFields.getDataByTaskId.description'),
                    example:
                        'taskRef: f.taskRef;\n' +
                        'def data = getData(taskRef.value.first())',
                },
            ]
        },
        {
            label: translateService.instant('builder.modeler.classes.command-action.processInstances.label'),
            badge: 'business',
            actions: [
                {
                    label: translateService.instant('builder.modeler.classes.command-action.processInstances.createCaseByidentifier.label'),
                    header: 'Case createCase(String identifier, String title = null, String color = "", User author = userService.loggedOrSystem, Locale locale = LocaleContextHolder.getLocale())',
                    action: 'createCase(<identifier>, <title>, <color>, <author>, <locale>);',
                    description: translateService.instant('builder.modeler.classes.command-action.processInstances.createCaseByidentifier.description'),
                    example: 'createCase("create_case_net","Create Case Case","color-fg-amber-500", otherUser);\n' +
                        'createCase("create_case_net","Create Case Case","color-fg-amber-500");\n' +
                        'createCase("create_case_net","Create Case Case");\n' +
                        'createCase("create_case_net");'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.processInstances.createCaseByReference.label'),
                    header: 'Case createCase(PetriNet net, String title = net.defaultCaseName.getTranslation(locale), String color = "", IUser author = userService.loggedOrSystem, Locale locale = LocaleContextHolder.getLocale())',
                    action: 'createCase(<process>, <title>, <color>, <author>, <locale>);',
                    description: translateService.instant('builder.modeler.classes.command-action.processInstances.createCaseByReference.description'),
                    example:
                        'def net = useCase.petriNet;\n' +
                        'createCase(net);'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.processInstances.changeCaseProperty.label'),
                    header: 'changeCaseProperty <String property> about <Closure supplier>',
                    action: 'changeCaseProperty <property> about { <value>; }',
                    description: translateService.instant('builder.modeler.classes.command-action.processInstances.changeCaseProperty.description'),
                    example: 'trans: t.t5;\n' +
                        'changeCaseProperty "icon" about { trans.icon }'
                }
            ]
        },
        {
            label: translateService.instant('builder.modeler.classes.command-action.tasks.label'),
            badge: 'task',
            actions: [
                {
                    label: translateService.instant('builder.modeler.classes.command-action.tasks.getTaskId.label'),
                    header: 'String getTaskId(String transitionId, Case aCase = useCase)',
                    action: 'getTaskId(<transitionId>);',
                    description: translateService.instant('builder.modeler.classes.command-action.tasks.getTaskId.description'),
                    example: 'def taskId = getTaskId("t1")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.tasks.assignTaskByTransitionId.label'),
                    header: 'Task assignTask(String transitionId, Case aCase = useCase, IUser user = userService.loggedOrSystem)',
                    action: 'assignTask(<transitionId>);',
                    description: translateService.instant('builder.modeler.classes.command-action.tasks.assignTaskByTransitionId.description'),
                    example: 'selectedUser: f.select_controler;\n' +
                        'if (selectedUser.value) {\n' +
                        '    def user = userService.findById(selectedUser.value.id, false)\n' +
                        '    assignTask("control", useCase, user);\n' +
                        '}'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.tasks.assignTaskByTask.label'),
                    header: 'Task assignTask(Task task, IUser user = userService.loggedOrSystem)',
                    action: 'assignTask(<task>);',
                    description: translateService.instant('builder.modeler.classes.command-action.tasks.assignTaskByTask.description'),
                    example: 'selectedUser: f.select_controler;\n' +
                        'if (selectedUser.value) {\n' +
                        '    def usecase = findCase({ it.title("Some case") }).first()\n' +
                        '    def task = findTask({ it.importId.eq("control") & it.caseId.eq(usecase.stringId) })\n' +
                        '    def user = userService.findById(selectedUser.value.id, false)\n' +
                        '    assignTask(task, user);\n' +
                        '}'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.tasks.assignTaskByTasks.label'),
                    header: 'void assignTasks(List<Task> tasks, IUser assignee = userService.loggedOrSystem)',
                    action: 'assignTasks(<tasks>);',
                    description: translateService.instant('builder.modeler.classes.command-action.tasks.assignTaskByTasks.description'),
                    example: '// find all my cases and assign all their control tasks to me\n' +
                        'def cases = findCases( { it.author.id.eq(loggedUser().id)) } )\n' +
                        'def caseIds = cases.collect { it.stringId }\n' +
                        'def tasks = findTasks({ it.importId.eq("control") & it.caseId.in(cases) })\n' +
                        'assignTasks(tasks)'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.tasks.cancelTaskByTransitionId.label'),
                    header: 'Task cancelTask(String transitionId, Case aCase = useCase, IUser user = userService.loggedOrSystem)',
                    action: 'cancelTask(<transitionId>);',
                    description: translateService.instant('builder.modeler.classes.command-action.tasks.cancelTaskByTransitionId.description'),
                    example: 'def taskId = "work_task";\n' +
                        'def aCase = findCase({ it.author.id.eq(loggedUser().id) })\n' +
                        'cancelTask(taskId, aCase);'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.tasks.cancelTaskByTask.label'),
                    header: 'Task cancelTask(Task task, IUser user = userService.loggedOrSystem)',
                    action: 'cancelTask(<task>);',
                    description: translateService.instant('builder.modeler.classes.command-action.tasks.cancelTaskByTask.description'),
                    example: '// cancel the task "work_task", currently assigned to me, in the current case\n' +
                        'def task = findTask( { it.transitionId.eq("work_task") } );\n' +
                        'cancelTask(task);'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.tasks.cancelTasks.label'),
                    header: 'void cancelTasks(List<Task> tasks, IUser user = userService.loggedOrSystem)',
                    action: 'cancelTasks(<tasks>);',
                    description: translateService.instant('builder.modeler.classes.command-action.tasks.cancelTasks.description'),
                    example: '// cancel the task "work_task", currently assigned to me, in the current case\n' +
                        'def tasks = findTasks( { it.transitionId.eq("work_task") } );\n' +
                        'cancelTasks(tasks);'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.tasks.finishTaskByTransitionId.label'),
                    header: 'void finishTask(String transitionId, Case aCase = useCase, IUser user = userService.loggedOrSystem)',
                    action: 'finishTask(<transitionId>);',
                    description: translateService.instant('builder.modeler.classes.command-action.tasks.finishTaskByTransitionId.description'),
                    example: '// finish the task "work_task", currently assigned to me, in the current case\n' +
                        'def taskId = "work_task";\n' +
                        'def aCase = findCase({ it.author.id.eq(loggedUser().id) })\n' +
                        'finishTask(taskId, aCase);'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.tasks.finishTaskByTask.label'),
                    header: 'void finishTask(Task task, IUser user = userService.loggedOrSystem)',
                    action: 'finishTask(<task>);',
                    description: translateService.instant('builder.modeler.classes.command-action.tasks.finishTaskByTask.description'),
                    example: '// finish the task "work_task", currently assigned to me in current case\n' +
                        'def task = findTask( { it.transitionId.eq("work_task") & it.caseId.eq(useCase.stringId) & it.userId.eq(loggedUser().id) } );\n' +
                        'finishTask(task);'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.tasks.finishTasksByList.label'),
                    header: 'void finishTasks(List<Task> tasks, IUser finisher = userService.loggedOrSystem)',
                    action: 'finishTasks(<tasks>);',
                    description: translateService.instant('builder.modeler.classes.command-action.tasks.finishTasksByList.description'),
                    example: '// finish all the tasks "work_task", currently assigned to me\n' +
                        'def tasks = findTasks( { it.transitionId.eq("work_task") & it.userId.eq(loggedUser().id) } );\n' +
                        'finishTasks(tasks);'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.tasks.executeTask.label'),
                    header: 'executeTask(String transitionId, Map dataSet)\n',
                    action: 'executeTask(<transitionId>, <dataSet>)',
                    description: translateService.instant('builder.modeler.classes.command-action.tasks.executeTask.description'),
                    example: 'executeTask(transition, [\n' +
                        '    "new_limit": [\n' +
                        '        "value": "10000",\n' +
                        '        "type" : "number"\n' +
                        '    ],\n' +
                        '])'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.tasks.executeTransitions.label'),
                    header: 'execute <String transitionId> where <Closure<Predicate>> with <Map>\n',
                    action: 'execute <transitionId> where <closure<predicate>> with <map>',
                    description: translateService.instant('builder.modeler.classes.command-action.tasks.executeTransitions.description'),
                    example: 'field: f.field;\n' +
                        'execute "synchronized" where ([\n' +
                        '\t"title eq Case 1"\n' +
                        '] as List) with ([\n' +
                        '  \t"field": [\n' +
                        '     \tvalue: 128.0,\n' +
                        '        type: "number"\n' +
                        '\t]\n' +
                        '] as Map)'
                }
            ]
        },
        {
            label: translateService.instant('builder.modeler.classes.command-action.search.label'),
            badge: 'search',
            actions: [
                {
                    label: translateService.instant('builder.modeler.classes.command-action.search.findCases.label'),
                    header: 'List<Case> findCases(Closure<Predicate> predicate)',
                    action: 'findCases(<casePredicate>);',
                    description: translateService.instant('builder.modeler.classes.command-action.search.findCases.description'),
                    example: 'List<Case> cases = findCases( { it.title.eq("Case 1") } );\n' +
                        '...\n' +
                        'List<Case> cases = findCases( { it.dataSet.get("name").value.eq("John") } );\n'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.search.findCasesPageable.label'),
                    header: 'List<Case> findCases(Closure<Predicate> predicate, Pageable page)',
                    action: 'findCases(<casePredicate>, <page>);',
                    description: translateService.instant('builder.modeler.classes.command-action.search.findCasesPageable.description'),
                    example: '// returns the first page of 5 cases sorted by the title\n' +
                        'List<Case> cases = findCases( { it.dataSet.get("name").value.eq("John") }, new PageRequest(0, 10, Sort.by("title").ascending() ) );\n' +
                        '...\n' +
                        '// returns the second page of 5 cases sorted from the newest to oldest\n' +
                        'List<Case> cases = findCases( { it.dataSet.get("name").value.eq("John") }, new PageRequest(1, 5, Sort.by("creationDate").descending() ) );'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.search.findCase.label'),
                    header: 'Case findCase(Closure<Predicate> predicate)\n',
                    action: 'findCase(<casePredicate>);',
                    description: translateService.instant('builder.modeler.classes.command-action.search.findCase.description'),
                    example: 'Case useCase = findCase( { it.title.eq("Case 1") & it.processIdentifier.eq("insurance") } );\n' +
                        '...\n' +
                        'Case useCase = findCase( { it.dataSet.get("name").value.eq("John") & it.processIdentifier.eq("insurance") } );'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.search.findTasks.label'),
                    header: 'List<Task> findTasks(Closure<Predicate> predicate)',
                    action: 'findTasks(<taskPredicate>);',
                    description: translateService.instant('builder.modeler.classes.command-action.search.findTasks.description') +
                        '\n',
                    example: 'def useCase = findCase(...)\n' +
                        'Task task = findTask( { it.caseId.eq(useCase.stringId) & it.transitionId.eq("<transition>") } );'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.search.findTasksWithPagination.label'),
                    header: 'List<Task> findTasks(Closure<Predicate> predicate, Pageable pageable)',
                    action: 'findTasks(<taskPredicate>);',
                    description: translateService.instant('builder.modeler.classes.command-action.search.findTasksWithPagination.description') +
                        '\n',
                    example: 'def useCase = findCase(...)\n' +
                        'Task task = findTask( { it.caseId.eq(useCase.stringId) & it.transitionId.eq("<transition>") }, Pageable.ofSize(100));'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.search.findTask.label'),
                    header: 'Task findTask(Closure<Predicate> predicate)',
                    action: 'findTask(<taskPredicate>);',
                    description: translateService.instant('builder.modeler.classes.command-action.search.findTask.description'),
                    example: 'List<Task> tasks = findTasks( { it.transitionId.eq("edit_limit") } )\n' +
                        '...\n' +
                        'def useCase = findCase(...)\n' +
                        'List<Task> tasks = findTasks( { it.caseId.eq(useCase.stringId) } );'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.search.findTaskById.label'),
                    header: 'Task findTask(String mongoId)',
                    action: 'findTask(<value>);',
                    description: translateService.instant('builder.modeler.classes.command-action.search.findTaskById.description'),
                    example:
                        'taskRef: f.taskRef;\n' +
                        'def task = findTask(taskRef.value.first())'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.search.findCaseElastic.label'),
                    header: 'Case findCaseElastic(String query)',
                    action: 'findCaseElastic(<value>);',
                    description: translateService.instant('builder.modeler.classes.command-action.search.findCaseElastic.description'),
                    example: 'findCaseElastic("processIdentifier:mortgage")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.search.findCasesElastic.label'),
                    header: 'List<Case> findCasesElastic(String query, Pageable pageable)',
                    action: 'findCasesElastic(<value>, <value>);',
                    description: translateService.instant('builder.modeler.classes.command-action.search.findCasesElastic.description'),
                    example: 'findCasesElastic("processIdentifier:mortgage", PageRequest.of(0, 10))'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.search.countCasesElastic.label'),
                    header: 'long countCasesElastic(String query)',
                    action: 'countCasesElastic(<value>);',
                    description: translateService.instant('builder.modeler.classes.command-action.search.countCasesElastic.description'),
                    example: 'countCasesElastic("processIdentifier:mortgage")'
                }
            ]
        },
        {
            label: translateService.instant('builder.modeler.classes.command-action.async.label'),
            badge: 'sync_alt',
            actions: [
                {
                    label: translateService.instant('builder.modeler.classes.command-action.async.asyncRun.label'),
                    action: 'async.run{\n\tassignTask(<transitionId>)\n\tfinishTask(<transitionId>)\n}',
                    description: ''
                }
            ]
        },
        {
            label: translateService.instant('builder.modeler.classes.command-action.roles.label'),
            badge: 'people',
            actions: [
                {
                    label: translateService.instant('builder.modeler.classes.command-action.roles.assignRole.label'),
                    header: 'IUser assignRole(String roleMongoId, IUser user = userService.loggedUser)',
                    action: 'assignRole(<value>);',
                    description: translateService.instant('builder.modeler.classes.command-action.roles.assignRole.description'),
                    example: 'transition: t.task;\n' +
                        'assignRole(transition.defaultRoleId);'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.roles.assignRoleByImportIdAndIdentifier.label'),
                    header: 'IUser assignRole(String roleId, String netId, IUser user = userService.loggedUser)',
                    action: 'assignRole(<value>, <value>);',
                    description: translateService.instant('builder.modeler.classes.command-action.roles.assignRoleByImportIdAndIdentifier.description'),
                    example: 'assignRole("role_1", "process_1");'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.roles.assignRoleByImportIdAndProcess.label'),
                    header: 'IUser assignRole(String roleId, PetriNet net, IUser user = userService.loggedUser)',
                    action: 'assignRole(<value>, <value>);',
                    description: translateService.instant('builder.modeler.classes.command-action.roles.assignRoleByImportIdAndProcess.description'),
                    example: 'assignRole("role_1", useCase.petriNet);'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.roles.assignRoleByImportIdIdentifierAndVersion.label'),
                    header: 'IUser assignRole(String roleId, String netId, Version version, IUser user = userService.loggedUser)',
                    action: 'assignRole(<value>, <value>);',
                    description: translateService.instant('builder.modeler.classes.command-action.roles.assignRoleByImportIdIdentifierAndVersion.description'),
                    example: 'assignRole("role_1", useCase.petriNet);'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.roles.removeRole.label'),
                    header: 'IUser removeRole(String roleMongoId, IUser user = userService.loggedUser)',
                    action: 'removeRole(<value>);',
                    description: translateService.instant('builder.modeler.classes.command-action.roles.removeRole.description'),
                    example: 'transition: t.task;\n' +
                        'removeRole(transition.defaultRoleId);'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.roles.removeRoleByImportIdAndIdentifier.label'),
                    header: 'IUser removeRole(String roleId, String netId, IUser user = userService.loggedUser)',
                    action: 'removeRole(<value>, <value>);',
                    description: translateService.instant('builder.modeler.classes.command-action.roles.removeRoleByImportIdAndIdentifier.description'),
                    example: 'removeRole("role_1", "process_1");'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.roles.removeRoleByImportIdAndProcess.label'),
                    header: 'IUser removeRole(String roleId, PetriNet net, IUser user = userService.loggedUser)',
                    action: 'removeRole(<value>, <value>);',
                    description: translateService.instant('builder.modeler.classes.command-action.roles.removeRoleByImportIdAndProcess.description'),
                    example: 'removeRole("role_1", useCase.petriNet);'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.roles.removeRoleByImportIdIdentifierAndVersion.label'),
                    header: 'IUser removeRole(String roleId, String netId, Version version, IUser user = userService.loggedUser)',
                    action: 'removeRole(<value>, <value>, <value>);',
                    description: translateService.instant('builder.modeler.classes.command-action.roles.removeRoleByImportIdIdentifierAndVersion.description'),
                    example: 'removeRole("role_1", useCase.petriNet, new Version(1,2,3));'
                }
            ]
        },
        {
            label: translateService.instant('builder.modeler.classes.command-action.users.label'),
            badge: 'person',
            actions: [
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.loggedUser.label'),
                    header: 'IUser loggedUser()\n',
                    action: 'loggedUser();\n',
                    description: translateService.instant('builder.modeler.classes.command-action.users.loggedUser.description'),
                    example: 'userField: t.user;\n' +
                        'change userField value {\n' +
                        '    return loggedUser()\n' +
                        '}'
                },
                // find
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.findByEmail.label'),
                    header: 'IUser findUserByEmail(String email)',
                    action: 'findUserByEmail(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.users.findByEmail.description'),
                    example: 'findUserByEmail("user@email.com")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.findById.label'),
                    header: 'IUser findUserById(String id)',
                    action: 'findUserById(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.users.findById.description'),
                    example: 'userField: f.user_field;\n' +
                        'findUserById(userField.value.id)'
                },
                // by email
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.changeEmailByEmail.label'),
                    header: 'changeUserByEmail (String email) email (Closure<String> cl)',
                    action: 'changeUserByEmail <value> email { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.users.changeEmailByEmail.description'),
                    example: 'changeUserByEmail "test@gmail.com" email { "test@email.com" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.changeNameByEmail.label'),
                    header: 'changeUserByEmail (String email) name (Closure<String> cl)',
                    action: 'changeUserByEmail <value> name { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.users.changeNameByEmail.description'),
                    example: 'changeUserByEmail "test@gmail.com" name { "Name" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.changeSurnameByEmail.label'),
                    header: 'changeUserByEmail (String email) surname (Closure<String> cl)',
                    action: 'changeUserByEmail <value> surname { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.users.changeSurnameByEmail.description'),
                    example: 'changeUserByEmail "test@gmail.com" surname { "Surname" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.changeTelByEmail.label'),
                    header: 'changeUserByEmail (String email) tel (Closure<String> cl)',
                    action: 'changeUserByEmail <value> tel { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.users.changeTelByEmail.description'),
                    example: 'changeUserByEmail "test@gmail.com" tel { "+0912345678" }'
                },
                // by id
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.changeEmailById.label'),
                    header: 'changeUser (String id) email (Closure<String> cl)',
                    action: 'changeUser <value> email { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.users.changeEmailById.description'),
                    example: 'changeUser userField.value.id email { "test@email.com" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.changeNameById.label'),
                    header: 'changeUser (String id) name (Closure<String> cl)',
                    action: 'changeUser <value> name { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.users.changeNameById.description'),
                    example: 'changeUser userField.value.id name { "Name" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.changeSurnameById.label'),
                    header: 'changeUser (String id) surname (Closure<String> cl)',
                    action: 'changeUser <value> surname { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.users.changeSurnameById.description'),
                    example: 'changeUser userField.value.id surname { "Surname" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.changeTelById.label'),
                    header: 'changeUser (String id) tel (Closure<String> cl)',
                    action: 'changeUser <value> tel { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.users.changeTelById.description'),
                    example: 'changeUser userField.value.id tel { "+0912345678" }'
                },
                // by reference
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.changeEmailByRef.label'),
                    header: 'changeUser (IUser user) email (Closure<String> cl)',
                    action: 'changeUser <value> email { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.users.changeEmailByRef.description'),
                    example: 'changeUser findUserByEmail("test@gmail.com") email { ""test@email.com" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.changeNameByRef.label'),
                    header: 'changeUser (IUser user) name (Closure<String> cl)',
                    action: 'changeUser <value> name { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.users.changeNameByRef.description'),
                    example: 'changeUser findUserByEmail("test@gmail.com") name { "Name" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.changeSurnameByRef.label'),
                    header: 'changeUser (IUser user) surname (Closure<String> cl)',
                    action: 'changeUser <value> surname { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.users.changeSurnameByRef.description'),
                    example: 'changeUser findUserByEmail("test@gmail.com") surname { "Surname" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.changeTelByRef.label'),
                    header: 'changeUser (IUser user) tel (Closure<String> cl)',
                    action: 'changeUser <value> tel { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.users.changeTelByRef.description'),
                    example: 'changeUser findUserByEmail("test@gmail.com") tel { "+0912345678" }'
                },
                // invite
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.inviteByEmail.label'),
                    header: 'MessageResource inviteUser(String email)',
                    action: 'inviteUser(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.users.inviteByEmail.description'),
                    example: 'inviteUser("user@email.com")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.inviteByRequest.label'),
                    header: 'MessageResource inviteUser(NewUserRequest newUserRequest)',
                    action: 'inviteUser(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.users.inviteByRequest.description'),
                    example: 'def request = new NewUserRequest()\n' +
                        'request.email = "user@email.com"\n' +
                        'inviteUser(request)'
                },
                // delete
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.deleteUserByEmail.label'),
                    header: 'void deleteUser(String email)',
                    action: 'deleteUser(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.users.deleteUserByEmail.description'),
                    example: 'deleteUser("user@email.com")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.users.deleteUserByRef.label'),
                    header: 'void deleteUser(IUser user)',
                    action: 'deleteUser(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.users.deleteUserByRef.description'),
                    example: 'def user = findUserByEmail(String email)\n' +
                        'deleteUser(user)'
                },
            ]
        },
        {
            label: translateService.instant('builder.modeler.classes.command-action.frontendFunctions.label'),
            badge: 'laptop',
            actions: [
                {
                    label: translateService.instant('builder.modeler.classes.command-action.frontendFunctions.reloadTaskData.label'),
                    header: 'Frontend.reloadTask();',
                    action: 'Frontend.reloadTask();',
                    description: translateService.instant('builder.modeler.classes.command-action.frontendFunctions.reloadTaskData.description'),
                    example: 'Frontend.reloadTask();'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.frontendFunctions.validateTaskData.label'),
                    header: 'Frontend.validate(String taskId);',
                    action: 'Frontend.validate(<value>);',
                    description: translateService.instant('builder.modeler.classes.command-action.frontendFunctions.validateTaskData.description'),
                    example:
                        'def taskId = useCase.tasks.find { it.transition == "t1" }.task\n' +
                        'Frontend.validate(taskId);'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.frontendFunctions.redirectToRoute.label'),
                    header: 'Frontend.redirect(String route);',
                    action: 'Frontend.redirect(<value>);',
                    description: translateService.instant('builder.modeler.classes.command-action.frontendFunctions.redirectToRoute.description'),
                    example: 'Frontend.redirect(\'login\');'
                }
            ]
        },
        {
            label: translateService.instant('builder.modeler.classes.command-action.pdf.label'),
            badge: 'picture_as_pdf',
            actions: [
                {
                    label: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdf1.label'),
                    header: 'generatePDF(String transitionId, String fileFieldId)',
                    action: 'generatePDF(<transitionId>, <datafieldId>)',
                    description: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdf1.description'),
                    example: 'file_0: f.file_0;\n' +
                        'generatePDF("t1", file_0.importId)'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdf2.label'),
                    header: 'void generatePdf(String sourceTransitionId, String targetFileFieldId,\n' +
                        '                     Case sourceCase = useCase, Case targetCase = useCase, String targetTransitionId = null,\n' +
                        '                     String template = null, List<String> excludedFields = [], Locale locale = null,\n' +
                        '                     ZoneId dateZoneId = ZoneId.systemDefault(), Integer sideMargin = 75, Integer titleMargin = 0)',
                    action: 'generatePdf(<transitionId>, <datafieldId>)',
                    description: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdf2.description'),
                    example: 'generatePdf("t1", "file_field")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdf3.label'),
                    header: 'void generatePdf(Transition sourceTransition, FileField targetFileField, Case sourceCase = useCase, Case targetCase = useCase,\n' +
                        '                     Transition targetTransition = null, String template = null, List<String> excludedFields = [], Locale locale = null,\n' +
                        '                     ZoneId dateZoneId = ZoneId.systemDefault(), Integer sideMargin = 75, Integer titleMargin = 0)',
                    action: 'generatePdf(<transition>, <datafield>)',
                    description: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdf3.description'),
                    example: 'task: t.t1,\n' +
                        'file_field: f.file_field;\n' +
                        'generatePdf(task, file_field)'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdf4.label'),
                    header: 'void generatePdf(String transitionId, FileField fileField, List<String> excludedFields = [])',
                    action: 'generatePDF(<transitionId>, <datafield>)',
                    description: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdf4.description'),
                    example: 'file_field: f.file_field;\n' +
                        'generatePDF("t1", file_field)'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdf5.label'),
                    header: 'void generatePdf(String transitionId, String fileFieldId, List<String> excludedFields, Case fromCase = useCase, Case saveToCase = useCase)',
                    action: 'generatePDF(<transitionId>, <datafieldId>, [<datafieldId>])',
                    description: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdf5.description'),
                    example: 'generatePDF("t1", "file_field", ["ignored_field_1", "ignored_field_2"])'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdfWithTemplate.label'),
                    header: 'void generatePdfWithTemplate(String transitionId, String fileFieldId, String template, Case fromCase = useCase, Case saveToCase = useCase)',
                    action: 'generatePdfWithTemplate(<transitionId>, <datafieldId>, <filePath>)',
                    description: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdfWithTemplate.description'),
                    example: 'generatePdfWithTemplate("t1", "file_field", "templates/mortgage.pdf")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdfWithLocale.label'),
                    header: 'void generatePdfWithLocale(String transitionId, String fileFieldId, Locale locale, Case fromCase = useCase, Case saveToCase = useCase)',
                    action: 'generatePdfWithLocale(<transitionId>, <datafieldId>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdfWithLocale.description'),
                    example: 'generatePdfWithLocale("t1", "file_field", Locale.forLanguageTag("sk"))'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdfWithZoneId.label'),
                    header: 'void generatePdfWithZoneId(String transitionId, String fileFieldId, ZoneId dateZoneId = ZoneId.systemDefault(), Case fromCase = useCase, Case saveToCase = useCase)',
                    action: 'generatePdfWithZoneId(<transitionId>, <datafieldId>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.pdf.generatePdfWithZoneId.description'),
                    example: 'generatePdfWithZoneId("t1", "file_field", ZoneId.of("UTC"))'
                },
            ]
        },
        {
            label: translateService.instant('builder.modeler.classes.command-action.email.label'),
            badge: 'email',
            actions: [
                {
                    label: translateService.instant('builder.modeler.classes.command-action.email.sendEmailPlaintText.label'),
                    header: 'void sendEmail(List<String> recipients, String subject, String body)',
                    action: 'sendEmail([<value>], <value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.email.sendEmailPlaintText.description'),
                    example: 'sendEmail(["first@mail.com", "second@mail.com"], "subject", "Dear Mr ...")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.email.sendEmailWithAttachments.label'),
                    header: 'void sendEmail(List<String> to, String subject, String body, Map<String, File> attachments)',
                    action: 'sendEmail([<value>], <value>, <value>, [<value>: <value>])',
                    description: translateService.instant('builder.modeler.classes.command-action.email.sendEmailWithAttachments.description'),
                    example: 'sendEmail(["first@mail.com", "second@mail.com"], "subject", "Dear Mr ...", ["attachment_1": file])'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.email.sendMail.label'),
                    header: 'void sendMail(MailDraft mailDraft)',
                    action: 'sendMail(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.email.sendMail.description'),
                    example: 'MailDraft draft = MailDraft.builder("from@mail.com", ["to@mail.com"])\n' +
                        '   .cc(Collections.singletonList("cc@mail.com"))\n' +
                        '   .bcc(Collections.singletonList("bcc@mail.com"))\n' +
                        '   .subject("Subject draft")\n' +
                        '   .body("<p>This is body and this is value <b>${value}</b></p>")\n' +
                        '   .isHtml(true)\n' +
                        '   .model(["value": some_field.value])\n' +
                        '   .attachments(["file": some_file))\n' +
                        '   .build()\n' +
                        'sendEmail(draft)'
                },
            ]
        },
        {
            label: translateService.instant('builder.modeler.classes.command-action.filters.label'),
            badge: 'filter_alt',
            actions: [
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.findFilter.label'),
                    header: 'Case findFilter(String title)',
                    action: 'findFilter(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.findFilter.description'),
                    example: 'findFilter("All Mortgage")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.findFilters.label'),
                    header: 'List<Case> findFilters(String userInput)',
                    action: 'findFilters(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.findFilters.description'),
                    example: 'findFilters("mortgage")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.findAllFilters.label'),
                    header: 'List<Case> findAllFilters()',
                    action: 'findAllFilters()',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.findAllFilters.description'),
                    example: 'findAllFilters()'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.exportFilters.label'),
                    header: 'FileFieldValue exportFilters(Collection<String> filtersToExport)',
                    action: 'exportFilters(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.exportFilters.description'),
                    example: 'def filters = findAllFilters().collect {it.stringId}\n' +
                        'change file_field value { exportFilters(filters) }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.findDefaultFilters.label'),
                    header: 'List<Case> findDefaultFilters()',
                    action: 'findDefaultFilters()',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.findDefaultFilters.description'),
                    example: 'findDefaultFilters()'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.createCaseFilter.label'),
                    header: 'Case createCaseFilter(def title, String query, List<String> allowedNets, String icon = "", String visibility = DefaultFiltersRunner.FILTER_VISIBILITY_PRIVATE, def filterMetadata = null)',
                    action: 'createCaseFilter(<value>, <value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.createCaseFilter.description'),
                    example: 'createCaseFilter("All Mortgage", "processIdentifier:mortgage", ["mortgage"])'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.createTaskFilter.label'),
                    header: 'Case createTaskFilter(def title, String query, List<String> allowedNets, String icon = "", String visibility = DefaultFiltersRunner.FILTER_VISIBILITY_PRIVATE, def filterMetadata = null)',
                    action: 'createTaskFilter(<value>, <value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.createTaskFilter.description'),
                    example: 'createTaskFilter("Approvals", "transitionId:t1", ["mortgage"])'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.createFilter.label'),
                    header: 'Case createFilter(def title, String query, String type, List<String> allowedNets, String icon, String visibility, def filterMetadata)',
                    action: 'createFilter(<value>, <value>, <value>, [<value>], <value>, <value>, null)',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.createFilter.description'),
                    example: 'createFilter("All Mortgage", "processIdentifier:mortgage", "Case", ["mortgage"], "real_estate_agent", "public", null)\n' +
                        'createFilter("Approvals", "transitionId:t1", "Task", ["mortgage"], "checklist", "public", null)'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.changeFilterQuery.label'),
                    header: 'changeFilter (Case filter) query (Closure cl)',
                    action: 'changeFilter <value> query { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.changeFilterQuery.description'),
                    example: 'def filter = findFilter("All Mortgage")\n' +
                        'changeFilter filter query { "processIdentifier:new_mortgage" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.changeFilterVisibility.label'),
                    header: 'changeFilter (Case filter) visibility (Closure cl)',
                    action: 'changeFilter <value> visibility { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.changeFilterVisibility.description'),
                    example: 'def filter = findFilter("All Mortgage")\n' +
                        'changeFilter filter visibility { "private" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.changeFilterAllowedNets.label'),
                    header: 'changeFilter (Case filter) allowedNets (Closure cl)',
                    action: 'changeFilter <value> allowedNets { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.changeFilterAllowedNets.description'),
                    example: 'def filter = findFilter("All Mortgage")\n' +
                        'changeFilter filter allowedNets { ["new_mortgage"] }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.changeFilterMetadata.label'),
                    header: 'changeFilter (Case filter) filterMetadata (Closure cl)',
                    action: 'changeFilter <value> filterMetadata { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.changeFilterMetadata.description'),
                    example: 'def filter = findFilter("All Mortgage")\n' +
                        'changeFilter filter filterMetadata { defaultFilterMetadata("Case") }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.changeFilterTitle.label'),
                    header: 'changeFilter (Case filter) title (Closure cl)',
                    action: 'changeFilter <value> title { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.changeFilterTitle.description'),
                    example: 'def filter = findFilter("All Mortgage")\n' +
                        'changeFilter filter title { "New Mortgage" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.changeFilterIcon.label'),
                    header: 'changeFilter (Case filter) icon (Closure cl)',
                    action: 'changeFilter <value> icon { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.changeFilterIcon.description'),
                    example: 'def filter = findFilter("All Mortgage")\n' +
                        'changeFilter filter icon { "euro" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.changeFilterUri.label'),
                    header: 'changeFilter (Case filter) uri (Closure cl)',
                    action: 'changeFilter <value> uri { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.changeFilterUri.description'),
                    example: 'def filter = findFilter("All Mortgage")\n' +
                        'changeFilter filter uri { "/netgrif/new_mortgage" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.deleteFilter.label'),
                    header: 'def deleteFilter(Case filter)',
                    action: 'deleteFilter(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.deleteFilter.description'),
                    example: 'deleteFilter(findFilter("All Mortgage"))'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.createFilterInMenu1.label'),
                    header: 'Case createFilterInMenu(String uri, String itemIdentifier, def itemAndFilterName, String filterQuery,\n' +
                        '                            String filterType, String filterVisibility, List<String> filterAllowedNets = [],\n' +
                        '                            String itemAndFilterIcon = "filter_none", Map<String, String> itemAllowedRoles = [:],\n' +
                        '                            Map<String, String> itemBannedRoles = [:], List<String> itemCaseDefaultHeaders = [],\n' +
                        '                            List<String> itemTaskDefaultHeaders = [], def filterMetadata = null)',
                    action: 'createFilterInMenu(<value>, <value>, <value>, <value>, <value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.createFilterInMenu1.description'),
                    example: 'createFilterInMenu("/netgrif/mortgage", "mortgage", "All Mortgage", "processIdentifier:mortgage", "Case", "public")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.filters.createFilterInMenu2.label'),
                    header: 'Case createFilterInMenu(MenuItemBody body, String filterQuery, String filterType, String filterVisibility,\n' +
                        '                            List<String> filterAllowedNets = [], def filterMetadata = null)',
                    action: 'createFilterInMenu(<value>, <value>, <value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.filters.createFilterInMenu2.description'),
                    example: 'def body = new MenuItemBody(new I18nString("All Mortgage"), "real_estate_agent")\n' +
                        'createFilterInMenu(body, "processIdentifier:mortgage", "Case", "public")'
                },
            ]
        },
        {
            label: translateService.instant('builder.modeler.classes.command-action.menuItems.label'),
            badge: 'menu',
            actions: [
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.createMenuItem1.label'),
                    header: 'Case createMenuItem(String uri, String identifier, def name, String icon = "filter_none", Case filter = null,\n' +
                        '                        Map<String, String> allowedRoles = [:], Map<String, String> bannedRoles = [:],\n' +
                        '                        List<String> caseDefaultHeaders = [], List<String> taskDefaultHeaders = [])',
                    action: 'createMenuItem(<value>, <value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItemscreateMenuItem1..description'),
                    example: 'createMenuItem("/netgrif/mortgage", "all_mortgage", "All Mortgage")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemAllowedRoles.label'),
                    header: 'changeMenuItem (Case item) allowedRoles (Closure cl)',
                    action: 'changeMenuItem <value> allowedRoles { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemAllowedRoles.description'),
                    example: 'def menuItem = findMenuItem("all_mortgage")\n' +
                        'changeMenuItem menuItem allowedRoles { ["approver": "mortgage"] }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemBannedRoles.label'),
                    header: 'changeMenuItem (Case item) bannedRoles (Closure cl)',
                    action: 'changeMenuItem <value> bannedRoles { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemBannedRoles.description'),
                    example: 'def menuItem = findMenuItem("all_mortgage")\n' +
                        'changeMenuItem menuItem bannedRoles { ["approver": "mortgage"] }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemCaseDefaultHeaders.label'),
                    header: 'changeMenuItem (Case item) caseDefaultHeaders (Closure cl)',
                    action: 'changeMenuItem <value> caseDefaultHeaders { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemCaseDefaultHeaders.description'),
                    example: 'def menuItem = findMenuItem("all_mortgage")\n' +
                        'changeMenuItem menuItem caseDefaultHeaders { ["meta-title","meta-visualId"] }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemTaskDefaultHeaders.label'),
                    header: 'changeMenuItem (Case item) taskDefaultHeaders (Closure cl)',
                    action: 'changeMenuItem <value> taskDefaultHeaders { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemTaskDefaultHeaders.description'),
                    example: 'def menuItem = findMenuItem("all_mortgage")\n' +
                        'changeMenuItem menuItem caseDefaultHeaders { ["meta-title","meta-caseId"] }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemFilter.label'),
                    header: 'changeMenuItem (Case item) filter (Closure cl)',
                    action: 'changeMenuItem <value> filter { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemFilter.description'),
                    example: 'def menuItem = findMenuItem("all_mortgage")\n' +
                        'def filter = findFilter("All Mortgage")\n' +
                        'changeMenuItem menuItem filter { filter }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemUri.label'),
                    header: 'changeMenuItem (Case item) uri (Closure cl)',
                    action: 'changeMenuItem <value> uri { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemUri.description'),
                    example: 'def menuItem = findMenuItem("all_mortgage")\n' +
                        'changeMenuItem menuItem uri { "/netgrif/new_mortgage" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemMenuIcon.label'),
                    header: 'changeMenuItem (Case item) menuIcon (Closure cl)',
                    action: 'changeMenuItem <value> menuIcon { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemMenuIcon.description'),
                    example: 'def menuItem = findMenuItem("all_mortgage")\n' +
                        'changeMenuItem menuItem menuIcon { "euro" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemTabIcon.label'),
                    header: 'changeMenuItem (Case item) tabIcon (Closure cl)',
                    action: 'changeMenuItem <value> tabIcon { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemTabIcon.description'),
                    example: 'def menuItem = findMenuItem("all_mortgage")\n' +
                        'changeMenuItem menuItem tabIcon { "euro" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemRequireTitleInCreation.label'),
                    header: 'changeMenuItem (Case item) requireTitleInCreation (Closure cl)',
                    action: 'changeMenuItem <value> requireTitleInCreation { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemRequireTitleInCreation.description'),
                    example: 'def menuItem = findMenuItem("all_mortgage")\n' +
                        'changeMenuItem menuItem requireTitleInCreation { true }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemUseCustomView.label'),
                    header: 'changeMenuItem (Case item) useCustomView (Closure cl)',
                    action: 'changeMenuItem <value> useCustomView { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemUseCustomView.description'),
                    example: 'def menuItem = findMenuItem("all_mortgage")\n' +
                        'changeMenuItem menuItem useCustomView { true }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemCustomViewSelector.label'),
                    header: 'changeMenuItem (Case item) customViewSelector (Closure cl)',
                    action: 'changeMenuItem <value> customViewSelector { <value> }',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.changeMenuItemCustomViewSelector.description'),
                    example: 'def menuItem = findMenuItem("all_mortgage")\n' +
                        'changeMenuItem menuItem useCustomView { "mortgage-tabbed-views" }'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.deleteMenuItem.label'),
                    header: 'deleteMenuItem(Case item)',
                    action: 'deleteMenuItem(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.deleteMenuItem.description'),
                    example: 'def menuItem = findMenuItem("all_mortgage")\n' +
                        'deleteMenuItem(menuItem)'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.createMenuItem2.label'),
                    header: 'Case createMenuItem(MenuItemBody body)',
                    action: 'createMenuItem(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.createMenuItem2.description'),
                    example: 'def body = new MenuItemBody("netgrif/"mortgage", "all_mortgage, new I18nString("All Mortgage"), "home")\n' +
                        'createMenuItem(body)'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.moveMenuItem.label'),
                    header: 'void moveMenuItem(Case item, String destUri)',
                    action: 'moveMenuItem(<case>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.moveMenuItem.description'),
                    example: 'def menuItem = findMenuItem("all_mortgage")\n' +
                        'moveMenuItem(menuItem, "/netgrif/new_mortgage")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.duplicateMenuItem.label'),
                    header: 'Case duplicateMenuItem(Case originItem, I18nString newTitle, String newIdentifier)',
                    action: 'duplicateMenuItem(<case>, <value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.duplicateMenuItem.description'),
                    example: 'def menuItem = findMenuItem("all_mortgage")\n' +
                        'duplicateMenuItem(menuItem, "New Mortgage", "new_mortgage")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.findMenuItem1.label'),
                    header: 'Case findMenuItem(String menuItemIdentifier)',
                    action: 'findMenuItem(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.findMenuItem1.description'),
                    example: 'findMenuItem("all_mortgage")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.findMenuItemByUriAndName.label'),
                    header: 'Case findMenuItem(String uri, String name)',
                    action: 'findMenuItem(<value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.findMenuItemByUriAndName.description'),
                    example: 'findMenuItem("/netgrif/mortgage", "All Mortgage")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.findMenuItemByUriAndIdentifier.label'),
                    header: 'Case findMenuItemByUriAndIdentifier(String uri, String identifier)',
                    action: 'findMenuItemByUriAndIdentifier(<value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.findMenuItemByUriAndIdentifier.description'),
                    example: 'findMenuItemByUriAndIdentifier("/netgrif/mortgage", "all_mortgage")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.existsMenuItem.label'),
                    header: 'boolean existsMenuItem(String menuItemIdentifier)',
                    action: 'existsMenuItem(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.existsMenuItem.description'),
                    example: 'existsMenuItem("all_mortgage")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.getFilterFromMenuItem.label'),
                    header: 'Case getFilterFromMenuItem(Case item)',
                    action: 'getFilterFromMenuItem(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.getFilterFromMenuItem.description'),
                    example: 'def item = findMenuItem("all_mortgage")\n' +
                        'getFilterFromMenuItem(item)'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.createOrUpdateMenuItem1.label'),
                    header: 'Case createOrUpdateMenuItem(String uri, String identifier, def name, String icon = "filter_none", Case filter = null,\n' +
                        '                                Map<String, String> allowedRoles = [:], Map<String, String> bannedRoles = [:],\n' +
                        '                                List<String> caseDefaultHeaders = [], List<String> taskDefaultHeaders = [])',
                    action: 'createOrUpdateMenuItem(<value>, <value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.createOrUpdateMenuItem1.description'),
                    example: 'createOrUpdateMenuItem("netgrif/"mortgage", "all_mortgage, new I18nString("All Mortgage"))'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.createOrUpdateMenuItemAndFilter1.label'),
                    header: 'Case createOrUpdateMenuItemAndFilter(String uri, String itemIdentifier, def itemAndFilterName, String filterQuery,\n' +
                        '                                         String filterType, String filterVisibility, List<String> filterAllowedNets = [],\n' +
                        '                                         String itemAndFilterIcon = "filter_none", Map<String, String> itemAllowedRoles = [:],\n' +
                        '                                         Map<String, String> itemBannedRoles = [:], List<String> itemCaseDefaultHeaders = [],\n' +
                        '                                         List<String> itemTaskDefaultHeaders = [], def filterMetadata = null)',
                    action: 'createOrUpdateMenuItemAndFilter(<value>, <value>, <value>, <value>, <value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.createOrUpdateMenuItemAndFilter1.description'),
                    example: 'createOrUpdateMenuItemAndFilter("netgrif/"mortgage", "all_mortgage, new I18nString("All Mortgage"), "processIdentifier:mortgage", "Case", "public")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.createOrUpdateMenuItem2.label'),
                    header: 'Case createOrUpdateMenuItem(MenuItemBody body)',
                    action: 'createOrUpdateMenuItemAndFilter(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.createOrUpdateMenuItem2.description'),
                    example: 'MenuItemBody body = new MenuItemBody("netgrif/"mortgage", "all_mortgage, new I18nString("All Mortgage"), "home")\n' +
                        'createOrUpdateMenuItemAndFilter(body)'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.createOrUpdateMenuItemAndFilter2.label'),
                    header: 'Case createOrUpdateMenuItemAndFilter(MenuItemBody body, String filterQuery, String filterType, String filterVisibility,\n' +
                        '                                         List<String> filterAllowedNets = [], def filterMetadata = null)',
                    action: 'createOrUpdateMenuItemAndFilter(<value>, <value>, <value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.createOrUpdateMenuItemAndFilter2.description'),
                    example: 'def body = new MenuItemBody(new I18nString("Settings"), "settings")\n' +
                        'createOrUpdateMenuItemAndFilter(body, "processIdentifier:mortgage", "Case", "public")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.createOrIgnoreMenuItem.label'),
                    header: 'Case createOrIgnoreMenuItem(MenuItemBody body)',
                    action: 'createOrUpdateMenuItemAndFilter(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.createOrIgnoreMenuItem.description'),
                    example: 'def body = new MenuItemBody(new I18nString("Settings"), "settings")\n' +
                        'createOrUpdateMenuItemAndFilter(body)'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.createOrIgnoreMenuItemAndFilter.label'),
                    header: 'Case createOrIgnoreMenuItemAndFilter(MenuItemBody body, String filterQuery, String filterType, String filterVisibility,\n' +
                        '                                         List<String> filterAllowedNets = [], def filterMetadata = null)',
                    action: 'createOrUpdateMenuItemAndFilter(<value>, <value>, <value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.createOrIgnoreMenuItemAndFilter.description'),
                    example: 'def body = new MenuItemBody(new I18nString("Settings"), "settings")\n' +
                        'createOrIgnoreMenuItemAndFilter(body, "processIdentifier:mortgage, "Case", "public")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.updateMenuItem.label'),
                    header: 'Case updateMenuItem(Case item, MenuItemBody body)',
                    action: 'updateMenuItem(<value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.updateMenuItem.description'),
                    example: 'def body = new MenuItemBody(new I18nString("Settings"), "settings")\n' +
                        'updateMenuItem(useCase, body)'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.menuItems.defaultFilterMetadata.label'),
                    header: 'static Map defaultFilterMetadata(String type) ',
                    action: 'defaultFilterMetadata(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.menuItems.defaultFilterMetadata.description'),
                    example: 'defaultFilterMetadata("Case")'
                }
            ]
        },
        {
            label: translateService.instant('builder.modeler.classes.command-action.importExport.label'),
            badge: 'import_export',
            actions: [
                {
                    label: translateService.instant('builder.modeler.classes.command-action.importExport.exportCasesToFile.label'),
                    header: 'File exportCasesToFile(Closure<Predicate> predicate, String pathName, ExportDataConfig config = null, int pageSize = exportConfiguration.getMongoPageSize())',
                    action: 'exportCasesToFile(<casePredicate>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.importExport.exportCasesToFile.description'),
                    example: 'exportCasesToFile({it.processIdentifier.eq("mortgage")}, "exported_mortgage.csv")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.importExport.exportCasesToStream.label'),
                    header: 'OutputStream exportCases(Closure<Predicate> predicate, File outFile, ExportDataConfig config = null, int pageSize = exportConfiguration.getMongoPageSize())',
                    action: 'exportCases(<casePredicate>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.importExport.exportCasesToStream.description'),
                    example: 'exportCases({it.processIdentifier.eq("mortgage")}, new File("exported_mortgage.csv"))'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.importExport.exportCasesToFileAsUser.label'),
                    header: 'File exportCasesToFile(List<CaseSearchRequest> requests, String pathName, ExportDataConfig config = null,\n' +
                        '                           LoggedUser user = userService.loggedOrSystem.transformToLoggedUser(),\n' +
                        '                           int pageSize = exportConfiguration.getMongoPageSize(),\n' +
                        '                           Locale locale = LocaleContextHolder.getLocale(),\n' +
                        '                           Boolean isIntersection = false)',
                    action: 'exportCasesToFile(<value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.importExport.exportCasesToFileAsUser.description'),
                    example: 'def request = CaseSearchRequest.builder().processIdentifier(["mortgage"]).build()\n' +
                        'exportCasesToFile([request], "exported_mortgage.csv")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.importExport.exportCasesToStreamAsUser.label'),
                    header: 'OutputStream exportCases(List<CaseSearchRequest> requests, File outFile, ExportDataConfig config = null,\n' +
                        '                             LoggedUser user = userService.loggedOrSystem.transformToLoggedUser(),\n' +
                        '                             int pageSize = exportConfiguration.getMongoPageSize(),\n' +
                        '                             Locale locale = LocaleContextHolder.getLocale(),\n' +
                        '                             Boolean isIntersection = false)',
                    action: 'exportCasesToFile([<value>], <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.importExport.exportCasesToStreamAsUser.description'),
                    example: 'def request = CaseSearchRequest.builder().processIdentifier(["mortgage"]).build()\n' +
                        'exportCasesToFile([request], new File("exported_mortgage.csv"))'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.importExport.exportTasksToFile.label'),
                    header: 'File exportTasksToFile(Closure<Predicate> predicate, String pathName, ExportDataConfig config = null)',
                    action: 'exportTasksToFile(<taskPredicate>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.importExport.exportTasksToFile.description'),
                    example: 'exportTasksToFile({it.caseId.eq(useCase.stringId)}, "exported_tasks.csv")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.importExport.exportTasksToStream.label'),
                    header: 'OutputStream exportTasks(Closure<Predicate> predicate, File outFile, ExportDataConfig config = null, int pageSize = exportConfiguration.getMongoPageSize())',
                    action: 'exportTasks(<taskPredicate>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.importExport.exportTasksToStream.description'),
                    example: 'exportTasks({it.caseId.eq(useCase.stringId)}, new File("exported_tasks.csv"))'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.importExport.exportTasksToFileAsUser.label'),
                    header: 'File exportTasksToFile(List<ElasticTaskSearchRequest> requests, String pathName, ExportDataConfig config = null,\n' +
                        '                           LoggedUser user = userService.loggedOrSystem.transformToLoggedUser(),\n' +
                        '                           int pageSize = exportConfiguration.getMongoPageSize(),\n' +
                        '                           Locale locale = LocaleContextHolder.getLocale(),\n' +
                        '                           Boolean isIntersection = false)',
                    action: 'exportTasksToFile([<value>], <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.importExport.exportTasksToFileAsUser.description'),
                    example: 'def request = new TaskSearchRequest(useCase: [new TaskSearchCaseRequest(id: useCase.stringId)])\n' +
                        'exportTasksToFile([request], "exported_mortgage.csv")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.importExport.exportTasksToStreamAsUser.label'),
                    header: 'OutputStream exportTasks(List<ElasticTaskSearchRequest> requests, File outFile, ExportDataConfig config = null,\n' +
                        '                             LoggedUser user = userService.loggedOrSystem.transformToLoggedUser(),\n' +
                        '                             int pageSize = exportConfiguration.getMongoPageSize(),\n' +
                        '                             Locale locale = LocaleContextHolder.getLocale(),\n' +
                        '                             Boolean isIntersection = false)',
                    action: 'exportTasks(<value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.importExport.exportTasksToStreamAsUser.description'),
                    example: 'def request = [new TaskSearchRequest(useCase: [new TaskSearchCaseRequest(id: useCase.stringId)])]\n' +
                        'exportTasks(request, new File("exported_mortgage.csv"))'
                },
            ]
        },
        {
            label: translateService.instant('builder.modeler.classes.command-action.uri.label'),
            badge: 'link',
            actions: [
                {
                    label: translateService.instant('builder.modeler.classes.command-action.uri.getUriNode.label'),
                    header: 'UriNode getUri(String uri)',
                    action: 'getUri(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.uri.getUriNode.description'),
                    example: 'getUri("/netgrif/fin/mortgage")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.uri.createUriNode.label'),
                    header: 'UriNode createUri(String uri, UriContentType type)',
                    action: 'createUri(<value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.uri.createUriNode.description'),
                    example: 'createUri("/netgrif/fin/mortgage", UriContentType.CASE)'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.uri.moveUriNode.label'),
                    header: 'moveUri(String uri, String dest)',
                    action: 'moveUri(<value>, <value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.uri.moveUriNode.description'),
                    example: 'moveUri("/netgrif/fin/mortgage", "/mortgage")'
                },
                {
                    label: translateService.instant('builder.modeler.classes.command-action.uri.makeUrl.label'),
                    header: 'String makeUrl(String publicViewUrl = publicViewProperties.url, String identifier)',
                    action: 'makeUrl(<value>)',
                    description: translateService.instant('builder.modeler.classes.command-action.uri.makeUrl.description'),
                    example: 'makeUrl("mortgage")'
                },
            ]
        },
        {
            label: translateService.instant('builder.modeler.classes.command-action.customFunctions.label'),
            badge: 'functions',
            actions: []
        },
    ]
}
