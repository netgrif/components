import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {HistoryMasterDetailService} from './history-master-detail.service';
import {HistoryModeComponent} from './history-mode.component';

describe('HistoryModeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HistoryModeComponent],
            providers: [{provide: HistoryMasterDetailService, useValue: {}}],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(HistoryModeComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
