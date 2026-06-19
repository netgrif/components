import {
  Place as SvgPlace,
  RegularTransitionPlaceArc as SvgRegularTransitionPlaceArc,
  Transition as SvgTransition,
} from '@netgrif/petri.svg';
import {Place, RegularTransitionPlaceArc, Transition} from '@netgrif/petriflow';
import {PetriflowTransitionPlaceArc} from '@netgrif/petriflow.svg';
import {ArcBuilder} from './arc-builder';

export class RegularTPArcBuilder extends ArcBuilder<PetriflowTransitionPlaceArc, RegularTransitionPlaceArc> {

    public modelArc(id: string, source: Transition, target: Place): RegularTransitionPlaceArc {
        return new RegularTransitionPlaceArc(source, target, id);
    }

    public svgArc(id: string, source: SvgPlace, target: SvgTransition): PetriflowTransitionPlaceArc {
        return new PetriflowTransitionPlaceArc(new SvgRegularTransitionPlaceArc(id, source, target));
    }
}
