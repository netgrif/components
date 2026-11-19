import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {PageMasterComponent} from '../page-master.component';

@Component({
    selector: 'nc-builder-main-master',
    templateUrl: './main-master.component.html',
    styleUrl: './main-master.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MainMasterComponent extends PageMasterComponent implements OnInit {

    constructor() {
        super();
    }
}
