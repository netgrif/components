// describe('UserAssignComponent', () => {
//     let component: UserAssignComponent;
//     let fixture: ComponentFixture<UserAssignComponent>;
//
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 MaterialModule,
//                 BrowserAnimationsModule,
//                 HttpClientTestingModule,
//                 TranslateLibModule,
//                 SnackBarModule
//             ],
//             providers: [
//                 UserListService,
//                 {provide: NAE_SIDE_MENU_CONTROL, useValue: new SideMenuControl(() => {
//                     }, new Observable<boolean>(), null)},
//                 {provide: ConfigurationService, useClass: TestConfigurationService}
//             ],
//             declarations: [
//                 UserAssignComponent,
//                 UserAssignListComponent,
//                 UserAssignItemComponent
//             ]
//         }).compileComponents();
//     }));
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(UserAssignComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
//
//     afterAll(() => {
//         TestBed.resetTestingModule();
//     });
// });
