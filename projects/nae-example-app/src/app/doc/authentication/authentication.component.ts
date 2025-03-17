import {Component, OnInit} from '@angular/core';
import {LoggerService, User, UserService} from '@netgrif/components-core';

@Component({
    selector: 'nae-app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
    standalone: false
})
export class AuthenticationComponent implements OnInit {

    readonly TITLE = 'Authentication';
    readonly DESCRIPTION = 'Ukážka použitia AuthenticationService...';

    authenticated = false;
    user: User = null;
    userString = null;
    credentials = {
        username: null,
        password: null
    };

    constructor(private userService: UserService, private log: LoggerService) {
        this.userString = JSON.stringify(userService.user, undefined, 2);
    }

    ngOnInit(): void {
    }

    login() {
        this.userService.login(this.credentials)
            .subscribe(user => {
                    this.log.info('User: ', user);
                    this.authenticated = !!user;
                    this.user = user;
                    this.userString = JSON.stringify(this.user, undefined, 2);
                },
                error => this.log.debug('Error User: ', error));
    }

    logout() {
        // if (!this.authenticated) {
        //     return;
        // }
        this.userService.logout().subscribe(response => {
            this.log.info('User logged out from the server');
            this.authenticated = false;
            this.user = null;
            this.userString = null;
        });
    }

}
