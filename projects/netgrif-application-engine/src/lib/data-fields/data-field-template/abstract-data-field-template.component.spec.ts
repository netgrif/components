import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AngularResizedEventModule} from 'angular-resize-event';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AbstractDataFieldTemplateComponent} from './abstract-data-field-template.component';
import {TextField} from '../text-field/models/text-field';
import {ViewService} from '../../routing/view-service/view.service';
import {TestViewService} from '../../utility/tests/test-view-service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {ConfigurationService} from '../../configuration/configuration.service';
import {MaterialModule} from '../../material/material.module';
import {PaperViewService} from '../../navigation/quick-panel/components/paper-view.service';

describe('AbstractDataFieldTemplateComponent', () => {
    let component: TestDatafieldTemplateComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizedEventModule, NoopAnimationsModule],
            declarations: [TestDatafieldTemplateComponent, TestWrapperComponent],
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
    selector: 'nae-test-datafield-template',
    template: ''
})
class TestDatafieldTemplateComponent extends AbstractDataFieldTemplateComponent {
    constructor(protected _paperView: PaperViewService, protected _config: ConfigurationService) {
        super(_paperView, _config);
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-datafield-template [dataField]="field"></nae-test-datafield-template>'
})
class TestWrapperComponent {
    field = new TextField('', '', '', {});
}
