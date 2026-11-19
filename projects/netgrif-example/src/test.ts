// Initializes the Angular testing environment. The @angular/build:karma builder collects the *.spec.ts files
// itself (option "include"); zone.js and zone.js/testing are loaded through the "polyfills" option.
import {NgModule, provideZoneChangeDetection} from '@angular/core';
import {getTestBed} from '@angular/core/testing';
import {BrowserTestingModule, platformBrowserTesting} from '@angular/platform-browser/testing';

// TestBed is zoneless by default since Angular 21, the app bootstraps with provideZoneChangeDetection() (main.ts)
@NgModule({providers: [provideZoneChangeDetection()]})
class ZoneTestModule {
}

getTestBed().initTestEnvironment([BrowserTestingModule, ZoneTestModule], platformBrowserTesting(), {
    teardown: {destroyAfterEach: true},
});
