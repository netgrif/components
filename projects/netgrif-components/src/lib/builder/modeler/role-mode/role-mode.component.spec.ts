import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {RoleMasterDetailService} from './role-master-detail.service';
import {RoleModeComponent} from './role-mode.component';

describe('RoleModeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RoleModeComponent],
            providers: [{provide: RoleMasterDetailService, useValue: {}}],
            schemas: [NO_ERRORS_SCHEMA],
        });
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should create', () => {
        const fixture = TestBed.createComponent(RoleModeComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });
});
