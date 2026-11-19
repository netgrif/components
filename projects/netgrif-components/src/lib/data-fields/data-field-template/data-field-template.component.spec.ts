import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {DataFieldTemplateComponent} from './data-field-template.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {
    MaterialModule,
    ConfigurationService,
    TestConfigurationService,
    ViewService,
    TestViewService,
    TextField
} from '@netgrif/components-core';

describe('DataFieldTemplateComponent', () => {
    let component: DataFieldTemplateComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule],
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
    template: '<nc-data-field-template [dataField]="field"></nc-data-field-template>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    field = new TextField('', '', '', {});
}
