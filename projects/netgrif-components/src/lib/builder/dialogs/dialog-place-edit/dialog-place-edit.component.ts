import {Component, Inject} from '@angular/core';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PlaceChange} from '../../modeler/history-mode/model/place/place-change';
import {ModelService} from '../../modeler/services/model/model.service';

export interface PlaceEditData {
    placeId: string;
}

@Component({
    selector: 'nc-builder-dialog-place-edit',
    templateUrl: './dialog-place-edit.component.html',
    styleUrls: ['./dialog-place-edit.component.scss']
})
export class DialogPlaceEditComponent {

    public place: PlaceChange;
    public idCtrl: FormControl;
    public markingCtrl: FormControl;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: PlaceEditData,
        public modelService: ModelService
    ) {
        const modelPlace = this.modelService.model.getPlace(data.placeId);
        this.place = new PlaceChange(modelPlace.clone(), modelPlace.clone(), undefined);
        this.idCtrl = new FormControl('', [
            Validators.required,
            this.validUnique()
        ]);
        this.markingCtrl = new FormControl('', [
            Validators.required,
            this.validMarking()
        ]);
    }

    private validUnique(): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => {
            if (this.modelService.model.getPlace(fc.value) !== undefined && fc.value !== this.place.originalPlace.id) {
                return ({validUnique: true});
            } else {
                return null;
            }
        };
    }

    private validMarking(): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => {
            const marking = Math.floor(fc.value as number);
            if (marking !== Infinity && marking === fc.value as number && marking >= 0) {
                return null;
            }
            return ({validMarking: true})
        };
    }
}
