import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {IframeCard} from '../model/iframe-card';
import {DashboardCardTypes} from '../model/dashboard-card-types';
import {AbstractIframeCard} from './abstract-iframe-card';
import {DomSanitizer} from '@angular/platform-browser';

describe('AbstractIframeCardComponent', () => {
    let component: TestIframeCardComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MatCardModule, FlexLayoutModule, NoopAnimationsModule],
            declarations: [TestIframeCardComponent, TestWrapperComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
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
    selector: 'nae-test-iframe-card',
    template: ''
})
class TestIframeCardComponent extends AbstractIframeCard {
    constructor(protected _sanitizer: DomSanitizer) {
        super(_sanitizer);
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-iframe-card [card]="card"></nae-test-iframe-card>'
})
class TestWrapperComponent {
    card: IframeCard = {
        url: '',
        layout: {
            x: 0,
            y: 0,
            cols: 1,
            rows: 1,
        },
        type: DashboardCardTypes.IFRAME,
        portalComponent: null
    };
}
