import {HttpClient} from '@angular/common/http';
import {Component, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSidenav} from '@angular/material/sidenav';
import {MatTabGroup} from '@angular/material/tabs';
import {ActivatedRoute, Router} from '@angular/router';
import {ImportService, PetriNet as PetriflowPetriNet} from '@netgrif/petriflow';
import {EditModeService} from './edit-mode/edit-mode.service';
import {HistoryService} from './services/history/history.service';
import {ModelService} from './services/model/model.service';
import {ControlPanelService} from "./control-panel/control-panel.service";
import {BuilderModeService, BuilderMode} from "../services/builder-mode.service";

@Component({
    selector: 'nc-builder-modeler',
    templateUrl: './modeler.component.html',
    styleUrls: ['./modeler.component.scss']
})
export class ModelerComponent {
    width: number;
    projectModels: Array<PetriflowPetriNet>;

    @ViewChild('tabs') tabGroup: MatTabGroup;
    @ViewChild('sidenav') nav: MatSidenav;

    constructor(
        private modelService: ModelService, private router: Router,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private httpClient: HttpClient,
        private _importService: ImportService,
        private _petriflowCanvasService: EditModeService,
        private historyService: HistoryService,
        public controlPanelService: ControlPanelService,
        private _builderModeService: BuilderModeService,
    ) {

    }
}
