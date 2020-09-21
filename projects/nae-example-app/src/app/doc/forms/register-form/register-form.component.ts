import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'nae-app-register-card',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

    readonly TITLE = 'Registration form';
    readonly DESCRIPTION = 'Ukážka registration form...';
    public token: string;

    constructor(private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.token = this._route.snapshot.paramMap.get('token');
    }

}
