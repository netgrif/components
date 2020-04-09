import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-headers',
    templateUrl: './headers.component.html',
    styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {

    readonly TITLE = 'Headers';
    readonly DESCRIPTION = 'Ukážka použitia case headeru...';

    constructor() {
    }

    ngOnInit(): void {
    }

}
