import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {TriggerTreeComponent} from './trigger-tree.component';

describe('TriggerTreeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TriggerTreeComponent],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(TriggerTreeComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
