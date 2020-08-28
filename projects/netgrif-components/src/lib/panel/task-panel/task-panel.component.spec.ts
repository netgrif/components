import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatExpansionModule} from '@angular/material/expansion';
import {PanelComponentModule} from '../panel.module';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TaskPanelComponent} from './task-panel.component';
import {Observable, of, Subject, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {
    MaterialModule,
    TranslateLibModule,
    UserResourceService,
    ConfigurationService,
    TestConfigurationService,
    ArrayTaskViewServiceFactory,
    SideMenuService,
    TaskViewService,
    noNetsTaskViewServiceFactory,
    TaskResourceService,
    SearchService,
    TestTaskSearchServiceFactory,
    AssignPolicyService,
    ErrorSnackBarComponent,
    SuccessSnackBarComponent,
    TaskPanelData,
    AssignPolicy,
    DataFocusPolicy,
    FinishPolicy,
    ChangedFields,
    HeaderColumn,
    HeaderColumnType,
    TaskMetaField,
    NullAuthenticationService,
    AuthenticationService
} from '@netgrif/application-engine';
import {AuthenticationComponentModule} from '../../authentication/auth.module';


// describe('TaskPanelComponent', () => {
//     let component: TaskPanelComponent;
//     let fixture: ComponentFixture<TestWrapperComponent>;
//     let assignSpy: jasmine.Spy;
//
//     beforeEach(async(() => {
//         const mockAssignPolicyService = {
//             performAssignPolicy: () => {}
//         };
//
//         TestBed.configureTestingModule({
//             imports: [
//                 MatExpansionModule,
//                 PanelComponentModule,
//                 MaterialModule,
//                 NoopAnimationsModule,
//                 CommonModule,
//                 AuthenticationComponentModule,
//                 TranslateLibModule,
//                 HttpClientTestingModule,
//                 RouterTestingModule.withRoutes([])
//             ],
//             providers: [
//                 ArrayTaskViewServiceFactory,
//                 SideMenuService,
//                 {provide: ConfigurationService, useClass: TestConfigurationService},
//                 {provide: AuthenticationService, useClass: NullAuthenticationService},
//                 {
//                     provide: TaskViewService,
//                     useFactory: noNetsTaskViewServiceFactory,
//                     deps: [ArrayTaskViewServiceFactory]
//                 },
//                 {provide: TaskResourceService, useClass: MyResources},
//                 {provide: UserResourceService, useClass: MyUserResources},
//                 {provide: SearchService, useFactory: TestTaskSearchServiceFactory},
//             ],
//             declarations: [
//                 TestWrapperComponent,
//             ]
//         }).overrideModule(BrowserDynamicTestingModule, {
//             set: {
//                 entryComponents: [
//                     ErrorSnackBarComponent,
//                     SuccessSnackBarComponent
//                 ]
//             }
//         }).overrideProvider(AssignPolicyService, {useValue: mockAssignPolicyService}
//         ).compileComponents();
//
//         fixture = TestBed.createComponent(TestWrapperComponent);
//         component = fixture.debugElement.children[0].componentInstance;
//         fixture.detectChanges();
//
//         assignSpy = spyOn<any>(mockAssignPolicyService, 'performAssignPolicy');
//     }));
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
//
//     it('should perform assign policy on panel open', () => {
//         component.panelRef.open();
//         expect(assignSpy).toHaveBeenCalled();
//     });
//
//     it('should process tasks', () => {
//         component.taskPanelData.task.stringId = 'true';
//         component.taskPanelData.task.startDate = [2020, 1, 1, 1, 1];
//         component.assign();
//         expect(component.taskPanelData.task.startDate).toBe(undefined);
//
//         component.taskPanelData.task.stringId = 'true';
//         component.taskPanelData.task.startDate = [2020, 1, 1, 1, 1];
//         component.finish();
//         expect(component.taskPanelData.task.startDate).toBe(undefined);
//     });
//
//     afterAll(() => {
//         TestBed.resetTestingModule();
//     });
// });
