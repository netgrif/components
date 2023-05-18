import {InjectionToken} from "@angular/core";
import {DataField} from "./abstract-data-field";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../data-field-template/models/wrapped-boolean";

export interface DataFieldPortalData<T extends DataField<unknown>> {
    dataField: T;
    showLargeLayout: WrappedBoolean;
    formControlRef: FormControl;
}

export const DATA_FIELD_PORTAL_DATA = new InjectionToken<DataFieldPortalData<DataField<unknown>>>('NaeData');
