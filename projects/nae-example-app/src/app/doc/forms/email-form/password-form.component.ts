import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FormSubmitEvent, LoggerService, MessageResource, SignUpService, SnackBarService} from '@netgrif/components-core';
import {Observable} from 'rxjs';

interface EndpointOption {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'nae-app-password-card',
    templateUrl: './password-form.component.html',
    styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {

    readonly TITLE = 'Email submission form';
    readonly DESCRIPTION = 'Ukážka email submission form...';

    public endpointFormControl: FormControl;

    public endpointOptions: Array<EndpointOption> = [
        {value: 'signup', viewValue: 'Sign up'},
        {value: 'forgotten', viewValue: 'Forgotten password'}
    ];

    constructor(protected _signUpService: SignUpService, protected _snackBarService: SnackBarService, protected _log: LoggerService) {
        this.endpointFormControl = new FormControl(this.endpointOptions[0].value);
    }

    ngOnInit(): void {
    }

    callEndpoint(event: FormSubmitEvent): void {
        let endpoint: Observable<MessageResource>;
        if (this.endpointFormControl.value === 'signup') {
            endpoint = this._signUpService.invite({email: event.email, groups: [], processRoles: []});
        } else {
            endpoint = this._signUpService.resetPassword(event.email);
        }

        endpoint.subscribe(response => {
            if (response.error) {
                this._snackBarService.openErrorSnackBar('Request failed');
                this._log.error('Request error', response.error);
            } else {
                this._snackBarService.openSuccessSnackBar('Request success');
            }
        });
    }
}
