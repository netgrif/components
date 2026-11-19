import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {RemoveNodeComponent} from './remove-node.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {
    CaseTreeNode,
    CaseTreeService,
    ConfigurationService,
    MaterialModule,
    TestConfigurationService,
    TranslateLibModule,
    TreeCaseViewService
} from '@netgrif/components-core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('RemoveNodeComponent', () => {
    let component: RemoveNodeComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, RemoveNodeComponent],
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
    template: '<nc-remove-node [node]="node"></nc-remove-node>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestComponent {
    node = new CaseTreeNode(undefined, undefined);
}
