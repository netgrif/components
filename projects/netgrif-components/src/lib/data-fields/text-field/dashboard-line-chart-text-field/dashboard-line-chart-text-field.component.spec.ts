import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {DashboardLineChartTextFieldComponent} from './dashboard-line-chart-text-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    TextField,
    TranslateLibModule,
    UserResourceService,
    WrappedBoolean
} from '@netgrif/components-core';
import {FormControl} from '@angular/forms';
import {AngularResizeEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DashboardLineChartTextFieldComponent', () => {
    let component: DashboardLineChartTextFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService}
            ],
            declarations: [DashboardLineChartTextFieldComponent, TestWrapperComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: `
        <nc-dashboard-line-chart-text-field [showLargeLayout]="label"
                                            [dataField]="field"
                                            [formControlRef]="formControl">
        </nc-dashboard-line-chart-text-field>`
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    value = `{
        "title": "Line chart",
        "query": {
            "aggs": {
                "result1": {
                    "terms": {
                        "field": "title.keyword"
                    }
                },
                "result2": {
                    "terms": {
                        "field": "title.keyword"
                    }
                }
            }
        },
        "xAxisLabel": "X-axis",
        "yAxisLabel": "Y-axis"
    }`;
    field = new TextField('', '', this.value, {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, []);
    formControl = new FormControl();

    constructor() {
        this.field.registerFormControl(this.formControl);
    }
}
