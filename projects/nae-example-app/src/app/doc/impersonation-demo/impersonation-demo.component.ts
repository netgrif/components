import {Component, OnInit} from '@angular/core';
import {ImpersonationService, ImpersonationUserSelectService, LoggerService} from '@netgrif/components-core';

@Component({
    selector: 'nae-app-impersonation-demo',
    templateUrl: './impersonation-demo.component.html',
    styleUrls: ['./impersonation-demo.component.scss'],
    standalone: false
})
export class ImpersonationDemoComponent {

    constructor(
        private _impersonationSelect: ImpersonationUserSelectService,
        private _impersonation: ImpersonationService,
        private _log: LoggerService,
    ) {
        this._impersonation.impersonating$.subscribe((isImpersonating: boolean) => {
            this._log.debug("Is impersonating " + isImpersonating);
        });
    }

    public impersonate(): void {
        this._impersonationSelect.selectImpersonate();
    }

    public stopImpersonate(): void {
        this._impersonation.cease();
    }

}
