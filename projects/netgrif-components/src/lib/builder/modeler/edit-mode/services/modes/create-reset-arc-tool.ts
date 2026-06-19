import {ResetArc as SvgResetArc} from '@netgrif/petri.svg';
import {ArcType} from '@netgrif/petriflow';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {CreatePTArc} from './create-ptarc';
import {CanvasToolContext} from './canvas-tool-context';

export class CreateResetArcTool extends CreatePTArc {

    public static ID = 'CreateResetArcTool';

    constructor(context: CanvasToolContext) {
        super(
            CreateResetArcTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('resetarc', true),
                'Reset Arc',
            ),
            context
        );
    }

    getMarkerId(): string {
        return SvgResetArc.ID;
    }

    arcType(): ArcType {
        return ArcType.RESET;
    }
}
