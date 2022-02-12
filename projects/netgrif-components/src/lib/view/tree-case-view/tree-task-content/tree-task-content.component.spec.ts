import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {TreeTaskContentComponent} from './tree-task-content.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TaskContentComponentModule} from '../../../task-content/task-content.module';
import {
    AuthenticationMethodService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    TestConfigurationService,
    TranslateLibModule,
    TreeCaseViewService,
    ChangedFieldsService
} from '@netgrif/components-core';

describe('TreeTaskContentComponent', () => {
    let component: TreeTaskContentComponent;
    let fixture: ComponentFixture<TreeTaskContentComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, TaskContentComponentModule, MaterialModule, TranslateLibModule],
            providers: [
                TreeCaseViewService,
                ChangedFieldsService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService}
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
