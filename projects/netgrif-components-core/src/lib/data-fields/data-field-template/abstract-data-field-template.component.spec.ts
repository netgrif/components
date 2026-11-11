import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AngularResizeEventModule} from 'angular-resize-event';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Injector} from '@angular/core';
import {AbstractDataFieldTemplateComponent} from './abstract-data-field-template.component';
import {TextField} from '../text-field/models/text-field';
import {ViewService} from '../../routing/view-service/view.service';
import {TestViewService} from '../../utility/tests/test-view-service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {ConfigurationService} from '../../configuration/configuration.service';
import {MaterialModule} from '../../material/material.module';
import {PaperViewService} from '../../navigation/quick-panel/components/paper-view.service';
import {ComponentRegistryService} from "../../registry/component-registry.service";
import {ComponentPortal} from '@angular/cdk/portal';
import {EnumerationField} from '../enumeration-field/models/enumeration-field';

describe('AbstractDataFieldTemplateComponent', () => {
    let component: TestDatafieldTemplateComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizeEventModule, NoopAnimationsModule],
            declarations: [TestDatafieldTemplateComponent, TestWrapperComponent, TestDataFieldComponent,
                TestExactDataFieldComponent],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                ComponentRegistryService,
                Injector
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

    it('should use the default data field component when the requested component is not registered', () => {
        const registry = TestBed.inject(ComponentRegistryService);
        registry.register('enumeration-default', injector => new ComponentPortal(TestDataFieldComponent, null, injector));

        component.dataField = new EnumerationField('', '', 'Approved', [], {}, undefined, undefined,
            undefined, undefined, [], {name: 'totok'});

        expect(component.componentPortal).toBeTruthy();
        expect(component.componentPortal.component).toBe(TestDataFieldComponent);
    });

    it('should prefer the requested data field component over the default component', () => {
        const registry = TestBed.inject(ComponentRegistryService);
        registry.register('enumeration-default', injector => new ComponentPortal(TestDataFieldComponent, null, injector));
        registry.register('enumeration-totok', injector => new ComponentPortal(TestExactDataFieldComponent, null, injector));

        component.dataField = new EnumerationField('', '', 'Approved', [], {}, undefined, undefined,
            undefined, undefined, [], {name: 'totok'});

        expect(component.componentPortal.component).toBe(TestExactDataFieldComponent);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-datafield-template',
    template: ''
})
class TestDatafieldTemplateComponent extends AbstractDataFieldTemplateComponent {
    constructor(protected _paperView: PaperViewService,
                protected _config: ConfigurationService,
                protected _componentRegistry: ComponentRegistryService,
                protected injector: Injector) {
        super(_paperView, _config, _componentRegistry, injector);
    }
}

@Component({
    selector: 'ncc-test-data-field',
    template: ''
})
class TestDataFieldComponent {
}

@Component({
    selector: 'ncc-test-exact-data-field',
    template: ''
})
class TestExactDataFieldComponent {
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-datafield-template [dataField]="field"></ncc-test-datafield-template>'
})
class TestWrapperComponent {
    field = new TextField('', '', '', {});
}
