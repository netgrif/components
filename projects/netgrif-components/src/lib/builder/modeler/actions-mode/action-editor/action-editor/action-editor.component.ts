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
import {TranslateService} from "@ngx-translate/core";

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
        private deleteDialog: MatDialog,
        private _translateService: TranslateService
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
            this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.transitions'),
            'transition',
            ['<transition>', '<transitionId>', '<task>'],
            this.editor,
            this,
            this.modelService.model.getTransitions().map(t => new MenuItem(t.id, `${t.label?.value} [${t.id}]`))
        );
        this.dataFieldItemsConfiguration = new MenuItemConfiguration(
            this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.dataFields'),
            'datafield',
            // TODO: NAB-326 choicefield, optionfield = different menu items
            ['<datafield>', '<datafieldId>'],
            this.editor,
            this,
            this.modelService.model.getDataSet().map(f => new MenuItem(f.id, `${f.title?.value} [${f.id}]`))
        );
        this.behaviourItemsConfiguration = new MenuItemConfiguration(
            this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.behaviours'),
            'behaviour',
            ['<behaviour>'],
            this.editor,
            this,
            [
                new MenuItem('visible', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.visible')),
                new MenuItem('hidden', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.hidden')),
                new MenuItem('editable', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.editable')),
                new MenuItem('required', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.required')),
                new MenuItem('optional', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.optional'))
            ]
        );
        this.conditionItemsConfiguration = new MenuItemConfiguration(
            this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.conditions'),
            'condition',
            ['<condition>'],
            this.editor,
            this,
            [
                new MenuItem('true', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.true')),
                new MenuItem('false', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.false')),
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
            this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.properties'),
            'property',
            ['<property>'],
            this.editor,
            this,
            [
                new MenuItem('"title"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.title')),
                new MenuItem('"color"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.color')),
                new MenuItem('"icon"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.icon')),
            ]
        );
        this.valueItemsConfiguration = new MenuItemConfiguration(
            this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.values'),
            'value',
            ['<value>', '<choices>', '<options>'],
            this.editor,
            this,
            [
                new MenuItem('<datafield>.value', '&lt;datafield&gt;.value'),
                new MenuItem('<datafield>.choices', '&lt;datafield&gt;.choices'),
                new MenuItem('<datafield>.options', '&lt;datafield&gt;.options'),
                new MenuItem('true', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.true')),
                new MenuItem('false', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.false')),
                new MenuItem(' ', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.emptyValue')),
                new MenuItem('', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.newVariableOrValue')),
                new MenuItem('[a,b,c]', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.listOfObjects')),
                new MenuItem('[a:a,b:b]', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.mapOfObjects')),
                new MenuItem('["a","b","c"]', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.listOfStrings')),
                new MenuItem('["a":"a","b":"b"]', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.mapOfStrings'))
            ]
        );
        this.typeItemsConfiguration = new MenuItemConfiguration(
            this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.types'),
            'types',
            ['<type>'],
            this.editor,
            this,
            [
                new MenuItem('"text"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.text')),
                new MenuItem('"number"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.number')),
                new MenuItem('"date"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.date')),
                new MenuItem('"boolean"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.boolean')),
                new MenuItem('"file"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.file')),
                new MenuItem('"fileList"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.fileList')),
                new MenuItem('"enumeration"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.enumeration')),
                new MenuItem('"enumeration_map"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.enumeration_map')),
                new MenuItem('"multichoice"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.multichoice')),
                new MenuItem('"multichoice_map"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.multichoice_map')),
                new MenuItem('"userList"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.userList')),
                new MenuItem('"tabular"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.tabular')),
                new MenuItem('"caseRef"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.caseRef')),
                new MenuItem('"dateTime"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.dateTime')),
                new MenuItem('"button"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.button')),
                new MenuItem('"taskRef"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.taskRef')),
                new MenuItem('"filter"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.filter')),
                new MenuItem('"i18n"', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.i18n'))
            ]
        );
        this.dataSetItemsConfiguration = new MenuItemConfiguration(
            this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.dataSet'),
            'dataSet',
            ['<dataSet>'],
            this.editor,
            this,
            [
                new MenuItem('[<datafieldId>: ["value": <value>,"type": <type>]]', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.oneDataInSet')),
                new MenuItem('[<datafieldId>: ["value": <value>,"type": <type>],\n \t\t\t   <datafieldId>: ["value": <value>,"type": <type>]]', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.twoDataInSet')),
            ]
        );
        this.processInstanceIdItemsConfiguration = new MenuItemConfiguration(
            this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.processInstanceId'),
            'processInstanceId',
            ['<processInstanceId>'],
            this.editor,
            this,
            [
                new MenuItem(' //Process instance ID can be found in your NAE app', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.processInstanceId')),
            ]
        );
        this.casePredicateItemsConfiguration = new MenuItemConfiguration(
            this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.casePredicates'),
            'casePredicate',
            ['<casePredicate>'],
            this.editor,
            this,
            [
                new MenuItem('<casePredicate>.and<casePredicate>', '<b>Predicate</b> and <b>Predicate</b>'),
                new MenuItem('<casePredicate>.or<casePredicate>', '<b>Predicate</b> or <b>Predicate</b>'),
                new MenuItem('{it.id.eq(<value>)}', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.caseIdEqualsValue')),
                new MenuItem('{it.visualId.eq(<value>)}', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.caseVisualIdEqualsValue')),
                new MenuItem('{it.processIdentifier.eq(<processInstanceId>)}', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.processIdentifierEqualsValue')),
                new MenuItem('{it.title.eq(<value>)}', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.titleEqualsValue')),
                new MenuItem('{it.author.email.eq(<value>)}', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.authorsEmailEqualsValue')),
                new MenuItem('{it.author.id.eq(<value>)}', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.authorsIdEqualsValue')),
                new MenuItem('{it.author.fullName.eq(<value>)}', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.authorsFullNameEqualsValue')),
            ]
        );
        this.taskPredicateItemsConfiguration = new MenuItemConfiguration(
            this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.taskPredicates'),
            'taskPredicate',
            ['<taskPredicate>'],
            this.editor,
            this,
            [
                new MenuItem('<taskPredicate>.and<taskPredicate>', '<b>Predicate</b> and <b>Predicate</b>'),
                new MenuItem('<taskPredicate>.or<taskPredicate>', '<b>Predicate</b> or <b>Predicate</b>'),
                new MenuItem('{it.id.eq(<value>)}', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.taskIdEqualsValue')),
                new MenuItem('{it.transitionId.eq(<value>)}', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.transitionIdEqualsValue')),
                new MenuItem('{it.caseId.eq(<value>)}', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.caseIdEqualsValue2')),
                new MenuItem('{it.caseTitle.eq(<value>)}', this._translateService.instant('builder.modeler.actions-node.action-editor.action-editor.caseTitleEqualsValue')),
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
