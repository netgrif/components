import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppearanceService, darkColorScheme$, LanguageService} from '@netgrif/components-core';
import {DEMO_GROUPS} from './playground/demos';

@Component({
    selector: 'ne-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class AppComponent implements OnDestroy {
    readonly groups = DEMO_GROUPS;
    mobile = false;
    dark = false;

    private _breakpointSub: Subscription;
    private _darkSub: Subscription;

    /**
     * The stored appearance and light / dark choice are restored at the start by `provideNaeMaterialDefaults()`.
     */
    constructor(breakpoints: BreakpointObserver, language: LanguageService, private _appearance: AppearanceService) {
        // registers the bundled translations of the library
        language.setLanguage('en');
        this._breakpointSub = breakpoints.observe('(max-width: 899.98px)')
            .pipe(map(state => state.matches))
            .subscribe(mobile => this.mobile = mobile);
        this._darkSub = darkColorScheme$().subscribe(dark => this.dark = dark);
    }

    ngOnDestroy(): void {
        this._breakpointSub.unsubscribe();
        this._darkSub.unsubscribe();
    }

    toggleTheme(): void {
        this._appearance.toggleDarkMode();
    }
}
