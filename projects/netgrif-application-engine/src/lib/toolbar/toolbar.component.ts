import {Component, Input, OnInit} from '@angular/core';
import {SelectLanguageService} from "./select-language.service";

@Component({
    selector: 'nae-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    @Input()
    public loggedUser:string;

    @Input()
    public appName:string;

    constructor(public selectLanguageService: SelectLanguageService) {
    }

    ngOnInit() {
    }

}
