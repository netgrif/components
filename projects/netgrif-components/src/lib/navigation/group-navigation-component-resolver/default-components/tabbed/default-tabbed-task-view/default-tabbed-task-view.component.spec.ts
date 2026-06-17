import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DefaultTabbedTaskViewComponent} from './default-tabbed-task-view.component';
import {NavigationComponentModule} from '../../../../navigation.module';
import {
    BooleanField,
    GroupNavigationConstants,
    HeaderMode,
    NAE_NAVIGATION_ITEM_TASK_DATA,
    NAE_TAB_DATA,
    NAE_VIEW_ID_SEGMENT,
    OverflowService,
    SimpleFilter,
    TestMockDependenciesModule,
    TextField,
    ViewIdService
} from '@netgrif/components-core';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';

describe('DefaultTabbedTaskViewComponent', () => {
    let component: DefaultTabbedTaskViewComponent;
    let fixture: ComponentFixture<DefaultTabbedTaskViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
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
                        tabClosed$: of(),
                        searchTypeConfiguration: {
                            initialSearchMode: HeaderMode.SORT,
                            showSearchToggleButton: true
                        },
                        headersChangeable: true,
                        headersMode: [],
                        allowTableMode: true,
                        defaultHeadersMode: HeaderMode.SORT,
                        showMoreMenu: true
                    }
                },
                {provide: NAE_VIEW_ID_SEGMENT, useValue: 'direct'},
                {provide: ViewIdService, useValue: {viewId: 'test_view_id'}},
                {
                    provide: NAE_NAVIGATION_ITEM_TASK_DATA,
                    useValue: [
                        {
                            fields: [
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_USE_TASK_DEFAULT_HEADERS,
                                    '',
                                    true,
                                    {visible: true}
                                ),
                                new TextField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_TASK_DEFAULT_HEADERS,
                                    '',
                                    '',
                                    {visible: true}
                                )
                            ]
                        }
                    ]
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultTabbedTaskViewComponent);
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
