import {Component, Input, OnInit} from '@angular/core';
import {FieldsGroup} from '../../models/fields-group';
import {HeaderState} from '../../header-state';
import {AbstractHeaderService} from '../../abstract-header-service';
import {DataDescription} from '../../models/data-description';

@Component({
    selector: 'nae-edit-mode',
    templateUrl: './edit-mode.component.html',
    styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent implements OnInit {

    public fieldsGroup: Array<FieldsGroup>;
    public headers: HeaderState;
    @Input()
    public headerService: AbstractHeaderService;

    constructor() {
    }

    ngOnInit(): void {
        this.headers = this.headerService.headerState;
        this.fieldsGroup = this.headerService.headerFieldOptions;
    }

    /**
     *
     * @param columnId Identifier of edited column
     * @param groupType Defines if selected field is immediate or meta type
     * @param field Defines representation of field
     */
    public onColumnEdit(columnId: string, groupType: string, field: DataDescription) {
        this.headers = this.headerService.onColumnEdit(columnId, groupType, field);
    }

    public getIterableHeaders() {
        return {...this.headers.selectedHeaders$};
    }

}
