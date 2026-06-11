import {Place as SvgPlace, ResetArc as SvgResetArc, Transition as SvgTransition} from '@netgrif/petri.svg';
import {Place, ResetArc, Transition} from '@netgrif/petriflow';
import {PetriflowResetArc} from '@netgrif/petriflow.svg';
import {ArcBuilder} from './arc-builder';

export class ResetArcBuilder extends ArcBuilder<PetriflowResetArc, ResetArc> {

    public modelArc(id: string, source: Place, target: Transition): ResetArc {
        return new ResetArc(source, target, id);
    }

    public svgArc(id: string, source: SvgPlace, target: SvgTransition): PetriflowResetArc {
        return new PetriflowResetArc(new SvgResetArc(id, source, target));
    }
}
