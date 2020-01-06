import {Component} from '@angular/core';
import {NetgrifApplicationEngineService} from 'netgrif-application-engine';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'nae-example-app';

	constructor(private naeService: NetgrifApplicationEngineService) {
		this.title = naeService.name;
	}
}
