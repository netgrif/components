import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {PaperComponent} from './paper.component';

describe('PaperComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PaperComponent],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(PaperComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
