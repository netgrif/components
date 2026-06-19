export interface KeyListener {

    onKeyDown(event: KeyboardEvent): void;

    onKeyUp(event: KeyboardEvent): void;

    bindKeys(): void;

    unbindKeys(): void;
}
