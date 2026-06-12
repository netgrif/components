import { Component } from '@angular/core';
import {BuilderMode, BuilderModeService} from "./builder-mode.service";
import {ModelService} from "./modeler/services/model/model.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {ImportService} from "@netgrif/petriflow";
import {EditModeService} from "./modeler/edit-mode/edit-mode.service";
import {HistoryService} from "./modeler/services/history/history.service";
import {ControlPanelService} from "./modeler/control-panel/control-panel.service";

@Component({
  selector: 'nc-builder',
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss'
})
export class BuilderComponent {
    public typeMode = BuilderMode;

    constructor(private modelService: ModelService, private router: Router,
                public dialog: MatDialog,
                private route: ActivatedRoute,
                private httpClient: HttpClient,
                private _importService: ImportService,
                private _petriflowCanvasService: EditModeService,
                private historyService: HistoryService,
                public builderModeService: BuilderModeService) {
        this.route.queryParams.subscribe(params => {
            if (params.modelUrl) {
                httpClient.get(params.modelUrl, {
                    responseType: 'text'
                }).subscribe(data => {
                    try {
                        const model = this._importService.parseFromXml(data as string)?.model;
                        if (model) {
                            this.modelService.model = model;
                            this.historyService.save(`Model ${this.modelService.model.id} has been imported.`);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    this.builderModeService.mode = BuilderMode.MODELER;
                }, error => {
                    console.log(error);
                    this.builderModeService.mode = BuilderMode.MODELER;
                });
            }
        });
        if (!this.modelService.model) {
            this.modelService.model = this.modelService.newModel();
            this.historyService.save(`New model has been created.`);
        }
    }
}
