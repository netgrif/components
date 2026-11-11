import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {TabViewComponent} from './tab-view.component';
import {TabCreationDetectorComponent} from '../tab-creation-detector/tab-creation-detector.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    TabContent,
    TestConfigurationService,
    TestViewService,
    TranslateLibModule,
    UserResourceService,
    ViewService
} from '@netgrif/components-core';
import {RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateService} from '@ngx-translate/core';

describe('TabViewComponent', () => {
    let component: TabViewComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                TranslateLibModule,
                MaterialModule,
                TabTestModule,
                NoopAnimationsModule,
                RouterModule.forRoot([])
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService}
            ],
            declarations: [
                TabViewComponent,
                TabCreationDetectorComponent,
                TestWrapperComponent,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();

        const translate = TestBed.inject(TranslateService);
        translate.setTranslation('en', {
            tasks: {
                view: {
                    closeTab: 'Close',
                    pinTab: 'Pin tab',
                    unpinTab: 'Unpin tab'
                }
            }
        });
        translate.use('en');
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should delegate pin changes to the core tab view', () => {
        const pinButton = Array.from(fixture.nativeElement.querySelectorAll('button'))
            .find((button: HTMLElement) => button.querySelector('mat-icon')?.textContent.trim() === 'push_pin') as HTMLButtonElement;

        expect(pinButton.getAttribute('aria-label')).toBe('Pin tab');
        const closeButton = Array.from(fixture.nativeElement.querySelectorAll('button'))
            .find((button: HTMLElement) => button.querySelector('mat-icon')?.textContent.trim() === 'clear') as HTMLButtonElement;
        expect(closeButton.getAttribute('aria-label')).toBe('Close');

        pinButton.click();
        fixture.detectChanges();

        expect(component.tabView.openedTabs[0].pinned).toBeTrue();
        expect(pinButton.getAttribute('aria-label')).toBe('Unpin tab');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-tab-view [initialTabs]="tabs" [pinningEnabled]="true"></nc-tab-view>'
})
class TestWrapperComponent {
    tabs: Array<TabContent> = [
        {
            label: {
                text: 'tab title',
                icon: 'home'
            },
            canBeClosed: true,
            tabContentComponent: TestComponent
        }
    ];
}

@Component({
    selector: 'nc-test-div',
    template: '<div></div>'
})
class TestComponent {
}

@NgModule({
    declarations: [TestComponent]
})
class TabTestModule {
}
