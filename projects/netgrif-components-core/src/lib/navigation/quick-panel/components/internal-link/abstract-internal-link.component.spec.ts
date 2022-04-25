import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../../../material/material.module';
import {Component} from '@angular/core';
import {AbstractInternalLinkComponent} from './abstract-internal-link.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AbstractInternalLinkComponent', () => {
    let component: TestLinkComponent;
    let fixture: ComponentFixture<TestLinkComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestLinkComponent],
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                NoopAnimationsModule,
                HttpClientTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestLinkComponent);
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

@Component({
    selector: 'nae-test-nav-tree',
    template: ''
})
class TestLinkComponent extends AbstractInternalLinkComponent {
    constructor() {
        super();
    }
}
