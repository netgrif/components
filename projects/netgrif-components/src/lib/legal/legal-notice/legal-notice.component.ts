import {Component} from '@angular/core';
import {AbstractLegalNoticeComponent, ConfigurationService} from '@netgrif/components-core';

@Component({
    selector: 'nc-legal-notice',
    templateUrl: './legal-notice.component.html',
    styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent extends AbstractLegalNoticeComponent {

    constructor(config: ConfigurationService) {
        super(config);
    }

}
