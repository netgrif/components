import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AbstractEmailSubmissionFormComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-email-submission-form',
    templateUrl: './email-submission-form.component.html',
    styleUrls: ['./email-submission-form.component.scss'],
    standalone: false
})
export class EmailSubmissionFormComponent extends AbstractEmailSubmissionFormComponent {
    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }
}
