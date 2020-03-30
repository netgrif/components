import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-case-header-example',
    templateUrl: './case-header-example.component.html',
    styleUrls: ['./case-header-example.component.scss']
})
export class CaseHeaderExampleComponent implements OnInit {

    readonly TITLE = 'Case panel';
    readonly DESCRIPTION = 'Ukážka použitia case headeru...';

    constructor() {
    }

    ngOnInit(): void {
    }

}
