import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTaskComponent } from './single-task.component';
import {
    AllowedNetsService, AllowedNetsServiceFactory,
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService, NAE_BASE_FILTER,
    SearchService,
    TaskViewService,
    TestConfigurationService, TestTaskBaseFilterProvider, TestTaskViewAllowedNetsFactory,
    UserResourceService
} from 'netgrif-components-core';
import { RouterTestingModule } from '@angular/router/testing';

describe('SingleTaskComponent', () => {
  let component: SingleTaskComponent;
  let fixture: ComponentFixture<SingleTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule.withRoutes([])
        ],
        declarations: [ SingleTaskComponent ],
        providers: [
            TaskViewService,
            {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
            {provide: AuthenticationService, useClass: MockAuthenticationService},
            {provide: UserResourceService, useClass: MockUserResourceService},
            SearchService,
            {
                provide: NAE_BASE_FILTER,
                useFactory: TestTaskBaseFilterProvider
            },
            {
                provide: ConfigurationService,
                useClass: TestConfigurationService
            },
            {provide: AllowedNetsService, useFactory: TestTaskViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
