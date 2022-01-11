import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component} from '@angular/core';
import {MaterialModule} from '../../../../material/material.module';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {CaseTreeService} from '../case-tree.service';
import {TreeCaseViewService} from '../../tree-case-view.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {AbstractRemoveNodeComponent} from './abstract-remove-node.component';
import {CaseTreeNode} from '../model/case-tree-node';

describe('AbstractRemoveNodeComponent', () => {
    let component: TestRemoveComponent;
    let fixture: ComponentFixture<TestComponent>;

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
                TestRemoveComponent
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
    selector: 'nae-test-remove',
    template: ''
})
class TestRemoveComponent extends AbstractRemoveNodeComponent {
    constructor(protected _treeService: CaseTreeService) {
        super(_treeService);
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-remove [node]="node"></nae-test-remove>'
})
class TestComponent {
    node = new CaseTreeNode(undefined, undefined);
}
