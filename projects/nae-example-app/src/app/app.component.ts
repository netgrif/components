import {Component} from '@angular/core';
import {LoggerService} from '@netgrif/application-engine';
import {NumberField} from "@netgrif/application-engine/lib/data-fields/number-field/number-field";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'nae-example-app';

    constructor(log: LoggerService) {
        log.info('App component has started');
    }

    field = new NumberField("number", "placeholder", 5);
}
