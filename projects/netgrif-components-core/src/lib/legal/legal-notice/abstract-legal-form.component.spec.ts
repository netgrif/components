import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractLegalNoticeComponent} from './abstract-legal-notice.component';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractLegalFormComponent ', () => {
    let component: TestLegalFormComponent;
    let fixture: ComponentFixture<TestLegalFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestLegalFormComponent],
            imports: [],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestLegalFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-legal',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestLegalFormComponent extends AbstractLegalNoticeComponent {
    constructor(config: ConfigurationService) {
        super(config);
    }
}
