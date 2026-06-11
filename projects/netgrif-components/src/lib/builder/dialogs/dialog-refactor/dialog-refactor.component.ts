import {Component, Inject} from '@angular/core';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Action, Event} from '@netgrif/petriflow';
import escapeStringRegexp from 'escape-string-regexp';
import {ModelService} from '../../modeler/services/model/model.service';

export interface DialogRefactorData {
    originalId: string;
}

@Component({
    selector: 'nc-builder-dialog-refactor',
    templateUrl: './dialog-refactor.component.html',
    styleUrls: ['./dialog-refactor.component.scss']
})
export class DialogRefactorComponent {

    formControl: FormControl;
    result: string;

    constructor(
        public dialogRef: MatDialogRef<DialogRefactorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogRefactorData,
        protected modelService: ModelService
    ) {
        this.formControl = new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9-_]+$'),
            this.validUnique()
        ]);
    }

    refactor() {
        if (this.formControl.valid) {
            this.result = this.formControl.value;
            this.fieldIdRefactor();
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    protected fieldIdRefactor() {
        const refactoredModel = this.modelService.model;
        const dataField = refactoredModel.getData(this.data.originalId);
        this.changedIfExist(dataField);
        refactoredModel.removeData(this.data.originalId);
        refactoredModel.addData(dataField);
        if (!refactoredModel.getPlace(this.data.originalId)) {
            const arc = refactoredModel.getArc(this.data.originalId);
            if (arc !== undefined) {
                arc.reference = this.formControl.value;
            }
        }
        refactoredModel.getArcs().forEach(arc => {
            if (arc.reference === this.data.originalId) {
                arc.reference = this.formControl.value;
            }
        });
        refactoredModel.getDataSet().forEach(data => {
            data.getEvents().forEach(event => {
                this.refactorEventActions(event);
            });
        });
        refactoredModel.getCaseEvents().forEach(event => {
            this.refactorEventActions(event);
        });
        refactoredModel.getProcessEvents().forEach(event => {
            this.refactorEventActions(event);
        });
        const processUserRef = refactoredModel.getUserRef(this.data.originalId);
        if (processUserRef) {
            refactoredModel.removeUserRef(this.data.originalId);
            processUserRef.id = this.formControl.value;
            refactoredModel.addUserRef(processUserRef);
        }

        refactoredModel.getTransitions().forEach(trans => {
            trans.dataGroups.forEach(group => {
                const oldDataRef = group.getDataRef(this.data.originalId);
                if (oldDataRef) {
                    group.removeDataRef(this.data.originalId);
                    oldDataRef.id = this.formControl.value;
                    group.addDataRef(oldDataRef);
                }
                group.getDataRefs().forEach(d => d.getEvents().forEach(event => {
                    this.refactorEventActions(event);
                }));
            });
            trans.eventSource.getEvents().forEach(event => {
                this.refactorEventActions(event);
            });
            trans.userRefs.forEach(ref => {
                if (ref.id === this.data.originalId) {
                    ref.id = this.formControl.value;
                }
            });
        });
        this.changedIfExist(refactoredModel.getUserRef(this.data.originalId));
        this.dialogRef.close();
    }

    private refactorEventActions(event: Event<any>) {
        event.preActions.forEach(action => this.actionDefRefactor(action, 'f'));
        event.postActions.forEach(action => this.actionDefRefactor(action, 'f'));
    }

    protected changedIfExist(data) {
        if (data) {
            data.id = this.formControl.value;
        }
    }

    protected actionDefRefactor(action: Action, type: string) {
        action.definition = action.definition.replace(new RegExp(`(${type}\.)(${escapeStringRegexp(this.data.originalId)})([,;])`, 'g'), `$1${this.formControl.value}$3`);
    }

    private validUnique(): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => {
            if (this.modelService.model.getData(fc.value) !== undefined) {
                return ({validUnique: true});
            } else {
                return null;
            }
        };
    }
}
