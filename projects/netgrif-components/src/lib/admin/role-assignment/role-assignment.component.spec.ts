import {async, ComponentFixture, TestBed} from '@angular/core/testing';


// describe('RoleAssignmentComponent', () => {
//     let component: RoleAssignmentComponent;
//     let fixture: ComponentFixture<RoleAssignmentComponent>;
//     let getAllSpy: jasmine.Spy;
//
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 NoopAnimationsModule,
//                 HttpClientTestingModule,
//                 MaterialModule,
//                 TranslateLibModule
//             ],
//             providers: [
//                 {provide: ConfigurationService, useClass: TestConfigurationService},
//                 {provide: AuthenticationMethodService, useClass: MyAuth},
//                 RoleAssignmentService
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
//             declarations: [
//                 RoleAssignmentComponent,
//                 ErrorSnackBarComponent,
//                 SuccessSnackBarComponent
//             ],
//         }).overrideModule(BrowserDynamicTestingModule, {
//             set: {
//                 entryComponents: [
//                     ErrorSnackBarComponent,
//                     SuccessSnackBarComponent
//                 ]
//             }
//         }).compileComponents();
//     }));
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(RoleAssignmentComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//         getAllSpy = spyOn(TestBed.inject(UserResourceService), 'getAll');
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
//
//     // it('should load next page', () => {
//     //     component.loadNextUserPage();
//     //     expect(getAllSpy).toHaveBeenCalled();
//     // });
// });
//
// class MyAuth extends AuthenticationMethodService {
//     login(credentials: Credentials): Observable<User> {
//         return of({email: 'mail', id: 'id', name: 'name', surname: 'surname'});
//     }
//
//     logout(): Observable<object> {
//         return of(undefined);
//     }
// }
