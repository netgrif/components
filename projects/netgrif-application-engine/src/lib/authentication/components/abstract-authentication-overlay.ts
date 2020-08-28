import {OnInit} from '@angular/core';
import {SessionService} from '../session/services/session.service';
import {SpinnerOverlayService} from '../../utility/service/spinner-overlay.service';
import {Router} from '@angular/router';
import {RedirectService} from '../../routing/redirect-service/redirect.service';

export abstract class AbstractAuthenticationOverlay implements OnInit {

    constructor(protected _session: SessionService, protected _spinnerOverlay: SpinnerOverlayService,
                protected router: Router, protected redirectService: RedirectService) {
    }

    ngOnInit(): void {
        if (this._session.verified) {
            this.redirectService.redirect();
        } else if (!this._session.verified && this._session.isVerifying) {
            this._spinnerOverlay.spin$.next(true);
            this._session.verifying.subscribe(active => {
                if (!active) {
                    this._spinnerOverlay.spin$.next(false);
                    if (this._session.verified) {
                        this.redirectService.redirect();
                    }
                }
            });
        }
    }

}
