import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardContentComponent} from './dashboard-content.component';
import {DashboardComponentModule} from '../dashboard.module';
import {Component} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigurationService, TestConfigurationService, DashboardParams} from '@netgrif/application-engine';

describe('DashboardContentComponent', () => {
    let component: DashboardContentComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatGridListModule, DashboardComponentModule, NoopAnimationsModule],
            declarations: [TestWrapperComponent],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
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
    selector: 'nc-test-wrapper',
    template: '<nc-dashboard-content [params]="params"></nc-dashboard-content>'
})
class TestWrapperComponent {
    public params: DashboardParams = {
        cards: [],
        columns: 1
    };
}
