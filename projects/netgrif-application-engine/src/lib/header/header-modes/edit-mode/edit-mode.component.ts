import {Component, Input, OnInit} from '@angular/core';
import {FieldsGroup} from '../../models/fields-group';
import {Headers} from '../../headers';
import {AbstractHeaderService} from '../../abstract-header-service';
import {DataDescription} from '../../models/data-description';

@Component({
    selector: 'nae-edit-mode',
    templateUrl: './edit-mode.component.html',
    styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent implements OnInit {

    public fieldsGroup: Array<FieldsGroup>;
    public headers: Headers;
    @Input()
    public headerService: AbstractHeaderService;

    constructor() {
    }

    ngOnInit(): void {
        this.headers = this.headerService.headers;
        this.fieldsGroup = this.headerService.fieldsGroup;
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
        return {...this.headers.selected};
    }

}
