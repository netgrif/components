import {Component, ElementRef, Inject, Input, Optional, ViewChild} from '@angular/core';
import {AbstractBaseDataFieldComponent} from '../base-component/abstract-base-data-field.component';
import {FileField, FileUploadMIMEType} from '../file-field/models/file-field';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from './data-field-portal-data-injection-token';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {FileListField} from '../file-list-field/models/file-list-field';

@Component({
    selector: 'ncc-abstract-file-field-default-component',
    template: ''
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

    public getCutProperty(label): string {
        if (this.labelWidth !== label.offsetWidth) {
            this.labelWidth = label.offsetWidth;
            const calculatedWidth = 'calc(0.5em + ' + label.offsetWidth / 4 * 3 + 'px)';
            this.cutProperty = `polygon(0 0, 0 100%, 100% 100%, 100% 0%, ${calculatedWidth} 0, ${calculatedWidth} 3px, 0.5em 3px, 0.5em 0)`;
        }
        return this.cutProperty;
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
