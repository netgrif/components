import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskRefDashboardFieldComponent} from './task-ref-dashboard-field.component';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService, TaskRefField,
    TestConfigurationService,
    UserResourceService
} from "@netgrif/components-core";
import {Component} from "@angular/core";
import {TaskContentComponent} from "../../../task-content/task-content/task-content.component";
import {FormControl} from "@angular/forms";

describe('TaskRefDashboardFieldComponent', () => {
    let component: TaskRefDashboardFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskRefDashboardFieldComponent],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService}
            ]
        })
            .compileComponents();
    });

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
    selector: 'nc-test-wrapper',
    template: `
        <nc-task-ref-dashboard-field [dataField]="field"
                                     [formControlRef]="formControl"
                                    [gdColumn]="'1 / 2'"
                                    [gdRow]="'1 / 2'">
        </nc-task-ref-dashboard-field>`
})
class TestWrapperComponent {
    tile = {
        dataGroups: [],
        x: 1,
        y: 1,
        rows: 1,
        cols: 1,
        isEmpty: false
    };
    taskContentComponentClass = TaskContentComponent;
    value = `https://netgrif.com/`;
    field = new TaskRefField('', '', ['633c6187bb12a90925e0a17e'], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, []);
    formControl = new FormControl();

    constructor() {
        this.field.dashboardRows = 2;
        this.field.dashboardCols = 2;
        this.field.dashboardTiles = [this.tile];
        this.field.registerFormControl(this.formControl);
    }
}
