import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CaseTreeNode} from '../model/case-tree-node';
import {AbstractAddChildNodeComponent} from './abstract-add-child-node.component';
import {CaseTreeService} from '../case-tree.service';
import {MaterialModule} from '../../../../material/material.module';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {TreeCaseViewService} from '../../tree-case-view.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractAddChildNodeComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, TestWrapperComponent],
            imports: [
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                CaseTreeService,
                TreeCaseViewService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-add-child',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestComponent extends AbstractAddChildNodeComponent {
    constructor(protected _treeService: CaseTreeService) {
        super(_treeService);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-add-child [node]="node"></ncc-test-add-child>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    node = new CaseTreeNode(undefined, undefined);
}
