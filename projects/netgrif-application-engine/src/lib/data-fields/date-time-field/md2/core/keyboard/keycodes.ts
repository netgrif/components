// Due to a bug in the ChromeDriver, Angular keyboard events are not triggered by `sendKeys`
// during E2E tests when using dot notation such as `(keydown.rightArrow)`. To get around this,
// we are temporarily using a single (keydown) handler.
// See: https://github.com/angular/angular/issues/9419

export const UP_ARROW = 'ArrowUp';
export const DOWN_ARROW = 'ArrowDown';
export const RIGHT_ARROW = 'ArrowRight';
export const LEFT_ARROW = 'ArrowLeft';

export const PAGE_UP = 'PageUp';
export const PAGE_DOWN = 'PageDown';

export const HOME = 'Home';
export const END = 'End';

export const ENTER = 'Enter';
export const SPACE = 'Space';

export const ESCAPE = 'Escape';
