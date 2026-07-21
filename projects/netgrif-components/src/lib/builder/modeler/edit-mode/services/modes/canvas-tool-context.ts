import {NgZone} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ActionsMasterDetailService} from '../../../actions-mode/actions-master-detail.service';
import {ActionsModeService} from '../../../actions-mode/actions-mode.service';
import {SelectedTransitionService} from '../../../selected-transition.service';
import {ModelService} from '../../../services/model/model.service';
import {EditModeService} from '../../edit-mode.service';
import {BuilderModeService} from '../../../../services/builder-mode.service';
import {ProcessActionsTool} from "../../../actions-mode/tools/process-actions-tool";
import {BuilderIntegrationService} from "../../../../services/builder-integration.service";

export class CanvasToolContext {
    constructor(
        public readonly modelService: ModelService,
        public readonly dialog: MatDialog,
        public readonly editModeService: EditModeService,
        public readonly router: Router,
        public readonly transitionService: SelectedTransitionService,
        public readonly actionMode: ActionsModeService,
        public readonly actionsMasterDetail: ActionsMasterDetailService,
        public readonly builderModeService: BuilderModeService,
        public readonly processTool: ProcessActionsTool,
        public readonly builderIntegrationService: BuilderIntegrationService,
        public readonly ngZone: NgZone
    ) {}
}
