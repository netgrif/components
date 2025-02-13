import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultichoiceCaserefFieldComponent } from './multichoice-caseref-field.component';
import {NavigationComponentModule} from '../../../navigation/navigation.module';
import {
    FilterField, FilterType, MultichoiceField,
    NAE_TAB_DATA,
    NAE_VIEW_ID_SEGMENT,
    OverflowService,
    TestMockDependenciesModule, UserFilterConstants
} from '@netgrif/components-core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {
    DefaultTabbedTaskViewComponent
} from '../../../navigation/group-navigation-component-resolver/default-components/default-tabbed-task-view/default-tabbed-task-view.component';
import {Component} from '@angular/core';

describe('MultichoiceCaserefFieldComponent', () => {
    let component: MultichoiceCaserefFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

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
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-multichoice-caseref-field [dataField]="field"></nc-multichoice-caseref-field>'
})
class TestWrapperComponent {
    field = new MultichoiceField('', '', ['633c6187bb12a90925e0a17e'], [], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined);
}
