import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DefaultTabViewComponent} from './default-tab-view.component';
import {NavigationComponentModule} from '../../../navigation.module';
import {
    BooleanField,
    FilterField,
    FilterType, GroupNavigationConstants,
    NAE_NAVIGATION_ITEM_TASK_DATA, TestMockDependenciesModule, TestViewService,
    TextField,
    UserFilterConstants, ViewService
} from '@netgrif/application-engine';
import {RouterModule} from '@angular/router';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('DefaultTabViewComponent', () => {
    let component: DefaultTabViewComponent;
    let fixture: ComponentFixture<DefaultTabViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NavigationComponentModule,
                TestMockDependenciesModule,
                RouterModule.forRoot([]),
                NoopAnimationsModule,
            ],
            providers: [
                {   provide: ViewService, useClass: TestViewService},
                {
                    provide: NAE_NAVIGATION_ITEM_TASK_DATA,
                    useValue: [
                        {
                            fields: [
                                new TextField(
                                    `${GroupNavigationConstants.NAVIGATION_ENTRY_TITLE_FIELD_ID_SUFFIX}`,
                                    '',
                                    'nav item title',
                                    {visible: true}
                                ),
                                new BooleanField(
                                    `${GroupNavigationConstants.NAVIGATION_ENTRY_ICON_ENABLED_FIELD_ID_SUFFIX}`,
                                    '',
                                    false,
                                    {visible: true}
                                )
                            ]
                        },
                        {
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
                        }
                    ]
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultTabViewComponent);
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
