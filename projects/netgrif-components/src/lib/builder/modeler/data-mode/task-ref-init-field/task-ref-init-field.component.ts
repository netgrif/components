import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {DataVariable, I18nWithDynamic, Transition} from '@netgrif/petriflow';
import {ModelService} from '../../services/model/model.service';

@Component({
  selector: 'nc-builder-task-ref-init-field',
  templateUrl: './task-ref-init-field.component.html',
  styleUrl: './task-ref-init-field.component.scss'
})
export class TaskRefInitFieldComponent {

    @Input() taskRef: DataVariable;
    taskRefFormControl: FormControl;
    @ViewChild('taskRefInput') taskRefInput: ElementRef<HTMLInputElement>;

    constructor(private _modelService: ModelService) {
        this.taskRefFormControl = new FormControl('');
    }

    removeInit(index: number): void {
        if (index >= 0) {
            this.taskRef.inits.splice(index, 1);
        }
    }

    addInit($event: MatChipInputEvent): void {
        this.taskRef.inits.push(new I18nWithDynamic($event.value));

        $event.chipInput!.clear();
        this.taskRefFormControl.setValue(null);
    }

    selectInit($event: MatAutocompleteSelectedEvent): void {
        this.taskRef.inits.push(new I18nWithDynamic($event.option.value));
        this.taskRefInput.nativeElement.value = '';
        this.taskRefFormControl.setValue(null);
    }

    get tasks(): Transition[] {
        return this._modelService.model.getTransitions().filter(t => {
            return !this.taskRef.inits.some(init => init.value === t.id);
        }).sort((t1, t2) => {
            if (!t1.label.value && !t2.label.value) {
                return t1.id > t2.id ? 1 : -1;
            }
            if (!t1.label.value) {
                return 1;
            }
            if (!t2.label.value) {
                return -1;
            }
            return t1.label.value.localeCompare(t2.label.value);
        });
    }

    prettyTask(taskId: string): string {
        const task = this._modelService.model.getTransition(taskId);
        if (task === undefined) {
            return taskId;
        }
        const taskTitle = task.label.value ? `${task.label.value} ` : '';
        return `${taskTitle} [${taskId}]`;
    }

    isReferenced(task: Transition): boolean {
        return task.dataGroups.some(group => !!group.getDataRef(this.taskRef.id));
    }
}
