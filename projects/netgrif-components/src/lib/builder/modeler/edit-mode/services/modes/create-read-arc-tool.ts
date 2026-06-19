import {ReadArc as SvgReadArc} from '@netgrif/petri.svg';
import {ArcType} from '@netgrif/petriflow';
import {ControlPanelButton} from '../../../control-panel/control-panel-button';
import {ControlPanelIcon} from '../../../control-panel/control-panel-icon';
import {CreatePTArc} from './create-ptarc';
import {CanvasToolContext} from './canvas-tool-context';

export class CreateReadArcTool extends CreatePTArc {

    public static ID = 'CreateReadArcTool';

    constructor(context: CanvasToolContext) {
        super(
            CreateReadArcTool.ID,
            new ControlPanelButton(
                new ControlPanelIcon('read', true),
                'Read Arc',
            ),
            context
        );
    }

    getMarkerId(): string {
        return SvgReadArc.ID;
    }

    arcType(): ArcType {
        return ArcType.READ;
    }
}
