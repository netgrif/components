// import {ComponentFixture, TestBed} from '@angular/core/testing';
//
// import {MultiUserAssignDialogComponent} from './multi-user-assign-dialog.component';
// import {
//     ConfigurationService,
//     MaterialModule, TestConfigurationService,
//     TranslateLibModule,
//     UserListService,
//     AuthenticationMethodService,
//     MockAuthenticationMethodService,
//     AuthenticationService,
//     MockAuthenticationService,
//     UserResourceService,
//     MockUserResourceService,
//     UserListInjectedData,
//     UserListValue,
//     UserValue
// } from '@netgrif/components-core';
// import {NoopAnimationsModule} from '@angular/platform-browser/animations';
// import {HttpClientTestingModule} from '@angular/common/http/testing';
// import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
// import {
//     SideMenuMultiUserAssignComponentModule
// } from '../../side-menu/content-components/multi-user-assign/side-menu-multi-user-assign-component.module';
// import {NO_ERRORS_SCHEMA} from "@angular/core";
//
// describe('MultiUserAssignDialogComponent', () => {
//     let component: MultiUserAssignDialogComponent;
//     let fixture: ComponentFixture<MultiUserAssignDialogComponent>;
//
//     const userMap = new Map<string, UserValue>();
//
//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//             imports: [
//                 MaterialModule,
//                 TranslateLibModule,
//                 NoopAnimationsModule,
//                 HttpClientTestingModule,
//                 MatDialogModule,
//                 SideMenuMultiUserAssignComponentModule
//             ],
//             providers: [
//                 UserListService,
//                 {provide: ConfigurationService, useClass: TestConfigurationService},
//                 {
//                     provide: MAT_DIALOG_DATA, useValue: {roles: [], value: { userValues: userMap} as UserListValue} as UserListInjectedData
//                 },
//                 { provide: MatDialogRef, useValue: {} },
//                 { provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService },
//                 { provide: AuthenticationService, useClass: MockAuthenticationService },
//                 { provide: UserResourceService, useClass: MockUserResourceService }
//             ],
//             schemas: [NO_ERRORS_SCHEMA],
//             declarations: [
//                 MultiUserAssignDialogComponent
//             ]
//         })
//             .compileComponents();
//     });
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(MultiUserAssignDialogComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
