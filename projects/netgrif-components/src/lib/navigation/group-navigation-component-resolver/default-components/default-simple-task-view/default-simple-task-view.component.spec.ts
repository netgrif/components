import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DefaultSimpleTaskViewComponent} from './default-simple-task-view.component';
import {NavigationComponentModule} from '../../../navigation.module';
import {
    FilterField, FilterType,
    NAE_NAVIGATION_ITEM_TASK_DATA,
    TestMockDependenciesModule,
    UserFilterConstants
} from '@netgrif/components-core';
import {RouterModule} from '@angular/router';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('DefaultSimpleTaskViewComponent', () => {
    let component: DefaultSimpleTaskViewComponent;
    let fixture: ComponentFixture<DefaultSimpleTaskViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NavigationComponentModule,
                TestMockDependenciesModule,
                RouterModule.forRoot([]),
                NoopAnimationsModule,
            ],
            providers: [
                {
                    provide: NAE_NAVIGATION_ITEM_TASK_DATA,
                    useValue: [
                        {fields: []},
                        {
                            fields: [
                                new FilterField(
                                    UserFilterConstants.FILTER_FIELD_ID,
                                    '',
                                    '',
                                    {
                                        filterType: FilterType.TASK,
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
        fixture = TestBed.createComponent(DefaultSimpleTaskViewComponent);
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
