import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'nae-app-reset-password-form',
    templateUrl: './reset-password-form.component.html',
    styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent implements OnInit {

    readonly TITLE = 'Forgotten password form';
    readonly DESCRIPTION = 'Ukážka forgotten password form...';
    public token: string;

    constructor(private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.token = this._route.snapshot.paramMap.get('token');
    }

}
