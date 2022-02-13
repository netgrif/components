import {Component, OnInit} from '@angular/core';
import {DialogService} from '@netgrif/components-core';

@Component({
    selector: 'nae-app-dialog-example',
    templateUrl: './dialog-example.component.html',
    styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent implements OnInit {
    readonly TITLE = 'Dialog';
    readonly DESCRIPTION = 'Ukážka použitia dialogu...';
    public questionResult: boolean;
    public answerResult: string;

    constructor(private dialogService: DialogService) {
    }

    ngOnInit(): void {
    }

    simple(title: string, message: string) {
        this.dialogService.openAlertDialog(title, message);
    }

    question(title: string, question: string, pos: string, neg: string) {
        this.dialogService.openConfirmDialog(title, question, neg, pos)
            .afterClosed().subscribe(result => {
            this.questionResult = result.confirmed;
        });
    }

    answer(title: string, question: string, placeholder: string) {
        this.dialogService.openPromptDialog(title, question, placeholder)
            .afterClosed().subscribe(result => {
                if (!!result.prompt) {
                    this.answerResult = result.prompt;
                }
        });
    }
}
