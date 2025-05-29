import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {
    RedirectService,
    SessionService,
    SpinnerOverlayService,
    AbstractAuthenticationOverlayComponent,
    IdentityService
} from '@netgrif/components-core';

@Component({
    selector: 'nc-authentication-overlay',
    templateUrl: './authentication-overlay.component.html',
    styleUrls: ['./authentication-overlay.component.scss'],
    standalone: false
})
export class AuthenticationOverlayComponent extends AbstractAuthenticationOverlayComponent {

    constructor(protected _session: SessionService, protected _spinnerOverlay: SpinnerOverlayService,
                protected router: Router, protected redirectService: RedirectService, protected userService: IdentityService) {
        super(_session, _spinnerOverlay, router, redirectService, userService);
    }
}
