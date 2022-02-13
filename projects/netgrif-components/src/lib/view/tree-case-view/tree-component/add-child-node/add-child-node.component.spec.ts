import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddChildNodeComponent} from './add-child-node.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    CaseTreeNode,
    CaseTreeService,
    ConfigurationService,
    MaterialModule,
    TestConfigurationService,
    TranslateLibModule,
    TreeCaseViewService
} from '@netgrif/components-core';
import {Component} from '@angular/core';

describe('AddChildNodeComponent', () => {
    let component: AddChildNodeComponent;
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-add-child-node [node]="node"></nc-add-child-node>'
})
class TestComponent {
    node = new CaseTreeNode({
        author: undefined,
        color: '',
        creationDate: undefined,
        icon: '',
        lastModified: undefined,
        petriNetId: '',
        petriNetObjectId: undefined,
        processIdentifier: '',
        resetArcTokens: undefined,
        stringId: '',
        title: '',
        visualId: '',
        immediateData: [], permissions: {}}, undefined);
}
