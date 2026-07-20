import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {TutorialService} from '../../../../tutorial/tutorial-service';
import {NAB_CONTROL_PANEL_TOOL} from '../../control-panel-tool-injection-token';
import {ImportTool} from '../import-tool';

@Component({
    selector: 'nc-builder-import-tool-button',
    templateUrl: './import-tool-button.component.html',
    styleUrls: ['./import-tool-button.component.scss']
})
export class ImportToolButtonComponent {

    @ViewChild('xmlFileInput') fileInput: ElementRef;

    constructor(
        @Inject(NAB_CONTROL_PANEL_TOOL) public tool: ImportTool,
        public tutorialService: TutorialService
    ) {
    }

    onClick($event: Event): void {
        $event.stopPropagation();
        this.tool.onEvent($event);
        this.fileInput.nativeElement.value = '';
    }
}
