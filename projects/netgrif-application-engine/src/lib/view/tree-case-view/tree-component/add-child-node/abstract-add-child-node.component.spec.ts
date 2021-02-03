import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component} from '@angular/core';
import {CaseTreeNode} from '../model/case-tree-node';
import {AbstractAddChildNodeComponent} from './abstract-add-child-node.component';
import {CaseTreeService} from '../case-tree.service';
import {MaterialModule} from '../../../../material/material.module';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {TreeCaseViewService} from '../../tree-case-view.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';

describe('AbstractAddChildNodeComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
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
                TestWrapperComponent
            ]
        }).compileComponents();
    }));

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
    selector: 'nae-test-add-child',
    template: ''
})
class TestComponent extends AbstractAddChildNodeComponent {
    constructor(protected _treeService: CaseTreeService) {
        super(_treeService);
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-add-child [node]="node"></nae-test-add-child>'
})
class TestWrapperComponent {
    node = new CaseTreeNode(undefined, undefined);
}
