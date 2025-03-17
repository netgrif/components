import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FilePreviewType, PreviewDialogData} from '@netgrif/components-core';
import {SafeUrl} from '@angular/platform-browser';


@Component({
    selector: 'nc-preview-dialog',
    templateUrl: './preview-dialog.component.html',
    styleUrls: ['./preview-dialog.component.scss'],
    standalone: false
})
export class PreviewDialogComponent {
    image: SafeUrl;

    constructor(@Inject(MAT_DIALOG_DATA) public data: PreviewDialogData) {
        data.imageFull.subscribe(imageSource => {
            this.image = imageSource;
        });
    }

    fullImageExists(): boolean {
        return !!this.image;
    }

    isPdf(): boolean {
        return this.data.extension === FilePreviewType.pdf;
    }
}
