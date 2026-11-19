import {Observable} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

/**
 * Whether the page is in dark mode: `html.dark-theme` / `html.light-theme` (set by the light / dark mode switch, see
 * {@link AppearanceService#setDarkMode}) override the color scheme of the operating system, see `nae.theme()`.
 */
export function isDarkColorScheme(): boolean {
    const root = document.documentElement;
    if (root.classList.contains('dark-theme')) {
        return true;
    }
    if (root.classList.contains('light-theme')) {
        return false;
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

/**
 * Emits {@link isDarkColorScheme} now and on every change (toggle of the html class or of the OS color scheme).
 * Used by parts that can't follow the CSS color scheme by themselves, e.g. the Monaco editor theme or a switch label.
 */
export function darkColorScheme$(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
        const emit = () => subscriber.next(isDarkColorScheme());
        const observer = new MutationObserver(emit);
        observer.observe(document.documentElement, {attributes: true, attributeFilter: ['class']});
        const media = window.matchMedia?.('(prefers-color-scheme: dark)');
        media?.addEventListener('change', emit);
        emit();
        return () => {
            observer.disconnect();
            media?.removeEventListener('change', emit);
        };
    }).pipe(distinctUntilChanged());
}
