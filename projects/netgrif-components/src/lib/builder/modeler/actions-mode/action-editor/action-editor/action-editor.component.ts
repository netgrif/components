import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatSidenav} from '@angular/material/sidenav';
import {DialogDeleteComponent} from '../../../../dialogs/dialog-delete/dialog-delete.component';
import {ModelService} from '../../../services/model/model.service';
import {MenuItem} from '../action-editor-menu/action-editor-menu-item/menu-item';
import {MenuItemConfiguration} from '../action-editor-menu/action-editor-menu-item/menu-item-configuration';
import {ActionEditorService} from '../action-editor.service';
import {ChangeType, EditableAction} from '../classes/editable-action';
import {LeafNode} from '../classes/leaf-node';
import {ActionChangedEvent} from "../action-editor-list/action-changed-event";

@Component({
    selector: 'nc-builder-action-editor',
    templateUrl: './action-editor.component.html',
    styleUrls: ['./action-editor.component.scss']
})
export class ActionEditorComponent implements OnInit {

    @Input() public leafNode: LeafNode;
    @Output() public actionChanged: EventEmitter<ActionChangedEvent>;
    @Output() public drawerOpened: EventEmitter<boolean>;
    @ViewChild('drawer') private drawer: MatSidenav;
    @ViewChild('matButton') private button: MatButton;
    @ViewChild('referencesTrigger') trigger: MatMenuTrigger;
    @Input() name: string;
    // covalent code editor component source: https://github.com/Teradata/covalent/blob/develop/src/platform/code-editor/code-editor.component.ts

    @Input() public action: EditableAction;
    @Input() public index: number;

    public undoEnabled = false;
    public redoEnabled = false;

    public editor: any;
    public formControl: FormControl;
    public referencesOpened = true;
    public transitionItemsConfiguration: MenuItemConfiguration;
    public dataFieldItemsConfiguration: MenuItemConfiguration;
    public behaviourItemsConfiguration: MenuItemConfiguration;
    public conditionItemsConfiguration: MenuItemConfiguration;
    public propertyItemsConfiguration: MenuItemConfiguration;
    public valueItemsConfiguration: MenuItemConfiguration;
    public typeItemsConfiguration: MenuItemConfiguration;
    public dataSetItemsConfiguration: MenuItemConfiguration;
    public processInstanceIdItemsConfiguration: MenuItemConfiguration;
    public casePredicateItemsConfiguration: MenuItemConfiguration;
    public taskPredicateItemsConfiguration: MenuItemConfiguration;

    public editorConfigurations: Array<MenuItemConfiguration>;

    public TRANSITION_EVENT_TYPES = ['assign', 'finish', 'cancel', 'delegate'];
    public DATA_EVENT_TYPES = ['set', 'get'];
    public PHASE_TYPES = ['pre', 'post'];

    constructor(
        private actionEditorService: ActionEditorService,
        private modelService: ModelService,
        private deleteDialog: MatDialog
    ) {
        this.formControl = new FormControl(undefined, {updateOn: 'blur'});
        this.actionChanged = new EventEmitter<ActionChangedEvent>();
        this.drawerOpened = new EventEmitter<boolean>();
    }

    // options: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html
    editorOptions = {
        language: 'petriflow',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        wordWrap: 'off',
        colorDecorators: true
    };

    onInit(editorObject) {
        this.editor = editorObject;
        this.editor.onDidChangeModelContent(e => {
            this.saveAction(this.editor.getModel().getLinesContent().join('\n'));
        });
        this.transitionItemsConfiguration.editor = editorObject;
        this.dataFieldItemsConfiguration.editor = editorObject;
        this.behaviourItemsConfiguration.editor = editorObject;
        this.conditionItemsConfiguration.editor = editorObject;
        this.propertyItemsConfiguration.editor = editorObject;
        this.valueItemsConfiguration.editor = editorObject;
        this.dataSetItemsConfiguration.editor = editorObject;
        this.typeItemsConfiguration.editor = editorObject;
        this.processInstanceIdItemsConfiguration.editor = editorObject;
        this.casePredicateItemsConfiguration.editor = editorObject;
        this.taskPredicateItemsConfiguration.editor = editorObject;
        this.initialiseEditorVersioning(editorObject);
    }

    private initialiseEditorVersioning(editorObject) {
        let initialVersion = editorObject.getModel().getAlternativeVersionId();
        let currentVersion = initialVersion;
        let lastVersion = initialVersion;
        this.editor.onDidChangeModelContent(e => {
            const versionId = editorObject.getModel().getAlternativeVersionId();
            if (!e.isUndoing && !e.isRedoing && this.editor.getValue() === '' &&
                e.changes[0].text === '' && e.changes[0].rangeLength === 0) {
                this.undoEnabled = false;
                currentVersion = versionId;
                initialVersion = 3;
                return;
            }
            if (versionId < currentVersion) {
                this.redoEnabled = true;
                if (versionId === initialVersion) {
                    this.undoEnabled = false;
                }
            } else {
                if (versionId <= lastVersion) {
                    if (versionId === lastVersion) {
                        this.redoEnabled = false;
                    }
                } else {
                    this.redoEnabled = false;
                    if (currentVersion > lastVersion) {
                        lastVersion = currentVersion;
                    }
                }
                this.undoEnabled = true;
            }
            currentVersion = versionId;
        });
    }

    ngOnInit(): void {
        this.formControl.setValue(this.action.definition);
        this.formControl.valueChanges.subscribe(value => {
            this.saveAction(value);
        });
        this.transitionItemsConfiguration = new MenuItemConfiguration(
            'Transitions',
            'transition',
            ['<transition>', '<transitionId>', '<task>'],
            this.editor,
            this,
            this.modelService.model.getTransitions().map(t => new MenuItem(t.id, `${t.label?.value} [${t.id}]`))
        );
        this.dataFieldItemsConfiguration = new MenuItemConfiguration(
            'Data fields',
            'datafield',
            // TODO: NAB-326 choicefield, optionfield = different menu items
            ['<datafield>', '<datafieldId>'],
            this.editor,
            this,
            this.modelService.model.getDataSet().map(f => new MenuItem(f.id, `${f.title?.value} [${f.id}]`))
        );
        this.behaviourItemsConfiguration = new MenuItemConfiguration(
            'Behaviours',
            'behaviour',
            ['<behaviour>'],
            this.editor,
            this,
            [
                new MenuItem('visible', 'visible'),
                new MenuItem('hidden', 'hidden'),
                new MenuItem('editable', 'editable'),
                new MenuItem('required', 'required'),
                new MenuItem('optional', 'optional')
            ]
        );
        this.conditionItemsConfiguration = new MenuItemConfiguration(
            'Conditions',
            'condition',
            ['<condition>'],
            this.editor,
            this,
            [
                new MenuItem('true', 'true'),
                new MenuItem('false', 'false'),
                new MenuItem('<datafield>.value == <datafield>.value', '&lt;datafield&gt;.value <b>==</b> &lt;datafield&gt;.value'),
                new MenuItem('<datafield>.value != <datafield>.value', '&lt;datafield&gt;.value <b>!=</b> &lt;datafield&gt;.value'),
                new MenuItem('<datafield>.value > <datafield>.value', '&lt;datafield&gt;.value <b>&gt;</b> &lt;datafield&gt;.value'),
                new MenuItem('<datafield>.value >= <datafield>.value', '&lt;datafield&gt;.value <b>&gt;=</b> &lt;datafield&gt;.value'),
                new MenuItem('<datafield>.value < <datafield>.value', '&lt;datafield&gt;.value <b>&lt;</b> &lt;datafield&gt;.value'),
                new MenuItem('<datafield>.value <= <datafield>.value', '&lt;datafield&gt;.value <b>&lt;=</b> &lt;datafield&gt;.value'),
                new MenuItem('<datafield>.value == <value>', '&lt;datafield&gt;.value <b>==</b> &lt;value&gt;'),
                new MenuItem('<datafield>.value != <value>', '&lt;datafield&gt;.value <b>!=</b> &lt;value&gt;'),
                new MenuItem('<datafield>.value > <value>', '&lt;datafield&gt;.value <b>&gt;</b> &lt;value&gt;'),
                new MenuItem('<datafield>.value >= <value>', '&lt;datafield&gt;.value <b>&gt;=</b> &lt;value&gt;'),
                new MenuItem('<datafield>.value < <value>', '&lt;datafield&gt;.value <b>&lt;</b> &lt;value&gt;'),
                new MenuItem('<datafield>.value <= <value>', '&lt;datafield&gt;.value <b>&lt;=</b> &lt;value&gt;'),
            ]
        );
        this.propertyItemsConfiguration = new MenuItemConfiguration(
            'Properties',
            'property',
            ['<property>'],
            this.editor,
            this,
            [
                new MenuItem('"title"', 'title'),
                new MenuItem('"color"', 'color'),
                new MenuItem('"icon"', 'icon'),
            ]
        );
        this.valueItemsConfiguration = new MenuItemConfiguration(
            'Values',
            'value',
            ['<value>', '<choices>', '<options>'],
            this.editor,
            this,
            [
                new MenuItem('<datafield>.value', '&lt;datafield&gt;.value'),
                new MenuItem('<datafield>.choices', '&lt;datafield&gt;.choices'),
                new MenuItem('<datafield>.options', '&lt;datafield&gt;.options'),
                new MenuItem('true', 'true'),
                new MenuItem('false', 'false'),
                new MenuItem(' ', 'Empty value'),
                new MenuItem('', 'New variable or value'),
                new MenuItem('[a,b,c]', 'List of objects'),
                new MenuItem('[a:a,b:b]', 'Map of objects'),
                new MenuItem('["a","b","c"]', 'List of strings'),
                new MenuItem('["a":"a","b":"b"]', 'Map of strings')
            ]
        );
        this.typeItemsConfiguration = new MenuItemConfiguration(
            'Types',
            'types',
            ['<type>'],
            this.editor,
            this,
            [
                new MenuItem('"text"', 'text'),
                new MenuItem('"number"', 'number'),
                new MenuItem('"date"', 'date'),
                new MenuItem('"boolean"', 'boolean'),
                new MenuItem('"file"', 'file'),
                new MenuItem('"fileList"', 'fileList'),
                new MenuItem('"enumeration"', 'enumeration'),
                new MenuItem('"enumeration_map"', 'enumeration_map'),
                new MenuItem('"multichoice"', 'multichoice'),
                new MenuItem('"multichoice_map"', 'multichoice_map'),
                new MenuItem('"userList"', 'userList'),
                new MenuItem('"tabular"', 'tabular'),
                new MenuItem('"caseRef"', 'caseRef'),
                new MenuItem('"dateTime"', 'dateTime'),
                new MenuItem('"button"', 'button'),
                new MenuItem('"taskRef"', 'taskRef'),
                new MenuItem('"filter"', 'filter'),
                new MenuItem('"i18n"', 'i18n')
            ]
        );
        this.dataSetItemsConfiguration = new MenuItemConfiguration(
            'DataSet',
            'dataSet',
            ['<dataSet>'],
            this.editor,
            this,
            [
                new MenuItem('[<datafieldId>: ["value": <value>,"type": <type>]]', 'One data in set'),
                new MenuItem('[<datafieldId>: ["value": <value>,"type": <type>],\n \t\t\t   <datafieldId>: ["value": <value>,"type": <type>]]', 'Two data in set'),
            ]
        );
        this.processInstanceIdItemsConfiguration = new MenuItemConfiguration(
            'Process Instance Id',
            'processInstanceId',
            ['<processInstanceId>'],
            this.editor,
            this,
            [
                new MenuItem(' //Process instance ID can be found in your NAE app', 'Process Instance Id'),
            ]
        );
        this.casePredicateItemsConfiguration = new MenuItemConfiguration(
            'Case predicates',
            'casePredicate',
            ['<casePredicate>'],
            this.editor,
            this,
            [
                new MenuItem('<casePredicate>.and<casePredicate>', '<b>Predicate</b> and <b>Predicate</b>'),
                new MenuItem('<casePredicate>.or<casePredicate>', '<b>Predicate</b> or <b>Predicate</b>'),
                new MenuItem('{it.id.eq(<value>)}', 'Case ID equals value'),
                new MenuItem('{it.visualId.eq(<value>)}', 'Case visual ID equals value'),
                new MenuItem('{it.processIdentifier.eq(<processInstanceId>)}', 'Process identifier equals value'),
                new MenuItem('{it.title.eq(<value>)}', 'Title equals value'),
                new MenuItem('{it.author.email.eq(<value>)}', 'Authors email equals value'),
                new MenuItem('{it.author.id.eq(<value>)}', 'Authors id equals value'),
                new MenuItem('{it.author.fullName.eq(<value>)}', 'Authors full name equals value'),
            ]
        );
        this.taskPredicateItemsConfiguration = new MenuItemConfiguration(
            'Task predicates',
            'taskPredicate',
            ['<taskPredicate>'],
            this.editor,
            this,
            [
                new MenuItem('<taskPredicate>.and<taskPredicate>', '<b>Predicate</b> and <b>Predicate</b>'),
                new MenuItem('<taskPredicate>.or<taskPredicate>', '<b>Predicate</b> or <b>Predicate</b>'),
                new MenuItem('{it.id.eq(<value>)}', 'Task ID equals value'),
                new MenuItem('{it.transitionId.eq(<value>)}', 'TransitionId equals value'),
                new MenuItem('{it.caseId.eq(<value>)}', 'CaseId equals value'),
                new MenuItem('{it.caseTitle.eq(<value>)}', 'Case title equals value'),
            ]
        );
        this.editorConfigurations = [
            this.transitionItemsConfiguration,
            this.dataFieldItemsConfiguration,
            this.behaviourItemsConfiguration,
            this.typeItemsConfiguration,
            this.conditionItemsConfiguration,
            this.propertyItemsConfiguration,
            this.valueItemsConfiguration,
            this.dataSetItemsConfiguration,
            this.processInstanceIdItemsConfiguration,
            this.casePredicateItemsConfiguration,
            this.taskPredicateItemsConfiguration
        ];
    }

    private saveAction(value: string) {
        this.action.definition = value;
        this.action.changeType = ChangeType.EDITED;
        this.actionEditorService.saveActionChange(this.action);
    }

    deleteAction(index: number): void {
        const action = this.leafNode.removeAction(index);
        action.changeType = ChangeType.REMOVED;
        this.actionChanged.emit({
            action
        });
    }

    actionTransitionEventsChanged(index: number): void {
        const action = this.leafNode.removeAction(index);
        action.changeType = ChangeType.MOVED;
        this.actionChanged.emit({
            triggerPath: [action.event, action.phase],
            action
        });
    }

    actionDataEventsChanged(index: number): void {
        const action = this.leafNode.removeAction(index);
        action.changeType = ChangeType.MOVED;
        this.actionChanged.emit({
            triggerPath: [action.event],
            action
        });
    }

    setHeightOnClose(index: number, action: any): void {
        const element = document.getElementById(action.event + '_' + action.phase + '_' + index) as HTMLElement;
        element.style.height = 'auto';
    }

    onResizeEvent(event: any, name: string): void {
        const newHeight = event.rectangle.height < 370 ? 370 : event.rectangle.height;
        const element = document.getElementById(name);
        const headerSize = (element.childNodes[0] as HTMLElement).offsetHeight;
        const bottomSize = (element.childNodes[1].childNodes[1] as HTMLElement).offsetHeight;
        const div = document.getElementById(name + '_div');
        const editorObject = document.getElementById(name + '_editor');
        element.style.height = newHeight + 'px';
        const innerSize = newHeight - headerSize - bottomSize - 45;
        div.style.height = innerSize + 'px';
        editorObject.style.height = innerSize + 'px';
    }

    openDialog(index: number): void {
        const dialogRef = this.deleteDialog.open(DialogDeleteComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.deleteAction(index);
            }
        });
    }

    closeDrawer() {
        this.drawer.close();
        this.drawerOpened.emit(this.drawer.opened);
    }

    undo(): void {
        this.editor.trigger('undo', 'undo', undefined);
    }

    redo(): void {
        this.editor.trigger('redo', 'redo', undefined);
    }

    openReference() {
        this.trigger.openMenu();
        this.trigger.updatePosition();
    }

    closeReference() {
        this.referencesOpened = false;
    }

    openDrawer() {
        this.drawer.toggle();
        this.drawerOpened.emit(this.drawer.opened);
    }

    // monarch playground: https://microsoft.github.io/monaco-editor/monarch.html
    // monaco playground: https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-custom-languages
}
