import {Component, Inject} from '@angular/core';
import {AbstractDialog} from "../abstract-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
    selector: 'nae-simple-dialog',
    templateUrl: './simple-dialog.component.html',
    styleUrls: ['./simple-dialog.component.scss']
})
export class SimpleDialogComponent extends AbstractDialog<SimpleDialogComponent> {

    constructor(public dialogRef: MatDialogRef<SimpleDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        super(dialogRef, data);
    }

}
