import {Component, Input} from '@angular/core';
import {
    AbstractSessionIdleComponent,
    ConfigurationService,
    LoggerService,
    SessionIdleTimerService,
    UserService
} from '@netgrif/components-core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {PopupSessionIdleComponent} from "./popup-session-idle/popup-session-idle.component";
import {take} from "rxjs/operators";

@Component({
    selector: 'nc-session-idle',
    templateUrl: './session-idle.component.html',
    styleUrls: [],
    standalone: false
})
export class SessionIdleComponent extends AbstractSessionIdleComponent {

    @Input() alertAtSeconds? = 30;

    constructor(protected dialog: MatDialog,
                sessionTimer: SessionIdleTimerService,
                _user: UserService,
                _log: LoggerService,
                _config: ConfigurationService,
                _router: Router) {
        super(sessionTimer, _user, _log, _config, _router);
    }

    public close(): void {
        this.dialog.closeAll();
    }

    public alert(): void {
        this.openDialog()
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(PopupSessionIdleComponent);
        dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
            if (result) {
                this.logout();
            }
            this.continue();
        });
    }

}

