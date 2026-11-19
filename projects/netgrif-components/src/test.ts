import {NgModule, provideZoneChangeDetection} from '@angular/core';
import {getTestBed} from '@angular/core/testing';
import {BrowserTestingModule, platformBrowserTesting} from '@angular/platform-browser/testing';

@NgModule({providers: [provideZoneChangeDetection()]})
class ZoneTestModule {
}

getTestBed().initTestEnvironment([BrowserTestingModule, ZoneTestModule], platformBrowserTesting(), {
    teardown: { destroyAfterEach: false }
}
);
