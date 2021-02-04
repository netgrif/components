import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {DataFieldTemplateComponent} from './data-field-template.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AngularResizedEventModule} from 'angular-resize-event';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
    MaterialModule,
    ConfigurationService,
    TestConfigurationService,
    ViewService,
    TestViewService,
    TextField
} from '@netgrif/application-engine';

describe('DataFieldTemplateComponent', () => {
    let component: DataFieldTemplateComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizedEventModule, NoopAnimationsModule],
            declarations: [DataFieldTemplateComponent, TestWrapperComponent],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService}
                ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
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
    template: '<nc-data-field-template [dataField]="field"></nc-data-field-template>'
})
class TestWrapperComponent {
    field = new TextField('', '', '', {});
}
