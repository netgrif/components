import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoggerService, MessageResource, SnackBarService} from '@netgrif/components-core';

@Component({
    selector: 'nae-app-register-card',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

    readonly TITLE = 'Registration form';
    readonly DESCRIPTION = 'Ukážka registration form...';
    public token: string;

    constructor(private _route: ActivatedRoute,
                protected _snackBarService: SnackBarService,
                protected _log: LoggerService,
                protected _router: Router) {
    }

    ngOnInit(): void {
        this.token = this._route.snapshot.paramMap.get('token');
    }

    handleServerResponse(response: MessageResource | any): void {
        if (response.success) {
            this._snackBarService.openSuccessSnackBar('Registration success');
            this._router.navigate(['login']).then(value => {
                this._log.debug('Routed to login' + value);
            });
        } else {
            this._snackBarService.openErrorSnackBar('Registration failed');
            this._log.error('Request error', response.error);
        }
    }
}
