import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Credentials, User} from '../../models/user';


const BASE_URL = 'http://localhost:8080/auth';

@Injectable()
export class BasicAuthenticationService {

    constructor(private http: HttpClient) {
    }

    get token(): string {
        return localStorage.getItem('token');
    }

    set token(token) {
        localStorage.setItem('token', token);
    }


    login(credentials: Credentials): Observable<any> {
        const url = BASE_URL + '/login';
        return this.http.get<User>(url, {
            headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa(credentials.username + '.' + credentials.password))
        });
    }

    logout(): Observable<any> {
        const url = BASE_URL + '/logout';
        return this.http.post(url, {});
    }
}
