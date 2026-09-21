import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {IframeCardComponent} from './iframe-card.component';
import {Component} from '@angular/core';
import {DashboardCardTypes, IframeCard} from '@netgrif/components-core';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {MatCardModule} from '@angular/material/card';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('IframeCardComponent', () => {
    let component: IframeCardComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-iframe-card [card]="card"></nc-iframe-card>'
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
