import {NodeElement as SvgNodeElement} from '@netgrif/petri.svg';
import {Arc, NodeElement} from '@netgrif/petriflow';
import {PetriflowArc} from '@netgrif/petriflow.svg/lib/svg-elements/petriflow-arc';
import {Identifiable} from '../identifiable';

export abstract class ArcBuilder<T extends PetriflowArc<any>, U extends Arc<NodeElement, NodeElement>> extends Identifiable {

    public abstract modelArc(id: string, source: NodeElement, destination: NodeElement): U;

    public abstract svgArc(id: string, source: SvgNodeElement, destination: SvgNodeElement): T;
}
