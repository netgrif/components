import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TreeTaskContentComponent} from './tree-task-content.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TaskContentModule} from '../../../task-content/task-content.module';
import {MaterialModule} from '../../../material/material.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {NullAuthenticationService} from '../../../authentication/services/methods/null-authentication/null-authentication.service';
import {TreeCaseViewService} from '../tree-case-view.service';

describe('TreeTaskContentComponent', () => {
    let component: TreeTaskContentComponent;
    let fixture: ComponentFixture<TreeTaskContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, TaskContentModule, MaterialModule, TranslateLibModule],
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
