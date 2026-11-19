import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {IframeCard} from '../model/iframe-card';
import {DashboardCardTypes} from '../model/dashboard-card-types';
import {AbstractIframeCardComponent} from './abstract-iframe-card';
import {DomSanitizer} from '@angular/platform-browser';

describe('AbstractIframeCardComponent', () => {
    let component: TestIframeCardComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MatCardModule, FlexLayoutModule],
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
    selector: 'ncc-test-iframe-card',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestIframeCardComponent extends AbstractIframeCardComponent {
    constructor(protected _sanitizer: DomSanitizer) {
        super(_sanitizer);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-iframe-card [card]="card"></ncc-test-iframe-card>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
