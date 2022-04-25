import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {AbstractLegalNoticeComponent} from './abstract-legal-notice.component';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AbstractLegalFormComponent ', () => {
    let component: TestLegalFormComponent;
    let fixture: ComponentFixture<TestLegalFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule, HttpClientTestingModule
            ],
            declarations: [TestLegalFormComponent],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
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
    selector: 'nae-test-legal',
    template: ''
})
class TestLegalFormComponent extends AbstractLegalNoticeComponent {
    constructor(config: ConfigurationService) {
        super(config);
    }
}
