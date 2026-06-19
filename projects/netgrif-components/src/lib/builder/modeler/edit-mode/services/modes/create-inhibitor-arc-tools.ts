import {InhibitorArc as SvgInhibitorArc} from '@netgrif/petri.svg';
import {ArcType} from '@netgrif/petriflow';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {CreatePTArc} from './create-ptarc';
import {CanvasToolContext} from './canvas-tool-context';

export class CreateInhibitorArcTool extends CreatePTArc {

    public static ID = 'CreateInhibitorArcTool';

    constructor(context: CanvasToolContext) {
        super(
            CreateInhibitorArcTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('inhibitor', true),
                'Inhibitor Arc',
            ),
            context
        );
    }

    getMarkerId(): string {
        return SvgInhibitorArc.ID;
    }

    arcType(): ArcType {
        return ArcType.INHIBITOR;
    }
}
