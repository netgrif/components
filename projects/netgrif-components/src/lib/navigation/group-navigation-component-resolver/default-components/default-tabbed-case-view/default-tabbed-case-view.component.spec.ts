import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DefaultTabbedCaseViewComponent} from './default-tabbed-case-view.component';
import {NavigationComponentModule} from '../../../navigation.module';
import {
    FilterField,
    FilterType,
    NAE_TAB_DATA,
    NAE_VIEW_ID_SEGMENT,
    TestMockDependenciesModule,
    UserFilterConstants
} from '@netgrif/application-engine';
import {of} from 'rxjs';
import {DefaultTabbedTaskViewComponent} from '../default-tabbed-task-view/default-tabbed-task-view.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('DefaultTabbedCaseViewComponent', () => {
    let component: DefaultTabbedCaseViewComponent;
    let fixture: ComponentFixture<DefaultTabbedCaseViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NavigationComponentModule,
                TestMockDependenciesModule,
                NoopAnimationsModule,
            ],
            providers: [
                {   provide: NAE_VIEW_ID_SEGMENT, useValue: 'id'},
                {
                    provide: NAE_TAB_DATA,
                    useValue: {
                        allowedNets: [],
                        tabUniqueId: '1',
                        tabSelected$: of(true),
                        tabClosed$: of(),
                        tabViewOrder: 1,
                        tabViewComponent: DefaultTabbedTaskViewComponent,
                        navigationItemTaskData: [{}, {
                            fields: [
                                new FilterField(
                                    `60f7b6aef68fea27e706b067-${UserFilterConstants.FILTER_FIELD_ID}`,
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
