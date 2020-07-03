import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddChildNodeComponent} from './add-child-node.component';
import {MaterialModule} from '../../../../material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {CaseTreeService} from '../case-tree.service';
import {TreeCaseViewService} from '../../tree-case-view.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';

describe('AddChildNodeComponent', () => {
    let component: AddChildNodeComponent;
    let fixture: ComponentFixture<AddChildNodeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, NoopAnimationsModule, HttpClientTestingModule, TranslateLibModule],
            providers: [
                CaseTreeService,
                TreeCaseViewService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [AddChildNodeComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddChildNodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
