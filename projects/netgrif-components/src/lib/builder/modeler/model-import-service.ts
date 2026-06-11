import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {ImportService} from '@netgrif/petriflow';
import {DialogErrorsComponent} from '../dialogs/dialog-errors/dialog-errors.component';
import {ImportSuccessfulComponent} from './control-panel/import-successful/import-successful.component';
import {HistoryService} from './services/history/history.service';
import {ModelService} from './services/model/model.service';
import {BuilderMode, BuilderModeService} from "../builder-mode.service";

@Injectable()
export class ModelImportService {

    constructor(
        private importService: ImportService,
        private modelService: ModelService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
        private historyService: HistoryService,
        private _builderModeService: BuilderModeService
    ) {
    }

    public importFromXml(content: string): void {
        const petriNetResult = this.importService.parseFromXml(content);

        if (petriNetResult.errors.length + petriNetResult.warnings.length + petriNetResult.info.length > 0) {
            console.log('Petri net import errors:');
            petriNetResult.errors.forEach(e => console.log(e));

            this.dialog.open(DialogErrorsComponent, {
                width: '60%',
                panelClass: "dialog-width-60",
                data: {
                    errors: petriNetResult.errors,
                    warnings: petriNetResult.warnings,
                    info: petriNetResult.info
                }
            });
        } else {
            this.snackBar.openFromComponent(ImportSuccessfulComponent, {duration: 5000});
        }

        if (petriNetResult.model !== undefined) {
            this.modelService.model = petriNetResult.model;
            this.historyService.save(`Model ${this.modelService.model.id} has been imported.`)
        }
        this._builderModeService.mode = BuilderMode.MODELER;
    }
}
