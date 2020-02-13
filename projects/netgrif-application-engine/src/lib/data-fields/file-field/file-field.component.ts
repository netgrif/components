import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FileField, FileUploadModel} from "./file-field";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FileUploadService} from "./file-upload.service";
import {FileDownloadService} from "./file-download.service";

@Component({
    selector: 'nae-file-field',
    templateUrl: './file-field.component.html',
    styleUrls: ['./file-field.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('in', style({opacity: 100})),
            transition('* => void', [
                animate(300, style({opacity: 0}))
            ])
        ])
    ]
})
export class FileFieldComponent implements OnInit{

    public multiple: string;
    public allFiles: Array<FileUploadModel> = [];

    @Input() public fileField: FileField;
    @ViewChild('fileList') public fileListEl: ElementRef;
    @ViewChild('fileUploadInput') public fileUploadEl: ElementRef<HTMLInputElement>;

    constructor(private _fileUploadService: FileUploadService,
                private _fileDownloadService: FileDownloadService) {
    }

    ngOnInit() {
        this.multiple = this.fileField.maxUploadFiles > 1 ? 'multiple' : undefined;
    }

    public onFileUpload() {
        this.fileUploadEl.nativeElement.onchange = () => {
            if ((this.allFiles.length + this.fileUploadEl.nativeElement.files.length) > this.fileField.maxUploadFiles) {
                //TODO: 'You choose more files as you allowed' - snackbar warning
                console.log('You choose more files as you allowed!');
                return;
            }
            Array.from(this.fileUploadEl.nativeElement.files).forEach(file => {
                const fileUploadModel = {
                    data: file, state: 'in',
                    inProgress: false, progress: 0,
                    canRetry: false, canCancel: true,
                    successfullyUploaded: false
                };
                if (this.maxUploadSizeControl(fileUploadModel)) {
                    return;
                }
                this.allFiles.push(fileUploadModel);
                if (this.allFiles.length > this.fileField.maxShowListFiles) {
                    this.fileListEl.nativeElement.style.height = this.fileField.maxShowListFiles * 23 + 'px';
                }
                this._fileUploadService.uploadFile(fileUploadModel)
            });

            this.fileUploadEl.nativeElement.value = '';

        };

        this.fileUploadEl.nativeElement.click();
    }

    public cancelFile(file: FileUploadModel) {
        file.sub.unsubscribe();
        this.removeFileFromArray(file);
    }

    public retryFile(file: FileUploadModel) {
        file.canRetry = false;
        file.successfullyUploaded = false;
        this._fileUploadService.uploadFile(file)
    }

    public onFileDownload(file: FileUploadModel) {
        if (!file.successfullyUploaded)
            return;
        this._fileDownloadService.downloadFile(file);
    }

    public shortFileName(file: FileUploadModel) {
        return file.data.name.length > 15 ? file.data.name.slice(0, 15) + '...' + file.data.type : file.data.name;
    }

    private removeFileFromArray(file: FileUploadModel) {
        const index = this.allFiles.indexOf(file);
        if (index > -1) {
            this.allFiles.splice(index, 1);
        }
    }

    private maxUploadSizeControl(file: FileUploadModel) {
        if (this.fileField.maxUploadSizeInBytes && this.fileField.filesSize <= this.fileField.maxUploadSizeInBytes) {
            this.fileField.filesSize += file.data.size;
            return false;
        } else if (!this.fileField.maxUploadSizeInBytes) {
            return false;
        } else {
            //TODO: max upload size overflow - snackbar warning
            console.log('File size exceeded allowed limit');
            return true;
        }
    }

}

