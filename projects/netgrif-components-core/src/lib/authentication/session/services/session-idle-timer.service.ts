import {Injectable, OnDestroy} from "@angular/core";
import {interval, Observable, ReplaySubject, Subscription} from "rxjs";
import {ConfigurationService} from "../../../configuration/configuration.service";

@Injectable({
    providedIn: 'root'
})
export class SessionIdleTimerService implements OnDestroy {

    public static readonly DEFAULT_SESSION_TIMEOUTTIME = 900;

    private readonly _enableService: boolean;
    private readonly _timeoutSeconds: number;
    private _count: number = 0;
    private timerSubscription!: Subscription;
    private timer: Observable<number> = interval(1000);
    private _remainSeconds = new ReplaySubject<number>(1);

    public remainSeconds$ = this._remainSeconds.asObservable();

    constructor(private _config: ConfigurationService,) {
        this._enableService = this._config.getConfigurationSubtreeByPath('providers.auth.sessionTimeoutEnabled') ?? false;
        this._timeoutSeconds = this._config.getConfigurationSubtreeByPath('providers.auth.sessionTimeout') ?? SessionIdleTimerService.DEFAULT_SESSION_TIMEOUTTIME;
    }

    startTimer() {
        if (this._enableService) {
            this.stopTimer();
            this._count = this._timeoutSeconds;
            this.timerSubscription = this.timer.subscribe(n => {
                if (this._count > 0) {
                    this._remainSeconds.next(this._count);
                    this._count--;
                } else if (this._count == 0) {
                    this._remainSeconds.next(this._count);
                    this.stopTimer();
                }
            });
        }
    }

    stopTimer() {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }

    resetTimer() {
        this.startTimer();
    }

    ngOnDestroy(): void {
        this.timerSubscription.unsubscribe();
        this._remainSeconds.unsubscribe();
    }

}
