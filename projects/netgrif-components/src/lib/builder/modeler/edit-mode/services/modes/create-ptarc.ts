import {ArcType} from '@netgrif/petriflow';
import {CanvasArc} from '../../domain/canvas-arc';
import {CanvasPlace} from '../../domain/canvas-place';
import {CanvasTransition} from '../../domain/canvas-transition';
import {CreateArcTool} from './create-arc-tool';

export abstract class CreatePTArc extends CreateArcTool<CanvasPlace> {

    public abstract arcType(): ArcType;

    public abstract getMarkerId(): string;

    startDrawingArc(place: CanvasPlace): void {
        this.source = place;
        this.arcLine = this.editModeService.createTemporaryArc(place.svgPlace.getPosition(), this.getMarkerId());
    }

    finishDrawingArc(createArcFunction: () => CanvasArc) {
        const canvasArc = createArcFunction();
        this.bindArc(canvasArc);
        this.reset();
    }

    onPlaceUp(event: PointerEvent, place: CanvasPlace): void {
        super.onPlaceUp(event, place);
        if (this.isWorkInProgress()) {
            return;
        }
        if (this.isLeftButtonClick(event)) {
            this.startDrawingArc(place);
        }
    }

    onTransitionUp(event: PointerEvent, transition: CanvasTransition): void {
        super.onTransitionUp(event, transition);
        if (!this.isWorkInProgress()) {
            return;
        }
        if (this.isLeftButtonClick(event)) {
            this.finishDrawingArc(() => this.createArc(this.arcType(), this.source, transition));
        }
    }
}
