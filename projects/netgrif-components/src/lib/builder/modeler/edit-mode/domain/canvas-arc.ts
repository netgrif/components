import {Arc as SvgArc} from '@netgrif/petri.svg';
import {Arc, NodeElement} from '@netgrif/petriflow';
import {PetriflowArc} from '@netgrif/petriflow.svg';
import {ModelerConfig} from '../../modeler-config';
import {CanvasObject} from './canvas-object';

export class CanvasArc extends CanvasObject<Arc<NodeElement, NodeElement>, PetriflowArc<SvgArc>> {

    get id(): string {
        return this.modelArc.id;
    }

    get modelArc(): Arc<NodeElement, NodeElement> {
        return this.modelObject;
    }

    set modelArc(value: Arc<NodeElement, NodeElement>) {
        this.modelObject = value;
    }

    get svgArc(): PetriflowArc<SvgArc> {
        return this.svgObject;
    }

    set svgArc(value: PetriflowArc<SvgArc>) {
        this.svgObject = value;
    }

    getBounds(): DOMRect {
        return this.svgArc.element.container.getBBox();
    }

    public removeBreakpoint(index: number) {
        this.svgArc.getBreakPointList().splice(index, 1);
        this.svgArc.element.updateLine();
    }

    /**
     * Returns index of nearby breakpoint or undefined if no breakpoint is near the position
     */
    public findNearbyBreakpoint(position: DOMPoint): number {
        let index: number;
        this.svgArc.getBreakPointList().forEach((point, pointIndex) => {
            if (this.isNearby(point, position)) {
                index = pointIndex;
            }
        });
        return index;
    }

    private isNearby(point: DOMPoint, mouse: DOMPoint): boolean {
        return Math.abs(point.x - mouse.x) <= ModelerConfig.ARC_BREAKPOINT_OFFSET
            && Math.abs(point.y - mouse.y) <= ModelerConfig.ARC_BREAKPOINT_OFFSET;
    }
}
