import {Component, OnInit} from '@angular/core';
import {ImpersonationService, ImpersonationUserSelectService} from 'netgrif-components-core';

@Component({
    selector: 'nae-app-impersonation-demo',
    templateUrl: './impersonation-demo.component.html',
    styleUrls: ['./impersonation-demo.component.scss']
})
export class ImpersonationDemoComponent implements OnInit {

    constructor(
        private _impersonationSelect: ImpersonationUserSelectService,
        private _impersonation: ImpersonationService,
    ) {
        this._impersonation.impersonating.subscribe((isImpersonating: boolean) => {
            console.log("Is impersonating " + isImpersonating);
        });
    }

    ngOnInit(): void {
    }

    public impersonate(): void {
        this._impersonationSelect.selectImpersonate();
    }

    public stopImpersonate(): void {
        this._impersonation.cease();
    }

}
