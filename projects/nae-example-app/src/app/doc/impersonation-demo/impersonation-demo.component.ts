import {Component, OnInit} from '@angular/core';
import {ImpersonationUserSelectService} from 'netgrif-components-core';

@Component({
    selector: 'nae-app-impersonation-demo',
    templateUrl: './impersonation-demo.component.html',
    styleUrls: ['./impersonation-demo.component.scss']
})
export class ImpersonationDemoComponent implements OnInit {

    constructor(private _impersonation: ImpersonationUserSelectService) {
    }

    ngOnInit(): void {
    }

    public impersonate(): void {
        this._impersonation.selectImpersonate();
    }

}
