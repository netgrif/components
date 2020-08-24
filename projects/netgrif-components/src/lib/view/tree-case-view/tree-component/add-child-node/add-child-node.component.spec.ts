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
import {Component} from '@angular/core';
import {CaseTreeNode} from '../model/CaseTreeNode';

describe('AddChildNodeComponent', () => {
    let component: AddChildNodeComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule
            ],
            providers: [
                CaseTreeService,
                TreeCaseViewService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                TestComponent,
                AddChildNodeComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-add-child-node [node]="node"></nae-add-child-node>'
})
class TestComponent {
    node = new CaseTreeNode(undefined, undefined);
}
