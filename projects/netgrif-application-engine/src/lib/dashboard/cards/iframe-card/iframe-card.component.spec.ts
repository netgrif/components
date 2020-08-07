import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IframeCardComponent} from './iframe-card.component';
import {Component} from '@angular/core';
import {DashboardCardTypes} from '../model/dashboard-card-types';
import {IframeCard} from '../model/iframe-card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('IframeCardComponent', () => {
    let component: IframeCardComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatCardModule, FlexLayoutModule, NoopAnimationsModule],
            declarations: [IframeCardComponent, TestWrapperComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-iframe-card [card]="card"></nae-iframe-card>'
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
        type: DashboardCardTypes.IFRAME
    };
}
