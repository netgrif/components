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
import {Component} from '@angular/core';
import {CaseTreeNode} from '../model/CaseTreeNode';

describe('RemoveNodeComponent', () => {
    let component: RemoveNodeComponent;
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
                RemoveNodeComponent
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
    template: '<nae-remove-node [node]="node"></nae-remove-node>'
})
class TestComponent {
    node = new CaseTreeNode(undefined, undefined);
}
