import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DefaultSimpleTaskViewComponent} from './default-simple-task-view.component';
import {NavigationComponentModule} from '../../../../navigation.module';
import {
    FilterField, FieldTypeResource, TextField, BooleanField, MultichoiceField, EnumerationField, I18nField,
    NAE_NAVIGATION_ITEM_TASK_DATA,
    OverflowService,
    TestMockDependenciesModule,
    GroupNavigationConstants,
    StringCollectionField,
} from '@netgrif/components-core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from "@angular/router/testing";

describe('DefaultSimpleTaskViewComponent', () => {
    let component: DefaultSimpleTaskViewComponent;
    let fixture: ComponentFixture<DefaultSimpleTaskViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NavigationComponentModule,
                TestMockDependenciesModule,
                RouterTestingModule.withRoutes([]),
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
                                    GroupNavigationConstants.ITEM_FIELD_TASK_FILTER,
                                    '',
                                    '',
                                    FieldTypeResource.CASE_FILTER,
                                    [],
                                    {visible: true},
                                    '',
                                    ''
                                ),
                                new TextField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_TASK_VIEW_SEARCH_TYPE,
                                    '',
                                    '',
                                    {visible: true}
                                ),
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_TASK_HEADERS_CHANGEABLE,
                                    '',
                                    true,
                                    {visible: true}
                                ),
                                new MultichoiceField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_TASK_HEADERS_MODE,
                                    '',
                                    [''],
                                    [],
                                    { visible: true }),
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_TASK_ALLOW_TABLE_MODE,
                                    '',
                                    true,
                                    {visible: true}
                                ),
                                new EnumerationField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_TASK_DEFAULT_HEADERS_MODE,
                                    '',
                                    '',
                                    [],
                                    {visible: true}
                                ),
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_TASK_SHOW_MORE_MENU,
                                    '',
                                    true,
                                    {visible: true}
                                ),
                                new I18nField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_TASK_EMPTY_CONTENT_TEXT,
                                    '',
                                    '',
                                    {visible: true}
                                ),
                                new TextField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_TASK_EMPTY_CONTENT_ICON,
                                    '',
                                    '',
                                    {visible: true}
                                ),
                                new StringCollectionField(
                                    GroupNavigationConstants.ITEM_FIELD_TASK_ALLOWED_NETS,
                                    '',
                                    [],
                                    {visible: true}
                                )
                            ]
                        }
                    ]
                },
                OverflowService
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
