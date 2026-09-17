import {ResetArc as SvgResetArc} from '@netgrif/petri.svg';
import {ArcType} from '@netgrif/petriflow';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {CreatePTArc} from './create-ptarc';
import {CanvasToolContext} from './canvas-tool-context';
import {TranslateService} from "@ngx-translate/core";

export class CreateResetArcTool extends CreatePTArc {

    public static ID = 'CreateResetArcTool';

    constructor(context: CanvasToolContext, translateService: TranslateService) {
        super(
            CreateResetArcTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('resetarc', true),
                translateService.instant('builder.modeler.edit-mode.services.resetArc'),
            ),
            context,
            translateService
        );
    }

    getMarkerId(): string {
        return SvgResetArc.ID;
    }

    arcType(): ArcType {
        return ArcType.RESET;
    }
}
