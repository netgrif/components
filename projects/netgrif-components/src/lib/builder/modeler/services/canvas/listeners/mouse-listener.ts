export interface MouseListener {

    /**
     * Triggers when a mouse button is pressed over the element
     */
    onMouseDown(event: PointerEvent): void;

    /**
     * Triggers when a mouse button is released over the element
     */
    onMouseUp(event: PointerEvent): void;

    /**
     * Triggers when the mouse pointer enters the element
     */
    onMouseEnter(event: PointerEvent): void;

    /**
     * Triggers when the mouse pointer enters the element
     */
    onMouseLeave(event: PointerEvent): void;

    /**
     * Triggers every time the mouse pointer is moved over the element
     */
    onMouseMove(event: PointerEvent): void;

    /**
     * Triggers when the mouse pointer leaves the element and its child elements
     */
    onMouseOut(event: PointerEvent): void;

    /**
     * Triggers when the mouse pointer enters the element and its child elements
     */
    onMouseOver(event: PointerEvent): void;
}
