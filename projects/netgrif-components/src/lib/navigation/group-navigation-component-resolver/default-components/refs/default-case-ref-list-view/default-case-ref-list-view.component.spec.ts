import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCaseRefListViewComponent } from './default-case-ref-list-view.component';
import {NavigationComponentModule} from '../../../../navigation.module';
import {
    FilterField, FilterType,
    NAE_TAB_DATA,
    NAE_VIEW_ID_SEGMENT,
    OverflowService,
    TestMockDependenciesModule,
    NAE_BASE_FILTER,
    GroupNavigationConstants,
    SimpleFilter
} from '@netgrif/components-core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {DefaultTabbedTaskViewComponent} from '../../tabbed/default-tabbed-task-view/default-tabbed-task-view.component';

describe('DefaultCaseRefListViewComponent', () => {
  let component: DefaultCaseRefListViewComponent;
  let fixture: ComponentFixture<DefaultCaseRefListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            NavigationComponentModule,
            TestMockDependenciesModule,
            NoopAnimationsModule,
            RouterTestingModule.withRoutes([]),
        ],
        providers: [
            {
                provide: NAE_BASE_FILTER,
                useValue: { filter: SimpleFilter.emptyCaseFilter() }
            },
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
                                `${GroupNavigationConstants.ITEM_FIELD_CASE_FILTER}`,
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
    fixture = TestBed.createComponent(DefaultCaseRefListViewComponent);
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
