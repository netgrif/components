import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RemoveNodeComponent} from './remove-node.component';
import {MaterialModule} from '../../../../material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CaseTreeService} from '../case-tree.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {TreeCaseViewService} from '../../tree-case-view.service';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';

describe('RemoveNodeComponent', () => {
    let component: RemoveNodeComponent;
    let fixture: ComponentFixture<RemoveNodeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, NoopAnimationsModule, HttpClientTestingModule, TranslateLibModule],
            providers: [
                CaseTreeService,
                TreeCaseViewService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [RemoveNodeComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RemoveNodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
