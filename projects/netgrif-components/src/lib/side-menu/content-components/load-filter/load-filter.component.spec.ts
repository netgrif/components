// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {LoadFilterComponent} from './load-filter.component';
// import {
//     MaterialModule,
//     TranslateLibModule,
//     ConfigurationService,
//     TestConfigurationService,
//     NAE_SIDE_MENU_CONTROL,
//     SideMenuControl,
//     SimpleFilter
// } from '@netgrif/application-engine';
// import {HeaderComponentModule} from '../../../header/header.module';
// import {CaseViewComponentModule} from '../../../view/case-view/case-view.module';
// import {of} from 'rxjs';
// import {NoopAnimationsModule} from '@angular/platform-browser/animations';
//
//
// describe('LoadFilterComponent', () => {
//     let component: LoadFilterComponent;
//     let fixture: ComponentFixture<LoadFilterComponent>;
//
//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//             declarations: [LoadFilterComponent],
//             imports: [
//                 MaterialModule,
//                 HeaderComponentModule,
//                 CaseViewComponentModule,
//                 TranslateLibModule,
//                 NoopAnimationsModule
//             ],
//             providers: [
//                 {provide: ConfigurationService, useClass: TestConfigurationService},
//                 {
//                     provide: NAE_SIDE_MENU_CONTROL,
//                     useValue: new SideMenuControl(undefined, undefined, () => of('close'), {filter: SimpleFilter.emptyCaseFilter()})
//                 },
//             ]
//         })
//             .compileComponents();
//     });
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(LoadFilterComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
