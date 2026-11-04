import {TestBed} from '@angular/core/testing';
import {NAE_CASE_PANEL_CONFIGURATION} from './case-panel-configuration-injection-token';

describe('NAE_CASE_PANEL_CONFIGURATION', () => {
    afterEach(() => TestBed.resetTestingModule());

    it('should show the case panel icon by default', () => {
        expect(TestBed.inject(NAE_CASE_PANEL_CONFIGURATION).showCasePanelIcon).toBeTrue();
    });

    it('should support an application-level override', () => {
        TestBed.configureTestingModule({
            providers: [
                {provide: NAE_CASE_PANEL_CONFIGURATION, useValue: {showCasePanelIcon: false}}
            ]
        });

        expect(TestBed.inject(NAE_CASE_PANEL_CONFIGURATION).showCasePanelIcon).toBeFalse();
    });
});
