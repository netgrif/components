import {InhibitorArc as SvgInhibitorArc, Place as SvgPlace, Transition as SvgTransition} from '@netgrif/petri.svg';
import {InhibitorArc, Place, Transition} from '@netgrif/petriflow';
import {PetriflowInhibitorArc} from '@netgrif/petriflow.svg';
import {ArcBuilder} from './arc-builder';

export class InhibitorArcBuilder extends ArcBuilder<PetriflowInhibitorArc, InhibitorArc> {

    public svgArc(id: string, source: SvgPlace, target: SvgTransition): PetriflowInhibitorArc {
        return new PetriflowInhibitorArc(new SvgInhibitorArc(id, source, target));
    }

    public modelArc(id: string, source: Place, target: Transition): InhibitorArc {
        return new InhibitorArc(source, target, id);
    }
}
