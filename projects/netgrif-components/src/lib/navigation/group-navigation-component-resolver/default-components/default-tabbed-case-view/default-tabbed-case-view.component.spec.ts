import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DefaultTabbedCaseViewComponent} from './default-tabbed-case-view.component';
import {NavigationComponentModule} from '../../../navigation.module';
import {
    FilterField,
    FilterType,
    NAE_TAB_DATA,
    NAE_VIEW_ID_SEGMENT, OverflowService,
    TestMockDependenciesModule,
    UserFilterConstants
} from '@netgrif/components-core';
import {of} from 'rxjs';
import {DefaultTabbedTaskViewComponent} from '../default-tabbed-task-view/default-tabbed-task-view.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';

describe('DefaultTabbedCaseViewComponent', () => {
    let component: DefaultTabbedCaseViewComponent;
    let fixture: ComponentFixture<DefaultTabbedCaseViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NavigationComponentModule,
                TestMockDependenciesModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                {   provide: NAE_VIEW_ID_SEGMENT, useValue: 'id'},
                OverflowService,
                {
                    provide: NAE_TAB_DATA,
                    useValue: {
                        allowedNets: [],
                        tabUniqueId: '1',
                        tabSelected$: of(true),
                        tabClosed$: of(),
                        tabViewOrder: 1,
                        tabViewComponent: DefaultTabbedTaskViewComponent,
                        navigationItemTaskData: [{fields: []}, {
                            fields: [
                                new FilterField(
                                    `${UserFilterConstants.FILTER_FIELD_ID}`,
                                    '',
                                    '',
                                    {
                                        filterType: FilterType.CASE,
                                        predicateMetadata: [],
                                        searchCategories: []
                                    },
                                    [],
                                    {visible: true},
                                    '',
                                    ''
                                )
                            ]
                        }]
                    }
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultTabbedCaseViewComponent);
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
