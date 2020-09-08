import {Injectable} from '@angular/core';
import {SessionService} from '../../authentication/session/services/session.service';
import {SpinnerOverlayService} from '../../utility/service/spinner-overlay.service';
import {ProcessService} from '../../process/process.service';
import {Router} from '@angular/router';
import {RedirectService} from '../../routing/redirect-service/redirect.service';
import {LoggerService} from 'netgrif-application-engine';

@Injectable({
    providedIn: 'root'
})
export class RoleOverlayService {

    private loadNet: Array<string> = [];
    private redirectPath: string;

    constructor(protected _session: SessionService,
                protected _spinnerOverlay: SpinnerOverlayService,
                protected _processService: ProcessService,
                protected router: Router,
                protected redirectService: RedirectService,
                protected loggerService: LoggerService) {
    }

    public loadNets(): void {
        if (this.loadNet) {
            this._processService.getNets(this.loadNet).subscribe(nets => {
                if (nets.length !== this.loadNet.length) {
                    this.loggerService.error(
                        `Role guard error: Count nets ${this.loadNet.length} do not match count load nets ${nets.length}`);
                }
                this.loadNet = [];
                this._spinnerOverlay.spin$.next(false);
                this.redirectService.redirect(this.redirectPath);
            });
        }
    }


    public setLoadNet(nets: Array<string>, redirectPath) {
        if (this._session.verified) {
            this._spinnerOverlay.spin$.next(true);
            this.loadNet.push(...nets);
            this.redirectPath = redirectPath;
            this.loadNets();
        }
        return false;
    }

}
