import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {SessionIdleTimerService} from "../session/services/session-idle-timer.service";
import {UserService} from "../../user/services/user.service";
import {LoggerService} from "../../logger/services/logger.service";
import {ConfigurationService} from "../../configuration/configuration.service";
import {filter} from "rxjs/operators";

@Component({
    selector: 'ncc-abstract-session-idle',
    template: ''
})
export abstract class AbstractSessionIdleComponent implements OnInit, OnDestroy {

    @Input() alertAtSeconds? = 30;

    private sessionTimerSubscription!: Subscription;

    protected _enableIdle: boolean;

    constructor(protected sessionTimer: SessionIdleTimerService,
                protected _user: UserService,
                protected _log: LoggerService,
                protected _config: ConfigurationService,
                protected _router: Router) {
        this._enableIdle = this._config.get().providers.auth.sessionTimeoutEnabled ?
            this._config.get().providers.auth.sessionTimeoutEnabled : false;  //TODO: merge with change password and fix deep-copy
    }

    ngOnInit() {
        if (!this.sessionTimerSubscription && this._enableIdle) {
            this.trackSessionTime();
        }
    }

    protected trackSessionTime() {
        this.sessionTimer.startTimer();
        this.sessionTimerSubscription = this.sessionTimer.remainSeconds$.subscribe(
            (t) => {
                if (t === this.alertAtSeconds) {
                    this.alert();
                }
                if (t === 0) {
                    this.close();
                    this.logout();
                }
            }
        );
    }

    continue() {
        this.sessionTimer.resetTimer();
        this._user.reload()
    }

    logout() {
        this.cleanUp()
        this._user.logout().subscribe(() => {
            this._log.debug('User is logged out');
            if (this._config.get().services && this._config.get().services.auth && this._config.get().services.auth.logoutRedirect) {
                const redirectPath = this._config.get().services.auth.logoutRedirect;
                this._router.navigate([redirectPath]);
            }
        });
    }

    public abstract alert(): void;

    public abstract close(): void;

    protected cleanUp() {
        this.sessionTimer.stopTimer();
    }

    ngOnDestroy(): void {
        this.cleanUp();
        if (this.sessionTimerSubscription) {
            this.sessionTimerSubscription.unsubscribe();
        }
    }

}
