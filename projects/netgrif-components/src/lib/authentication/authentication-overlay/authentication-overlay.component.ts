import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RedirectService, SessionService, SpinnerOverlayService, AbstractAuthenticationOverlay} from '@netgrif/application-engine';

@Component({
    selector: 'nc-authentication-overlay',
    templateUrl: './authentication-overlay.component.html',
    styleUrls: ['./authentication-overlay.component.scss']
})
export class AuthenticationOverlayComponent extends AbstractAuthenticationOverlay {

    constructor(protected _session: SessionService, protected _spinnerOverlay: SpinnerOverlayService,
                protected router: Router, protected redirectService: RedirectService) {
        super(_session, _spinnerOverlay, router, redirectService);
    }
}
