import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DefaultTabViewComponent} from './default-tab-view.component';
import {NavigationComponentModule} from '../../../../navigation.module';
import {
    BooleanField,
    EnumerationField,
    FilterField,
    FilterType,
    GroupNavigationConstants,
    I18nField,
    LanguageService,
    MultichoiceField,
    NAE_NAVIGATION_ITEM_TASK_DATA,
    OverflowService,
    TaskRefField,
    TestMockDependenciesModule,
    TestViewService,
    TextField,
    TranslateLibModule,
    UserFilterConstants,
    ViewService
} from '@netgrif/components-core';
import {RouterModule} from '@angular/router';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('DefaultTabViewComponent', () => {
    let component: DefaultTabViewComponent;
    let fixture: ComponentFixture<DefaultTabViewComponent>;
    let service: LanguageService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NavigationComponentModule,
                TestMockDependenciesModule,
                RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
                NoopAnimationsModule,
                TranslateLibModule,
            ],
            providers: [
                {   provide: ViewService, useClass: TestViewService},
                OverflowService,
                {
                    provide: NAE_NAVIGATION_ITEM_TASK_DATA,
                    useValue: [
                        {
                            fields: [
                                new EnumerationField(
                                    "view_configuration_type",
                                    '',"tabbed_case_view",[],{visible: true}
                                ),
                                new I18nField(
                                    GroupNavigationConstants.NAVIGATION_ENTRY_TITLE_FIELD_ID_SUFFIX,
                                    '',
                                    {defaultValue: 'Default translation', translations: {en: 'English translation'}},
                                    {visible: true}
                                ),
                            ]
                        },
                        {
                            fields: []
                        },
                        {
                            fields: []
                        },
                        {
                            fields: []
                        },
                        {
                            fields: [
                                new TaskRefField(
                                    "view_configuration_form",
                                    '',["thisistaskid"],{visible: true}
                                ),
                                new BooleanField(
                                    GroupNavigationConstants.NAVIGATION_ENTRY_ICON_ENABLED_FIELD_ID_SUFFIX,
                                    '',false,{visible: true}
                                ),
                                new TextField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_CASE_BANNED_PROCESS_CREATION,
                                    '',"",{visible: true}
                                ),
                                new TextField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_CREATE_CASE_BUTTON_TITLE,
                                    '',"",{visible: true}
                                ),
                                new TextField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_CREATE_CASE_BUTTON_ICON,
                                    '',"",{visible: true}
                                ),
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_CASE_TITLE_IN_CREATION,
                                    '',true,{visible: true}
                                ),
                                new EnumerationField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_CASE_VIEW_SEARCH_TYPE,
                                    '',"fulltext",[],{visible: true}
                                ),
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_CASE_SHOW_MORE_MENU,
                                    '',true,{visible: true}
                                ),
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_CASE_HEADERS_CHANGEABLE,
                                    '',true,{visible: true}
                                ),
                                new MultichoiceField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_CASE_HEADERS_MODE,
                                    '',["sort"],[],{visible: true}
                                ),
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_CASE_ALLOW_TABLE_MODE,
                                    '',true,{visible: true}
                                ),
                                new EnumerationField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_CASE_DEFAULT_HEADERS_MODE,
                                    '',"sort", [],{visible: true}
                                ),
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_USE_CASE_DEFAULT_HEADERS,
                                    '',true, {visible: true}
                                ),
                                new TextField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_CASE_DEFAULT_HEADERS,
                                    '','', {visible: true}
                                ),
                                new EnumerationField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_TASK_VIEW_SEARCH_TYPE,
                                    '',"fulltext", [],{visible: true}
                                ),
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_TASK_SHOW_MORE_MENU,
                                    '',true,{visible: true}
                                ),
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_TASK_HEADERS_CHANGEABLE,
                                    '',true,{visible: true}
                                ),
                                new MultichoiceField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_TASK_HEADERS_MODE,
                                    '',["sort"], [],{visible: true}
                                ),
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_TASK_ALLOW_TABLE_MODE,
                                    '',true,{visible: true}
                                ),
                                new EnumerationField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_TASK_DEFAULT_HEADERS_MODE,
                                    '',"sort", [],{visible: true}
                                ),
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_MERGE_FILTERS,
                                    '',false,{visible: true}
                                ),
                                new TaskRefField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_ADDITIONAL_FILTER_TASKREF,
                                    '',[],{visible: true}
                                ),
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_SHOW_CREATE_CASE_BUTTON,
                                    '',true,{visible: true}
                                ),
                            ]
                        },
                        {
                            fields: [
                                new FilterField(
                                    UserFilterConstants.FILTER_FIELD_ID,
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
        service = TestBed.inject(LanguageService);
        service.setLanguage('en-US');
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
