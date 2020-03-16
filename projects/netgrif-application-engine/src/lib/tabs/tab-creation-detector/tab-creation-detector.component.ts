import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'nae-tab-creation-detector',
    templateUrl: './tab-creation-detector.component.html',
    styleUrls: ['./tab-creation-detector.component.scss']
})
export class TabCreationDetectorComponent implements OnInit {

    @Input() initializeTabFunction: (index: number) => void;
    @Input() tabIndex: number;

    ngOnInit() {
        this.initializeTabFunction(this.tabIndex);
    }

}
