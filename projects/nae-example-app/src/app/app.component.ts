import {Component} from '@angular/core';
import {AuthenticationService, UserService} from '@netgrif/application-engine';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'nae-example-app';
    isLogged = false;

    constructor(private auth: AuthenticationService, private userService: UserService) {
        auth.authenticated$.subscribe(value => this.isLogged = value);
        userService.login({username: 'super@netgrif.com', password: 'password'}).subscribe(user => console.log(user));
    }
}
