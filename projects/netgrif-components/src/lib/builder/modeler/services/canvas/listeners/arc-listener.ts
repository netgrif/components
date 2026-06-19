import {CanvasArc} from '../../../edit-mode/domain/canvas-arc';

export interface ArcListener {

    onArcDown(event: MouseEvent, arc: CanvasArc): void;

    onArcUp(event: MouseEvent, arc: CanvasArc): void;

    onArcEnter(event: MouseEvent, arc: CanvasArc): void;

    onArcLeave(event: MouseEvent, arc: CanvasArc): void;

    onArcMove(event: MouseEvent, arc: CanvasArc): void;
}
