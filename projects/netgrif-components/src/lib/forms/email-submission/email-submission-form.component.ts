import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AbstractEmailSubmissionFormComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-email-submission-form',
    templateUrl: './email-submission-form.component.html',
    styleUrls: ['./email-submission-form.component.scss']
})
export class EmailSubmissionFormComponent extends AbstractEmailSubmissionFormComponent {
    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }
}
