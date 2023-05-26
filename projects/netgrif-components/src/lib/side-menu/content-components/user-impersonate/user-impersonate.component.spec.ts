// TODO TEST 30.9.2022
// import {ComponentFixture, TestBed} from '@angular/core/testing';
//
// import {UserImpersonateComponent} from './user-impersonate.component';
// import {Observable} from 'rxjs';
// import {
//     ConfigurationService,
//     FilterType,
//     MaterialModule,
//     NAE_SIDE_MENU_CONTROL,
//     SideMenuControl,
//     SimpleFilter,
//     SnackBarService,
//     TranslateLibModule
// } from '@netgrif/components-core';
// import {
//     NaeExampleAppConfigurationService
// } from '../../../../../../nae-example-app/src/app/nae-example-app-configuration.service';
// import {CommonModule} from '@angular/common';
// import {RouterTestingModule} from '@angular/router/testing';
// import {HttpClientTestingModule} from '@angular/common/http/testing';
// import {NoopAnimationsModule} from '@angular/platform-browser/animations';
//
// describe('UserImpersonateComponent', () => {
//     let component: UserImpersonateComponent;
//     let fixture: ComponentFixture<UserImpersonateComponent>;
//
//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//             imports: [
//                 CommonModule,
//                 RouterTestingModule.withRoutes([]),
//                 MaterialModule,
//                 TranslateLibModule,
//                 HttpClientTestingModule,
//                 NoopAnimationsModule
//             ],
//             declarations: [UserImpersonateComponent],
//             providers: [
//                 SnackBarService,
//                 {provide: ConfigurationService, useClass: NaeExampleAppConfigurationService},
//                 {
//                     provide: NAE_SIDE_MENU_CONTROL,
//                     useValue: new SideMenuControl(() => {
//                     }, new Observable<boolean>(), null, {filter: new SimpleFilter('', FilterType.CASE, {process: {identifier: '__EMPTY__'}})})
//                 }
//             ]
//         })
//             .compileComponents();
//     });
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(UserImpersonateComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
