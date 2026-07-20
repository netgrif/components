import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatSidenav} from '@angular/material/sidenav';
import {PetriflowFunction} from '@netgrif/petriflow';
import {ModelService} from '../../../services/model/model.service';
import {MenuItem} from '../action-editor-menu/action-editor-menu-item/menu-item';
import {MenuItemConfiguration} from '../action-editor-menu/action-editor-menu-item/menu-item-configuration';
import {ActionEditorService} from '../action-editor.service';
import {actions} from '../classes/command-action';

@Component({
    selector: 'nc-builder-function-editor',
    templateUrl: './function-editor.component.html',
    styleUrls: ['./function-editor.component.scss']
})
export class FunctionEditorComponent implements OnInit {

    @Output() public actionChanged: EventEmitter<string>;
    @Output() public drawerOpened: EventEmitter<boolean>;
    @ViewChild('drawer') private drawer: MatSidenav;
    @ViewChild('matButton') private button: MatButton;
    @ViewChild('referencesTrigger') trigger: MatMenuTrigger;
    private _fn: PetriflowFunction;

    public editor: any;
    public formControl: FormControl;
    public referencesOpened = true;
    public transitionItemsConfiguration: MenuItemConfiguration;
    public dataFieldItemsConfiguration: MenuItemConfiguration;
    public behaviourItemsConfiguration: MenuItemConfiguration;
    public conditionItemsConfiguration: MenuItemConfiguration;
    public propertyItemsConfiguration: MenuItemConfiguration;
    public valueItemsConfiguration: MenuItemConfiguration;

    public editorConfigurations: Array<MenuItemConfiguration>;

    constructor(
        private actionEditorService: ActionEditorService,
        private modelService: ModelService
    ) {
        this.formControl = new FormControl(undefined, {updateOn: 'blur'});
        this.actionChanged = new EventEmitter<string>();
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

    get fn(): PetriflowFunction {
        return this._fn;
    }

    @Input()
    set fn(value: PetriflowFunction) {
        this._fn = value;
        this.formControl.setValue(this._fn.definition);
    }

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
    }

    ngOnInit(): void {
        this.formControl.setValue(this._fn.definition);
        this.formControl.valueChanges.subscribe(value => {
            this.saveAction(value);
        });
        this.transitionItemsConfiguration = new MenuItemConfiguration(
            'Transitions',
            'transition',
            ['<transition>', '<transitionId>'],
            this.editor,
            this,
            this.modelService.model.getTransitions().map(t => new MenuItem(t.id, `<b>${t.id}</b> ${t.label?.value}`))
        );
        this.dataFieldItemsConfiguration = new MenuItemConfiguration(
            'Datafields',
            'datafield',
            ['<datafield>'],
            this.editor,
            this,
            this.modelService.model.getDataSet().map(f => new MenuItem(f.id, `<b>${f.id}</b> ${f.title?.value}`))
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
                new MenuItem('', 'Add new variable or value'),
                new MenuItem('[a,b,c]', 'List of objects'),
                new MenuItem('[a:a,b:b]', 'Map of objects'),
                new MenuItem('["a","b","c"]', 'List of strings'),
                new MenuItem('["a":"a","b":"b"]', 'Map of strings')
            ]
        );
        this.editorConfigurations = [];
        this.editorConfigurations.push(this.transitionItemsConfiguration, this.dataFieldItemsConfiguration, this.behaviourItemsConfiguration,
            this.conditionItemsConfiguration, this.propertyItemsConfiguration, this.valueItemsConfiguration);
    }

    private saveAction(value: string) {
        this._fn.definition = value;
        this.actionChanged.emit(value);
        actions[actions.length - 1].actions = this.modelService.model.functions.map(fn => {
            return {
                label: fn.name,
                action: `${fn.name}()`,
            };
        });
    }

    setHeightOnClose(index: number, action: any): void {
        const element = document.getElementById(action.event + '_' + action.phase + '_' + index) as HTMLElement;
        element.style.height = 'auto';
    }

    openReference() {
        this.trigger.openMenu();
        this.trigger.updatePosition();
    }

    closeReference() {
        this.referencesOpened = false;
    }

    closeDrawer() {
        this.drawer.close();
        this.drawerOpened.emit(this.drawer.opened);
    }

    openDrawer() {
        this.drawer.toggle();
        this.drawerOpened.emit(this.drawer.opened);
    }
}
