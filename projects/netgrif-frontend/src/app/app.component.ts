import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LanguageService, RoutingBuilderService} from '@netgrif/components-core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent {

    /**
     * The services are created with the application: the routing builder builds the routes of the views of nae.json,
     * the language service sets the language (the one chosen before, of the user preferences or of the browser).
     */
    constructor(_languageService: LanguageService, _routingBuilder: RoutingBuilderService) {
    }
}
