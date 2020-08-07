import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardContentComponent} from './dashboard-content.component';
import {DashboardModule} from '../dashboard.module';
import {Component} from '@angular/core';
import {DashboardParams} from './dashboard-params';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MatGridListModule} from '@angular/material/grid-list';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('DashboardContentComponent', () => {
    let component: DashboardContentComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatGridListModule, DashboardModule, NoopAnimationsModule],
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
    selector: 'nae-test-wrapper',
    template: '<nae-dashboard-content [params]="params"></nae-dashboard-content>'
})
class TestWrapperComponent {
    public params: DashboardParams = {
        cards: [],
        columns: 1
    };
}
