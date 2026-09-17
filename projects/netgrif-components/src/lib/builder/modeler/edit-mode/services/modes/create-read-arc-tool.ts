import {ReadArc as SvgReadArc} from '@netgrif/petri.svg';
import {ArcType} from '@netgrif/petriflow';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {CreatePTArc} from './create-ptarc';
import {CanvasToolContext} from './canvas-tool-context';
import {TranslateService} from "@ngx-translate/core";

export class CreateReadArcTool extends CreatePTArc {

    public static ID = 'CreateReadArcTool';

    constructor(context: CanvasToolContext, translateService: TranslateService) {
        super(
            CreateReadArcTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('read', true),
                translateService.instant('builder.modeler.edit-mode.services.readArc'),
            ),
            context,
            translateService
        );
    }

    getMarkerId(): string {
        return SvgReadArc.ID;
    }

    arcType(): ArcType {
        return ArcType.READ;
    }
}
