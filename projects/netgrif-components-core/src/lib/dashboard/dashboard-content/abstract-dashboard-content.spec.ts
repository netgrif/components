import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatGridListModule} from '@angular/material/grid-list';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {AbstractDashboardContentComponent} from './abstract-dashboard-content';
import {LoggerService} from '../../logger/services/logger.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {DashboardParams} from './dashboard-params';

describe('AbstractDashboardContentComponent', () => {
    let component: TestDashboardContentComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MatGridListModule, NoopAnimationsModule],
            declarations: [TestDashboardContentComponent, TestWrapperComponent],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
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
    selector: 'ncc-test-dashboard',
    template: ''
})
class TestDashboardContentComponent extends AbstractDashboardContentComponent {
    constructor(protected _log: LoggerService) {
        super(_log);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-dashboard [params]="params"></ncc-test-dashboard>'
})
class TestWrapperComponent {
    public params: DashboardParams = {
        cards: [],
        columns: 1
    };
}
