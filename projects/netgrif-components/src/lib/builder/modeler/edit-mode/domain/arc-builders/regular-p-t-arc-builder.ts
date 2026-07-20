import {
  Place as SvgPlace,
  RegularPlaceTransitionArc as SvgRegularPlaceTransitionArc,
  Transition as SvgTransition,
} from '@netgrif/petri.svg';
import {Place, RegularPlaceTransitionArc, Transition} from '@netgrif/petriflow';
import {PetriflowPlaceTransitionArc} from '@netgrif/petriflow.svg';
import {ArcBuilder} from './arc-builder';

export class RegularPTArcBuilder extends ArcBuilder<PetriflowPlaceTransitionArc, RegularPlaceTransitionArc> {

    public modelArc(id: string, source: Place, target: Transition): RegularPlaceTransitionArc {
        return new RegularPlaceTransitionArc(source, target, id);
    }

    public svgArc(id: string, source: SvgPlace, target: SvgTransition): PetriflowPlaceTransitionArc {
        return new PetriflowPlaceTransitionArc(new SvgRegularPlaceTransitionArc(id, source, target));
    }
}
