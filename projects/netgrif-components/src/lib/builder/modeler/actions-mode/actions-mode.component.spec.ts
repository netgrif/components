import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ActionsMasterDetailService} from './actions-master-detail.service';
import {ActionsModeComponent} from './actions-mode.component';

describe('ActionsModeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ActionsModeComponent],
            providers: [{provide: ActionsMasterDetailService, useValue: {}}],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(ActionsModeComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
