import {Injectable} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class NullAuthenticationService extends AuthenticationService {

    constructor() {
        super();
    }
}
