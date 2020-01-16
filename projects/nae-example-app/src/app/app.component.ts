import {Component} from '@angular/core';
import {LoggerService} from '@netgrif/application-engine';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'nae-example-app';

    constructor(log: LoggerService, public routes: Router) {
        log.info('App component has started');
    }
}
