import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ControlPanelService} from './control-panel.service';
import {GlobalToolRegistry} from './tools/global-tool-registry';
import {ControlPanelComponent} from './control-panel.component';

describe('ControlPanelComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ControlPanelComponent],
            providers: [
                {provide: GlobalToolRegistry, useValue: {switchTools: [], tools: []}},
                {provide: ControlPanelService, useValue: {}},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(ControlPanelComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
