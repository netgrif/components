import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {RemoveNodeComponent} from './remove-node.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component} from '@angular/core';
import {
    CaseTreeNode,
    CaseTreeService,
    ConfigurationService,
    MaterialModule,
    TestConfigurationService,
    TranslateLibModule,
    TreeCaseViewService
} from '@netgrif/components-core';

describe('RemoveNodeComponent', () => {
    let component: RemoveNodeComponent;
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-remove-node [node]="node"></nc-remove-node>'
})
class TestComponent {
    node = new CaseTreeNode(undefined, undefined);
}
