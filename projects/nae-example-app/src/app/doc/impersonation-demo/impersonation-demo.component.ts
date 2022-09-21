import {Component, OnInit} from '@angular/core';
import {ImpersonationService, ImpersonationUserSelectService} from 'netgrif-components-core';

@Component({
    selector: 'nae-app-impersonation-demo',
    templateUrl: './impersonation-demo.component.html',
    styleUrls: ['./impersonation-demo.component.scss']
})
export class ImpersonationDemoComponent {

    constructor(
        private _impersonationSelect: ImpersonationUserSelectService,
        private _impersonation: ImpersonationService,
    ) {
        this._impersonation.impersonating$.subscribe((isImpersonating: boolean) => {
            console.log("Is impersonating " + isImpersonating);
        });
    }

    public impersonate(): void {
        this._impersonationSelect.selectImpersonate();
    }

    public stopImpersonate(): void {
        this._impersonation.cease();
    }

}
