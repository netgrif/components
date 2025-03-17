import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SessionIdleTimerService} from '@netgrif/components-core';

@Component({
    selector: 'nc-popup-session-idle',
    templateUrl: './popup-session-idle.component.html',
    styleUrls: ['./popup-session-idle.component.scss'],
    standalone: false
})
export class PopupSessionIdleComponent {

    constructor(public dialogRef: MatDialogRef<PopupSessionIdleComponent>,
                public sessionTimer: SessionIdleTimerService) {
    }

    public getTime() {
            return this.sessionTimer.remainSeconds$;

    }

}
