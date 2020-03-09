import {Component, Input} from '@angular/core';
import {FileField, FileUploadMIMEtype, LoggerService} from '@netgrif/application-engine';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'nae-example-app';

    @Input() fileField: FileField = new FileField('Title', 'UPLOAD', undefined,
        undefined, 10, false,
        [FileUploadMIMEtype.JPG, FileUploadMIMEtype.XML]);

    constructor(private log: LoggerService) {
        log.info('App component has started');
    }
}
