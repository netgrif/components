import {Component, OnInit} from '@angular/core';
import {DialogService} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-dialog-example',
    templateUrl: './dialog-example.component.html',
    styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent implements OnInit {
    readonly TITLE = 'Dialog';
    readonly DESCRIPTION = 'Ukážka použitia dialogu...';

    constructor(private dialogService: DialogService) {
    }

    ngOnInit(): void {
    }

    simple() {
        this.dialogService.openSimpleDialog('dialog title', 'dialog content');
    }

    question() {
        this.dialogService.openQuestionDialog('question title', 'How are you?', 'nay', 'yay');
    }

    answer() {
        this.dialogService.openQuestionWithAnswerDialog('qustion title', 'Question?', 'placeholder');
    }
}
