import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {InternalLinkComponent} from './internal-link.component';
import {MaterialModule} from '@netgrif/components-core';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';

describe('InternalLinkComponent', () => {
    let component: InternalLinkComponent;
    let fixture: ComponentFixture<InternalLinkComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [InternalLinkComponent],
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InternalLinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
