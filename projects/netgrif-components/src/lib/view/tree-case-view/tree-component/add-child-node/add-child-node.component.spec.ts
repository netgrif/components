import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddChildNodeComponent} from './add-child-node.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {
    CaseTreeNode,
    CaseTreeService,
    ConfigurationService,
    MaterialModule,
    TestConfigurationService,
    TranslateLibModule,
    TreeCaseViewService
} from '@netgrif/components-core';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AddChildNodeComponent', () => {
    let component: AddChildNodeComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, AddChildNodeComponent],
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
    selector: 'nc-test-wrapper',
    template: '<nc-add-child-node [node]="node"></nc-add-child-node>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestComponent {
    node = new CaseTreeNode({
        author: undefined,
        color: '',
        creationDate: undefined,
        icon: '',
        lastModified: undefined,
        lastModifiedDataSet: undefined,
        petriNetId: '',
        petriNetObjectId: undefined,
        processIdentifier: '',
        resetArcTokens: undefined,
        stringId: '',
        title: '',
        visualId: '',
        immediateData: [], permissions: {}}, undefined);
}
