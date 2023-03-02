import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {SessionIdleTimerService} from "../session/services/session-idle-timer.service";
import {UserService} from "../../user/services/user.service";
import {LoggerService} from "../../logger/services/logger.service";
import {ConfigurationService} from "../../configuration/configuration.service";

@Component({
    selector: 'ncc-abstract-session-idle',
    template: ''
})
export abstract class AbstractSessionIdleComponent implements OnInit, OnDestroy {

    @Input() alertAt? = 30;

    private sessionTimerSubscription!: Subscription;

    constructor(protected sessionTimer: SessionIdleTimerService,
                protected _user: UserService,
                protected _log: LoggerService,
                protected _config: ConfigurationService,
                protected _router: Router) {
    }

    ngOnInit() {
        if (!this.sessionTimerSubscription) {
            this.trackSessionTime();
        }
    }

    protected trackSessionTime() {
        this.sessionTimer.startTimer();
        this.sessionTimerSubscription = this.sessionTimer.remainSeconds$.subscribe(
            (t) => {
                if (t === this.alertAt) {
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
        if (this.sessionTimerSubscription) {
            this.sessionTimerSubscription.unsubscribe();
        }
    }

    ngOnDestroy(): void {
        this.cleanUp();
    }

}
