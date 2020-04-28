import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InternalLinkComponent} from './internal-link.component';
import {MaterialModule} from '../../../../material/material.module';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';

describe('InternalLinkComponent', () => {
    let component: InternalLinkComponent;
    let fixture: ComponentFixture<InternalLinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InternalLinkComponent],
            imports: [
                CommonModule,
                RouterTestingModule,
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

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
