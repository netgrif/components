import {Component, OnInit} from '@angular/core';
import {DialogService, DialogType} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-dialog-example',
    templateUrl: './dialog-example.component.html',
    styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent implements OnInit {
    readonly TITLE = 'Dialog';
    readonly DESCRIPTION = 'Ukážka použitia dialogu...';
    public questionResult: string;
    public answerResult: string;
    public colors: Array<object>;

    constructor(private dialogService: DialogService) {
        this.colors = [
            {value: 'primary', viewValue: 'Primary'},
            {value: 'accent', viewValue: 'Accent'},
            {value: 'warn', viewValue: 'Warn'}
            ];
    }

    ngOnInit(): void {
    }

    simple(message: string, select: string) {
        this.dialogService.openSimpleDialog('Simple info dialog title', message, select as DialogType);
    }

    question(question: string, pos: string, neg: string) {
        this.dialogService.openQuestionDialog('Question dialog title', question, neg, pos)
            .afterClosed().subscribe( result => {
                this.questionResult = result;
        });
    }

    answer(question: string, placeholder: string) {
        this.dialogService.openQuestionWithAnswerDialog('Question with answer dialog title', question, placeholder)
            .afterClosed().subscribe( result => {
            this.answerResult = result;
        });
    }
}
