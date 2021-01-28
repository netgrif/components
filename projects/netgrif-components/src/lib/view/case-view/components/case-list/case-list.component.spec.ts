// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {CaseListComponent} from './case-list.component';
// import {
//     AuthenticationMethodService,
//     CaseResourceService,
//     CaseViewService,
//     ConfigCaseViewServiceFactory,
//     ConfigurationService,
//     FilterType,
//     MaterialModule,
//     MockAuthenticationMethodService,
//     SearchService,
//     SimpleFilter,
//     TestConfigurationService,
//     TranslateLibModule
// } from '@netgrif/application-engine';
// import {HttpClientTestingModule} from '@angular/common/http/testing';
// import {of} from 'rxjs';
// import {PanelComponentModule} from '../../../../panel/panel.module';
// import {NoopAnimationsModule} from '@angular/platform-browser/animations';
//
// const localCaseViewServiceFactory = (factory: ConfigCaseViewServiceFactory) => {
//     return factory.create('cases');
// };
//
// const searchServiceFactory = () => {
//     return new SearchService(new SimpleFilter('', FilterType.CASE, {}));
// };
//
// describe('CaseListComponent', () => {
//     let component: CaseListComponent;
//     let fixture: ComponentFixture<CaseListComponent>;
//
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 HttpClientTestingModule,
//                 MaterialModule,
//                 TranslateLibModule,
//                 PanelComponentModule,
//                 NoopAnimationsModule
//             ],
//             providers: [
//                 {provide: CaseResourceService, useClass: MyResources},
//                 {provide: ConfigurationService, useClass: TestConfigurationService},
//                 {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
//                 ConfigCaseViewServiceFactory,
//                 {
//                     provide: CaseViewService,
//                     useFactory: localCaseViewServiceFactory,
//                     deps: [ConfigCaseViewServiceFactory]
//                 },
//                 {
//                     provide: SearchService,
//                     useFactory: searchServiceFactory
//                 }
//             ],
//             declarations: [CaseListComponent]
//         })
//             .compileComponents();
//     }));
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(CaseListComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
//
//     afterEach(() => {
//         TestBed.resetTestingModule();
//     });
// });
//
// class MyResources {
//     searchCases(filter, params) {
//         return of({
//             content: [], pagination: {
//                 number: -1,
//                 size: 0,
//                 totalPages: 0,
//                 totalElements: 0
//             }
//         });
//     }
// }
