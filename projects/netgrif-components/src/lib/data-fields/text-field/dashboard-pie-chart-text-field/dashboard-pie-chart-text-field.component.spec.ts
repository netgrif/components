import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {DashboardPieChartTextFieldComponent} from './dashboard-pie-chart-text-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
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
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('DashboardPieChartTextFieldComponent', () => {
    let component: DashboardPieChartTextFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                DashboardPieChartTextFieldComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
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
        <nc-dashboard-pie-chart-text-field
            [showLargeLayout]="label"
            [dataField]="field"
            [formControlRef]="formControl"
        >
        </nc-dashboard-pie-chart-text-field>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    label = new WrappedBoolean();
    value = `{
        "title": "Pie chart",
        "query": {
            "aggs": {
                "result": {
                    "terms": {
                        "field": "title.keyword"
                    }
                }
            }
        }
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
