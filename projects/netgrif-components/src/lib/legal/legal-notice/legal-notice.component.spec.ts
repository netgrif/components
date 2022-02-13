import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {LegalNoticeComponent} from './legal-notice.component';
import {Component} from '@angular/core';
import {LegalNoticeModule} from './legal-notice.module';
import {ConfigurationService, TestConfigurationService} from '@netgrif/components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LegalNoticeComponent', () => {
    let component: LegalNoticeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [LegalNoticeModule, HttpClientTestingModule],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
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
    template: '<nc-legal-notice buttonName="name"></nc-legal-notice>'
})
class TestWrapperComponent {
    constructor() {
    }
}
