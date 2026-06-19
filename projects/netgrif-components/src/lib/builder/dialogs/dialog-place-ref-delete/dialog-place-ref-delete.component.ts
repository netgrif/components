import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Arc} from '@netgrif/petriflow';
import {CanvasPlace} from '../../modeler/edit-mode/domain/canvas-place';

export interface PlaceRefDeleteData {
    place: CanvasPlace;
    arcs: Array<Arc<any, any>>;
}

@Component({
    selector: 'nc-builder-dialog-place-ref-delete',
    templateUrl: './dialog-place-ref-delete.component.html',
    styleUrls: ['./dialog-place-ref-delete.component.scss']
})
export class DialogPlaceRefDeleteComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: Array<PlaceRefDeleteData>) {
    }

    public placeLabel(data: PlaceRefDeleteData): string {
        return data.place.modelPlace.label.value;
    }

    public arcs(data: PlaceRefDeleteData): string {
        return data.arcs.map(arc => arc.id).join(', ');
    }
}
