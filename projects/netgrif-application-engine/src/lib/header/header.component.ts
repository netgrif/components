import {Component, Injector, Input, OnInit} from '@angular/core';
import {AbstractHeaderService} from "./abstract-header-service";
import {CaseHeaderService} from "./case-header/case-header.service";

export type HeaderType = 'case' | 'task' | 'workflow';

@Component({
    selector: 'nae-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [CaseHeaderService]
})
export class HeaderComponent implements OnInit {

    @Input()
    type: HeaderType = 'case';
    public headerService: AbstractHeaderService;

    constructor(private _injector: Injector) {
    }

    ngOnInit(): void {
        this.resolveHeaderService();
    }

    private resolveHeaderService(){
        switch (this.type) {
            case "case":
                this.headerService = this._injector.get(CaseHeaderService);
                break;
            case "task":
                //TODO
            case "workflow":
                //TODO
        }
    }

}
