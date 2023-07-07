import {DataField} from './abstract-data-field';
import {FormControl} from '@angular/forms';
import {Component, HostListener, Inject, Input, OnDestroy, OnInit, Optional} from '@angular/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from './invalid-data-policy-token';
import {NAE_SAVE_DATA_INFORM} from './save-data-inform-token';

/**
 * Holds the common functionality for all DataFieldComponents.
 */
@Component({
    selector: 'ncc-abstract-datafield',
    template: ''
})
export abstract class AbstractDataFieldComponent implements OnInit, OnDestroy {

    /**
     * The Model object that this Component should render.
     * It should be overridden in each class that extends this one, to provide a more specific type.
     */
    @Input() dataField: DataField<any>;
    @Input() taskOffset = 0;
    /**
     * @ignore
     * See [formControl]{@link AbstractDataFieldComponent#formControl}
     */
    protected _formControl: FormControl;

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadEventHandler(event) {
        if (this._saveDataInform && this.dataField.isFocused()) {
            this.dataField.unsetFocus();
            (document.activeElement as HTMLElement).blur();
            return false;
        }
        return true;
    }

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) protected _informAboutInvalidData: boolean | null,
                          @Optional() @Inject(NAE_SAVE_DATA_INFORM) protected _saveDataInform: boolean | null = false) {
        this._formControl = new FormControl('', {updateOn: 'blur'});
    }

    /**
     * Registers the {@link FormControl} to the provided data field.
     *
     * See [DataField.registerFormControl]{@link DataField#registerFormControl} form more information.
     */
    ngOnInit(): void {
        this.dataField.registerFormControl(this._formControl);
        this.dataField.sendInvalidValues = this._informAboutInvalidData;
    }

    ngOnDestroy(): void {
        this.dataField.disconnectFormControl();
    }

    /**
     * The [FormControl]{@link https://angular.io/api/forms/FormControl} object that should be used to control any rendered forms.
     */
    public get formControl(): FormControl {
        return this._formControl;
    }
}
