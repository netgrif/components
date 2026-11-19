import {Component, ElementRef, Inject, Input, Optional, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {AbstractBaseDataFieldComponent} from '../base-component/abstract-base-data-field.component';
import {FileField, FileUploadMIMEType} from '../file-field/models/file-field';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from './data-field-portal-data-injection-token';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {FileListField} from '../file-list-field/models/file-list-field';

@Component({
    selector: 'ncc-abstract-file-field-default-component',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractFileFieldDefaultComponent<T extends FileField | FileListField> extends AbstractBaseDataFieldComponent<T> {

    private labelWidth: number;
    public cutProperty: string;
    /**
     * Task mongo string id is binding property from parent component.
     */
    @Input() public taskId: string;
    /**
     * File picker element reference from component template that is initialized after view init.
     */
    @ViewChild('fileUploadInput') public fileUploadEl: ElementRef<HTMLInputElement>;

    protected constructor(protected _log: LoggerService,
                          protected _snackbar: SnackBarService,
                          protected _translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<T>) {
        super(dataFieldPortalData);
    }

    protected checkAllowedTypes(): boolean {
        const files = this.fileUploadEl?.nativeElement?.files;
        let bool: boolean = true;
        for (let i = 0; i < files?.length; i++) {
            if (!this.checkTypes(files.item(i).type)) {
                this._log.error('File ' + files.item(i).name + ' cannot be uploaded. Its type is not allowed');
                this._snackbar.openErrorSnackBar(this._translate.instant('dataField.file.notAllowed', {fileName: files.item(i).name}));
                bool = false;
            }
        }
        if (!bool) {
            this.fileUploadEl.nativeElement.value = '';
        }
        return bool;
    }

    protected checkTypes(itemType: string) {
        if (this.dataField.allowTypes === undefined || this.dataField.allowTypes === null) {
            this._log.debug(`Types are not provided, returning true`);
            return true;
        }
        const type = itemType.includes("/") ? itemType.split("/")[1] : itemType;
        if (this.dataField.allowTypes.includes(type)) {
            return true;
        }
        if (this.dataField.allowTypes.includes(FileUploadMIMEType.IMAGE) && itemType.includes("image/")) {
            return true;
        }
        if (this.dataField.allowTypes.includes(FileUploadMIMEType.VIDEO) && itemType.includes("video/")) {
            return true;
        }
        if (this.dataField.allowTypes.includes(FileUploadMIMEType.AUDIO) && itemType.includes("audio/")) {
            return true;
        }
        return false;
    }

    /** @deprecated the M3 templates truncate the texts with CSS (ellipsis) */
    public getCutProperty(label): string {
        if (this.labelWidth !== label.offsetWidth) {
            this.labelWidth = label.offsetWidth;
            const calculatedWidth = 'calc(0.5em + ' + label.offsetWidth / 4 * 3 + 'px)';
            this.cutProperty = `polygon(0 0, 0 100%, 100% 100%, 100% 0%, ${calculatedWidth} 0, ${calculatedWidth} 3px, 0.5em 3px, 0.5em 0)`;
        }
        return this.cutProperty;
    }

    /** a file is dragged over the field (the drop area is highlighted) */
    public dragOver = false;

    /**
     * Uploads the files of the file picker (also the dropped ones). The single file and the file list field implement
     * it; not abstract, so the classes of the applications extending this one keep compiling.
     */
    public upload(): void {
    }

    /** files can be dropped / picked: the field is editable and nothing is being uploaded */
    public get canUpload(): boolean {
        return !!this.formControlRef && !this.formControlRef.disabled && !this.isUploading();
    }

    /** an upload of the field is running (a dropped file must not start another one) */
    protected isUploading(): boolean {
        return false;
    }

    public onDragOver(event: DragEvent): void {
        if (!this.canUpload || !event.dataTransfer?.types?.includes('Files')) {
            return;
        }
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        this.dragOver = true;
    }

    public onDragLeave(event: DragEvent): void {
        const related = event.relatedTarget as Node | null;
        if (related && (event.currentTarget as HTMLElement)?.contains(related)) {
            return;
        }
        this.dragOver = false;
    }

    /** dropped files are uploaded the same way as the files of the file picker */
    public onDrop(event: DragEvent, multiple = false): void {
        this.dragOver = false;
        if (!this.canUpload || !event.dataTransfer?.files?.length) {
            return;
        }
        event.preventDefault();
        const transfer = new DataTransfer();
        Array.from(event.dataTransfer.files).slice(0, multiple ? undefined : 1).forEach(file => transfer.items.add(file));
        this.fileUploadEl.nativeElement.files = transfer.files;
        this.upload();
    }

    /** Material Symbols icon of a file by its extension */
    public fileIcon(fileName: string | undefined): string {
        const extension = (fileName ?? '').split('.').pop()?.toLowerCase() ?? '';
        if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp'].includes(extension)) {
            return 'image';
        }
        if (extension === 'pdf') {
            return 'picture_as_pdf';
        }
        if (['mp4', 'avi', 'mov', 'mkv', 'webm'].includes(extension)) {
            return 'movie';
        }
        if (['mp3', 'wav', 'ogg', 'flac'].includes(extension)) {
            return 'audio_file';
        }
        if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
            return 'folder_zip';
        }
        return 'description';
    }

    /** supporting text of the drop area: allowed types and the maximal size */
    public get uploadRestrictions(): string {
        const parts: Array<string> = [];
        if (this.dataField?.allowTypes) {
            parts.push(String(this.dataField.allowTypes).split(',').map(type => type.trim()).filter(type => type).join(', '));
        }
        if (this.dataField?.maxUploadSizeInBytes) {
            const megabytes = this.dataField.maxUploadSizeInBytes / (1024 * 1024);
            parts.push(this._translate.instant('dataField.file.maxSize', {size: megabytes >= 1 ? `${Math.round(megabytes * 10) / 10} MB`
                    : `${Math.round(this.dataField.maxUploadSizeInBytes / 1024)} kB`}));
        }
        return parts.join(' · ');
    }

    /** supporting text under the field: the description and, when files can be added, the upload restrictions */
    public supportingText(withRestrictions = true): string {
        const restrictions = withRestrictions && this.canUpload ? this.uploadRestrictions : '';
        return [this.hasHint() ? this.dataField.description : '', restrictions].filter(text => !!text).join(' · ');
    }

    protected resolveParentTaskId(): string {
        return !!this.dataField.parentTaskId ? this.dataField.parentTaskId : this.taskId;
    }

    protected resolveMaxSizeMessage() {
        if (this.dataField?.component?.properties?.maxSizeMessage) {
            this._snackbar.openErrorSnackBar(this._translate.instant(this.dataField?.component?.properties?.maxSizeMessage));
        } else {
            this._snackbar.openErrorSnackBar(
                this._translate.instant('dataField.snackBar.maxFilesSizeExceeded') + this.dataField.maxUploadSizeInBytes * 0.000001 + 'MB'
            );
        }
    }
}
