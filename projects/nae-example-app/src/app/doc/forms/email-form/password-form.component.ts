import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
    FormSubmitEvent,
    LoadingEmitter,
    LoggerService,
    MessageResource,
    SignUpService,
    SnackBarService
} from '@netgrif/components-core';
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
export class PasswordFormComponent implements OnInit, OnDestroy {

    readonly TITLE = 'Email submission form';
    readonly DESCRIPTION = 'Ukážka email submission form...';

    public endpointFormControl: FormControl;

    public loading: LoadingEmitter;

    public endpointOptions: Array<EndpointOption> = [
        {value: 'signup', viewValue: 'Sign up'},
        {value: 'forgotten', viewValue: 'Forgotten password'}
    ];

    constructor(protected _signUpService: SignUpService, protected _snackBarService: SnackBarService, protected _log: LoggerService) {
        this.endpointFormControl = new FormControl(this.endpointOptions[0].value);
        this.loading = new LoadingEmitter();
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.loading.complete();
    }

    callEndpoint(event: FormSubmitEvent): void {
        this.loading.on();
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
            this.loading.off();
        });
    }
}
