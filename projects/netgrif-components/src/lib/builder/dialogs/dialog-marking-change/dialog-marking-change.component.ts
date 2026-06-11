import {Component, Inject} from '@angular/core';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Place} from '@netgrif/petriflow';
import {CanvasNodeElement} from '../../modeler/edit-mode/domain/canvas-node-element';
import {SimulationModeService} from '../../modeler/simulation-mode/simulation-mode.service';
import {PlaceEditData} from '../dialog-place-edit/dialog-place-edit.component';

@Component({
    selector: 'nc-builder-dialog-marking-change',
    templateUrl: './dialog-marking-change.component.html',
    styleUrl: './dialog-marking-change.component.scss'
})
export class DialogMarkingChangeComponent {

    public markingCtrl: FormControl;
    public place: Place;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: PlaceEditData,
        public simulationService: SimulationModeService
    ) {
        this.place = this.simulationService.model.getPlace(data.placeId);
        this.markingCtrl = new FormControl('', [
            Validators.required,
            this.validValue()
        ]);
    }

    private validValue(): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => {
            const value = Math.floor(fc.value as number);
            if (value !== Infinity && value === fc.value as number && value >= 0) {
                return null;
            }
            return ({validMultiplicity: true})
        };
    }

    protected readonly CanvasNodeElement = CanvasNodeElement;
}
