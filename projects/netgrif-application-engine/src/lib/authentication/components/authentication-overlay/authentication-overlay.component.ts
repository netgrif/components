import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../session/services/session.service';
import {SpinnerOverlayService} from '../../../utility/service/spinner-overlay.service';
import {Router} from '@angular/router';
import {RedirectService} from '../../../routing/redirect-service/redirect.service';

@Component({
    selector: 'nae-authentication-overlay',
    templateUrl: './authentication-overlay.component.html',
    styleUrls: ['./authentication-overlay.component.scss']
})
export class AuthenticationOverlayComponent implements OnInit {

    constructor(private _session: SessionService, private _spinnerOverlay: SpinnerOverlayService,
                private router: Router, private redirectService: RedirectService) {
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
