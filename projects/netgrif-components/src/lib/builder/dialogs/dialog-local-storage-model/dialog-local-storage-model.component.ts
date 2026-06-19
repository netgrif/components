import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
    id: string;
    timestamp: string;
    title: string;
}

@Component({
    selector: 'nc-builder-dialog-local-storage-model',
    templateUrl: './dialog-local-storage-model.component.html',
    styleUrls: ['./dialog-local-storage-model.component.scss']
})
export class DialogLocalStorageModelComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }

}
