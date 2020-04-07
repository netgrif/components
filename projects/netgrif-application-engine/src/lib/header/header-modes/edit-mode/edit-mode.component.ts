import {Component, Input} from '@angular/core';
import {AbstractHeaderService} from '../../abstract-header-service';
import {HeaderColumn} from '../../models/header-column';

@Component({
    selector: 'nae-edit-mode',
    templateUrl: './edit-mode.component.html',
    styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent{

    @Input() public headerService: AbstractHeaderService;

    constructor() {
    }

    public headerColumnSelected(columnIndex: number, newHeaderColumn: HeaderColumn) {
        this.headerService.headerColumnSelected(columnIndex, newHeaderColumn);
    }
}
