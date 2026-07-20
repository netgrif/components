import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TutorialService} from '../../../tutorial/tutorial-service';
import {ModelImportService} from '../../model-import-service';
import {ControlPanelButton} from '../control-panel-button';
import {ControlPanelIcon} from '../control-panel-icon';
import {Tool} from '../tools/tool';
import {ImportToolButtonComponent} from './import-tool-button/import-tool-button.component';
import {ConfigurationService} from '@netgrif/components-core';

@Injectable()
export class ImportTool extends Tool {

    private bpmn2pnUrl: string;
    private fileHandlers: Map<string, (content: string) => void>;

    constructor(
        config: ConfigurationService,
        private importService: ModelImportService,
        private http: HttpClient,
        private snackBar: MatSnackBar,
        tutorialService: TutorialService
    ) {
        super(
            'import',
            new ControlPanelButton(
                new ControlPanelIcon('upload', false, true),
                'Choose a file to open'
            ),
            ImportToolButtonComponent,
            tutorialService.importTool
        );
        this.bpmn2pnUrl = config.get().services?.urls?.bpmn2pn;
        this.fileHandlers = new Map();
        this.fileHandlers.set('xml', content => {
            this.importService.importFromXml(content)
        });
        this.fileHandlers.set('bpmn', content => {
            this.http.post(this.bpmn2pnUrl, content, {
                headers: {
                    'Content-Type': 'text/xml;charset=US-ASCII',
                },
                responseType: 'text',
            }).pipe().subscribe((xmlContent: string) => {
                this.importService.importFromXml(xmlContent);
            }, (error: HttpErrorResponse) => {
                this.snackBar.open(error.message, 'X');
            });
        });
    }

    onClick() {
    }

    public onEvent($event: Event): void {
        const file = ($event.target as HTMLInputElement).files[0];
        const extension = file.name.split('.').pop().toLowerCase()
        const reader = new FileReader();
        reader.onload = () => {
            this.handleFileContent(reader.result as string, extension);
        };
        reader.readAsText(file);
    }

    handleFileContent(content: string, extension: string): void {
        if (!this.fileHandlers.has(extension)) {
            this.snackBar.open('Unknown file type', 'X');
            return;
        }
        const handle = this.fileHandlers.get(extension)
        handle(content);
    }
}
