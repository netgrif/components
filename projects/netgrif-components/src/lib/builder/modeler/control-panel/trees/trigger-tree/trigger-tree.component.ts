import {NGX_MAT_DATE_FORMATS} from '@angular-material-components/datetime-picker';
import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, Input} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {DATE_TIME_FORMAT} from '@netgrif/components-core';
import {Trigger, TriggerType} from '@netgrif/petriflow';

interface TriggerNode {
    name?: string;
    trigger?: Array<TriggerNode>;
    type?: string;
    option?: string;
    exact?: Date;
    delay?: string;
}

@Component({
    selector: 'nc-builder-trigger-tree',
    templateUrl: './trigger-tree.component.html',
    styleUrls: ['./trigger-tree.component.scss'],
    providers: [
        {provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ]
})
export class TriggerTreeComponent {
    @Input() triggers: Array<Trigger>;

    typeOptions = [{key: 'auto', value: 'Auto'}, {key: 'user', value: 'User'}, {key: 'time', value: 'Time'}];
    optionOptions = [{key: 'exact', value: 'Exact'}, {key: 'delay', value: 'Delay'}];
    treeData: Array<TriggerNode>;
    counter: number;
    treeControl = new NestedTreeControl<TriggerNode>(node => node.trigger);
    dataSource = new MatTreeNestedDataSource<TriggerNode>();

    constructor() {
        this.treeData = [{
            name: 'Triggers',
            trigger: []
        }];
        this.dataSource.data = this.treeData;
        this.counter = 0;
    }

    import(): void {
        this.counter = 0;
        const tree = [{
            name: 'Triggers',
            trigger: []
        }];
        this.dataSource.data = tree;
        this.triggers.forEach(item => {
            const newNode = {
                name: this.createId(),
                trigger: [{
                    type: item.type,
                    option: item.delay === undefined ? 'exact' : 'delay',
                    exact: item.exact,
                    delay: item.delay,
                }]
            };
            tree[0].trigger.push(newNode as TriggerNode);
        });
        this.dataSource.data = tree;
        this.refreshTree();
        this.treeControl.expand(tree[0]);
    }

    private createId() {
        this.counter++;
        if (this.dataSource.data[0].trigger.find(item => item.name === 'Trigger_' + this.counter)) {
            return this.createId();
        } else {
            return 'Trigger_' + String(this.counter);
        }
    }

    hasChildAndNotRoot = (_: number, node: TriggerNode) => !!node.trigger && node.trigger.length > 0 && node.name !== 'Triggers';

    isRoot = (_: number, node: TriggerNode) => node.name === 'Triggers';

    refreshTree() {
        const _data = this.dataSource.data;
        this.dataSource.data = null;
        this.dataSource.data = _data;
    }

    emitChanges() {
        this.triggers.length = 0;
        this.dataSource.data[0].trigger.forEach(item => {
            const trigger = new Trigger();
            trigger.type = item.trigger[0].type as TriggerType;
            trigger.exact = item.trigger[0].exact;
            trigger.delay = item.trigger[0].delay;
            this.triggers.push(trigger);
        });
    }

    addNewItem(node: TriggerNode) {
        if (!node.trigger) {
            node.trigger = [];
        }
        const today = new Date();
        today.setHours(12, 0, 0);
        const newNode = {
            name: this.createId(),
            trigger: [{
                type: 'auto',
                option: 'exact',
                exact: today,
                delay: undefined
            }]
        };
        node.trigger.push(newNode as TriggerNode);
        this.refreshTree();
        this.emitChanges();
        this.treeControl.expand(node);
        this.treeControl.expand(newNode);
    }

    removeItem(node: TriggerNode) {
        const ind = this.dataSource.data[0].trigger.indexOf(node);
        this.dataSource.data[0].trigger.splice(ind, 1);
        this.refreshTree();
        this.emitChanges();
    }

    makeChangeOption($event, node) {
        if ($event.value === 'exact') {
            const today = new Date();
            today.setHours(12, 0, 0);
            node.exact = today;
            node.delay = undefined;
        } else if ($event.value === 'delay') {
            node.delay = '';
            node.exact = undefined;
        }
        this.emitChanges();
    }
}
