import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TabViewComponent} from './tab-view.component';
import {MaterialModule} from '../../material/material.module';
import {TabCreationDetectorComponent} from '../tab-creation-detector/tab-creation-detector.component';
import {Component, NgModule} from '@angular/core';
import {TabContent} from '../interfaces';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {ViewService} from '../../routing/view-service/view.service';
import {TestViewService} from '../../utility/tests/test-view-service';
import {RouterModule} from '@angular/router';

describe('TabViewComponent', () => {
    let component: TabViewComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TabTestModule,
                NoopAnimationsModule,
                RouterModule.forRoot([])
            ],
            providers: [
                AuthenticationMethodService,
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService}
            ],
            declarations: [
                TabViewComponent,
                TabCreationDetectorComponent,
                TestWrapperComponent,
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-tab-view [initialTabs]="tabs"></nae-tab-view>'
})
class TestWrapperComponent {
    tabs: Array<TabContent> = [
        {
            label: {
                text: 'tab title',
                icon: 'home'
            },
            canBeClosed: false,
            tabContentComponent: TestComponent
        }
    ];
}

@Component({
    selector: 'nae-test-div',
    template: '<div></div>'
})
class TestComponent {
}

@NgModule({
    declarations: [TestComponent],
    entryComponents: [TestComponent]
})
class TabTestModule {
}
