import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule, FlexModule} from '@ngbracket/ngx-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {MaterialModule} from '../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {AbstractNavigationRailComponent} from './abstract-navigation-rail.component';

describe('AbstractNavigationRailComponent', () => {
    let component: TestRailComponent;
    let fixture: ComponentFixture<TestRailComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestRailComponent],
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                FlexModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestRailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open, close and toggle', () => {
        let count = 0;
        component.expandChange.subscribe(res  => {
            if (count % 2 === 0) {
                expect(res).toEqual(true);
            } else {
                expect(res).toEqual(false);
            }
            count++;
        });

        component.open();
        component.close();
        component.toggle();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-nav-rail',
    template: ''
})
class TestRailComponent extends AbstractNavigationRailComponent {
    constructor() {
        super();
    }
}
