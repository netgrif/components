import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TreeCaseViewComponent} from './tree-case-view.component';
import {TreeCaseViewModule} from './tree-case-view.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {NullAuthenticationService} from '../../authentication/services/methods/null-authentication/null-authentication.service';

describe('TreeCaseViewComponent', () => {
    let component: TreeCaseViewComponent;
    let fixture: ComponentFixture<TreeCaseViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TreeCaseViewModule, NoopAnimationsModule],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: NullAuthenticationService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TreeCaseViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
