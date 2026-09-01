import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {EditModeComponent} from './edit-mode.component';
import {FlexLayoutModule, FlexModule, MediaObserver} from '@ngbracket/ngx-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    AllowedNetsService, AllowedNetsServiceFactory,
    AuthenticationMethodService,
    AuthenticationService,
    CaseHeaderService,
    CaseViewService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService, NAE_BASE_FILTER, OverflowService,
    SearchService, TestCaseBaseFilterProvider, TestCaseViewAllowedNetsFactory,
    TestConfigurationService,
    TestViewService,
    TranslateLibModule,
    UserResourceService,
    ViewService,
    HeaderSortingMode,
    NAE_HEADER_SORTING_MODE,
    LoggerService,
    HeaderMode
} from '@netgrif/components-core';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateService} from '@ngx-translate/core';
import {Observable, of, Subject} from "rxjs";
import {MediaChange} from "@ngbracket/ngx-layout/core/media-change";

describe('EditModeComponent', () => {
    let component: EditModeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [EditModeComponent, TestWrapperComponent],
            imports: [
                FlexModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                CaseHeaderService,
                CaseViewService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                SearchService,
                OverflowService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                {provide: NAE_HEADER_SORTING_MODE, useValue: HeaderSortingMode.MULTI},
                {provide: AllowedNetsService, useFactory: TestCaseViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render sort priorities as subscripts in multi mode', () => {
        const service = TestBed.inject(CaseHeaderService);
        component.sortingHeaderSelected(service.headerState.selectedHeaders[0]);
        component.sortingHeaderSelected(service.headerState.selectedHeaders[1]);
        fixture.detectChanges();

        const priorities = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('sub.sort-priority'))
            .map(element => element.textContent.trim());

        expect(priorities).toEqual(['1', '2']);
    });

    it('should remove hidden sorts when edit mode opens on a responsive display', () => {
        const service = TestBed.inject(CaseHeaderService);
        const firstHeader = service.headerState.selectedHeaders[0];
        const secondHeader = service.headerState.selectedHeaders[1];
        const responsiveComponent = new EditModeComponent(
            TestBed.inject(TranslateService),
            TestBed.inject(LoggerService),
            {
                isActive: alias => alias === 'lt-sm',
                asObservable: () => of([]),
            } as MediaObserver
        );
        responsiveComponent.headerService = service;
        firstHeader.sortDirection = 'asc';
        secondHeader.sortDirection = 'desc';
        service.sortingColumnSelected(firstHeader);
        service.sortingColumnSelected(secondHeader);
        service.changeMode(HeaderMode.EDIT);

        responsiveComponent.ngOnInit();

        expect(service.headerState.selectedSorts).toEqual([firstHeader]);
        expect(firstHeader.sortDirection).toBe('asc');
        expect(secondHeader.sortDirection).toBe('');

        service.revertEditMode();

        expect(service.headerState.selectedSorts).toEqual([firstHeader, secondHeader]);
        expect(firstHeader.sortDirection).toBe('asc');
        expect(secondHeader.sortDirection).toBe('desc');
        responsiveComponent.ngOnDestroy();
    });

    it('should remove newly hidden sorts after a breakpoint change', () => {
        const service = TestBed.inject(CaseHeaderService);
        const firstHeader = service.headerState.selectedHeaders[0];
        const secondHeader = service.headerState.selectedHeaders[1];
        const mediaChanges = new Subject<any>();
        let activeAlias: string;
        const responsiveComponent = new EditModeComponent(
            TestBed.inject(TranslateService),
            TestBed.inject(LoggerService),
            {
                isActive: alias => alias === activeAlias,
                asObservable: () => mediaChanges.asObservable(),
            } as MediaObserver
        );
        responsiveComponent.headerService = service;
        firstHeader.sortDirection = 'asc';
        secondHeader.sortDirection = 'desc';
        service.sortingColumnSelected(firstHeader);
        service.sortingColumnSelected(secondHeader);
        service.changeMode(HeaderMode.EDIT);
        responsiveComponent.ngOnInit();

        expect(service.headerState.selectedSorts).toEqual([firstHeader, secondHeader]);

        activeAlias = 'lt-sm';
        mediaChanges.next([]);

        expect(service.headerState.selectedSorts).toEqual([firstHeader]);
        expect(secondHeader.sortDirection).toBe('');

        responsiveComponent.ngOnDestroy();
        mediaChanges.complete();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-edit-mode [headerService]="service"></nc-edit-mode>'
})
class TestWrapperComponent {
    constructor(public service: CaseHeaderService) {
    }
}
