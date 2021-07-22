import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    UserService,
    SessionService,
    AuthenticationService,
    PublicUrlResolverService,
    RedirectService
} from '@netgrif/application-engine';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'nae-app-public-resolver',
    templateUrl: './public-resolver.component.html',
    styleUrls: ['./public-resolver.component.scss']
})
export class PublicResolverComponent implements OnInit, OnDestroy {

    private _userSub: Subscription;

    constructor(protected _userService: UserService, protected _sessionService: SessionService, protected _router: Router,
                protected _auth: AuthenticationService, protected _publicResolver: PublicUrlResolverService,
                protected redirectService: RedirectService) {
    }

    ngOnInit(): void {
        this._userSub = this._userService.user$.subscribe(user => {
            if (user.id !== '') {
                this._router.navigate([this.redirectService.parseRedirectPath(this._publicResolver.url)],
                    { queryParams: this.redirectService.queryParams });
                this._publicResolver.url = undefined;
            } else if (user.id === '') {
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
        this._userSub.unsubscribe();
    }
}
