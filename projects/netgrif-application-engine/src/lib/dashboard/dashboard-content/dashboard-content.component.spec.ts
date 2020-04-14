import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardContentComponent} from './dashboard-content.component';
import {MatGridListModule} from '@angular/material';
import {DashboardModule} from '../dashboard.module';
import {Component} from '@angular/core';
import {DashboardParams} from './dashboard-params';

describe('DashboardContentComponent', () => {
    let component: DashboardContentComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatGridListModule, DashboardModule],
            declarations: [TestWrapperComponent]
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
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-dashboard-content [params]="params"></nae-dashboard-content>'
})
class TestWrapperComponent {
    public params: DashboardParams = {
        cards: [],
        columns: 1
    };
}
