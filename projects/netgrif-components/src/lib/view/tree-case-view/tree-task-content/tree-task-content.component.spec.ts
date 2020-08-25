import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TreeTaskContentComponent} from './tree-task-content.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TaskContentComponentModule} from '../../../task-content/task-content.module';
import {
    MaterialModule,
    ConfigurationService,
    TestConfigurationService,
    TreeCaseViewService,
    TranslateLibModule,
    CaseTreeNode,
    AuthenticationMethodService,
    NullAuthenticationService
} from '@netgrif/application-engine';

describe('TreeTaskContentComponent', () => {
    let component: TreeTaskContentComponent;
    let fixture: ComponentFixture<TreeTaskContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, TaskContentComponentModule, MaterialModule, TranslateLibModule],
            providers: [
                TreeCaseViewService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: NullAuthenticationService}
                ],
            declarations: [TreeTaskContentComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TreeTaskContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
