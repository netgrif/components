import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NAE_TAB_DATA, OverflowService, SimpleFilter, TestMockDependenciesModule} from '@netgrif/components-core';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {FilterFieldTabbedTaskViewComponent} from "./filter-field-tabbed-task-view.component";
import {NavigationComponentModule} from "../../navigation/navigation.module";
import {HeaderComponent} from "../../header/header.component";

describe('FilterFieldTabbedTaskViewComponent', () => {
    let component: FilterFieldTabbedTaskViewComponent;
    let fixture: ComponentFixture<FilterFieldTabbedTaskViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ FilterFieldTabbedTaskViewComponent, HeaderComponent],
            imports: [
                NavigationComponentModule,
                TestMockDependenciesModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                OverflowService,
                {
                    provide: NAE_TAB_DATA,
                    useValue: {
                        baseFilter: SimpleFilter.emptyTaskFilter(),
                        allowedNets: [],
                        tabUniqueId: '1',
                        tabSelected$: of(true),
                        tabClosed$: of()
                    }
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterFieldTabbedTaskViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
