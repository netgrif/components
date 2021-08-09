import {Component, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractEditModeComponent, LoggerService} from '@netgrif/application-engine';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {timeout} from 'rxjs/operators';

@Component({
    selector: 'nc-edit-mode',
    templateUrl: './edit-mode.component.html',
    styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent extends AbstractEditModeComponent {

    @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
    onFocus() {
        // this.trigger._onChange('');
        console.log('focused');
        console.log(this.trigger.panelOpen);
        console.log('opening');
        this.trigger.openPanel();
        console.log(this.trigger.panelOpen);
    }


    constructor(protected _translate: TranslateService,
                protected loggerService: LoggerService) {
        super(_translate, loggerService);
    }
}
