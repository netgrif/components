import {Component, Inject} from '@angular/core';
import {FormArray, FormControl, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DataSet {
    dataSet: Map<string, number>;
}

export interface Data {
    id: string,
    value: number
}

@Component({
    selector: 'nc-builder-dialog-change-data',
    templateUrl: './dialog-change-data.component.html',
    styleUrls: ['./dialog-change-data.component.scss']
})
export class DialogChangeDataComponent {

    public dataSet: Array<Data>;
    public formArray: FormArray;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DataSet,
    ) {
        this.dataSet = new Array<Data>();
        this.formArray = new FormArray([]);

        data.dataSet.forEach((value, id) => {
            this.dataSet.push({id, value});
            const valueCtrl = new FormControl(value, [
            Validators.required,
            this.validValue()
        ]);
            this.formArray.push(valueCtrl);
        });
    }

    private validValue(): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => {
            const value = Math.floor(fc.value as number);
            if (isFinite(value) && value === fc.value as number && value >= 0) {
                return null;
            }
            return ({validMultiplicity: true})
        };
    }

    public getControl(index: number): FormControl {
        return this.formArray.at(index) as FormControl;
    }

    public onSave(): Array<Data> {
        return this.dataSet.map((item, index) => ({
            id: item.id,
            value: this.formArray.at(index).value
        }));
    }
}
