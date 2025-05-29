import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    IdentityService,
    SessionService,
    AuthenticationService,
    PublicUrlResolverService,
    RedirectService
} from '@netgrif/components-core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'nae-app-public-resolver',
    templateUrl: './public-resolver.component.html',
    styleUrls: ['./public-resolver.component.scss'],
    standalone: false
})
export class PublicResolverComponent implements OnInit, OnDestroy {

    private _identitySub: Subscription;

    constructor(protected _identityService: IdentityService, protected _sessionService: SessionService, protected _router: Router,
                protected _auth: AuthenticationService, protected _publicResolver: PublicUrlResolverService,
                protected redirectService: RedirectService) {
    }

    ngOnInit(): void {
        this._identitySub = this._identityService.identity$.subscribe(identity => {
            if (!!identity && identity.id !== '') {
                this._router.navigate([this.redirectService.parseRedirectPath(this._publicResolver.url)],
                    { queryParams: this.redirectService.queryParams });
                this._publicResolver.url = undefined;
            } else {
                if (!this._sessionService.verified && !this._sessionService.isVerifying &&
                    this._sessionService.isInitialized && !this._auth.isAuthenticated) {
                    this._router.navigate([this.redirectService.parseRedirectPath(this._publicResolver.url)],
                        { queryParams: this.redirectService.queryParams });
                    this._publicResolver.url = undefined;
                }
            }
        });
    }

    ngOnDestroy(): void {
        this._identitySub.unsubscribe();
    }
}
