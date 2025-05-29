import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {ApiProperties} from './api-properties';


@Component({
    selector: 'nae-app-documentation',
    templateUrl: './documentation.component.html',
    styleUrls: ['./documentation.component.scss'],
    standalone: false
})
export class DocumentationComponent implements OnInit {

    @Input() liveExample: TemplateRef<object>;
    @Input() mainTitle: string;
    @Input() mainDescription: string;
    @Input() codeSnippet: string;
    @Input() apiModuleImport: string;
    @Input() apiProperties: ApiProperties[];

    displayedColumns: string[] = ['name', 'description'];

    constructor() {
    }

    ngOnInit() {
    }
}
