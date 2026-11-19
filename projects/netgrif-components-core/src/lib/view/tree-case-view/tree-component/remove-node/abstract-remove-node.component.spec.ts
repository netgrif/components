import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MaterialModule} from '../../../../material/material.module';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {CaseTreeService} from '../case-tree.service';
import {TreeCaseViewService} from '../../tree-case-view.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {AbstractRemoveNodeComponent} from './abstract-remove-node.component';
import {CaseTreeNode} from '../model/case-tree-node';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractRemoveNodeComponent', () => {
    let component: TestRemoveComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, TestRemoveComponent],
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
        fixture = TestBed.createComponent(TestComponent);
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
    selector: 'ncc-test-remove',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestRemoveComponent extends AbstractRemoveNodeComponent {
    constructor(protected _treeService: CaseTreeService) {
        super(_treeService);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-remove [node]="node"></ncc-test-remove>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestComponent {
    node = new CaseTreeNode(undefined, undefined);
}
