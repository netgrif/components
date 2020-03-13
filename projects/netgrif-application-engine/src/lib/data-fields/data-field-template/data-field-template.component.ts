import {Component, Input, TemplateRef} from '@angular/core';
import {ResizedEvent} from "angular-resize-event";
import {WrappedBoolean} from "./models/wrapped-boolean";

@Component({
    selector: 'nae-data-field-template',
    templateUrl: './data-field-template.component.html',
    styleUrls: ['./data-field-template.component.scss']
})
export class DataFieldTemplateComponent {

    @Input() public title: string;
    @Input() public dataFieldTemplate: TemplateRef<any>;
    @Input() public layoutChangeWidthBreakpoint: number = 250;

    private _showLargeLayout: WrappedBoolean = new WrappedBoolean();

    get showLargeLayout(): WrappedBoolean {
        return this._showLargeLayout;
    }

    evaluateTemplateCondition(event: ResizedEvent): void {
        this._showLargeLayout.value = event.newWidth >= this.layoutChangeWidthBreakpoint;
    }
}
