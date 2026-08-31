import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DefaultSimpleCaseViewComponent} from './default-simple-case-view.component';
import {NavigationComponentModule} from "../../../../navigation.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {
    BooleanField,
    FilterField,
    EnumerationField,
    MultichoiceField,
    GroupNavigationConstants,
    NAE_NAVIGATION_ITEM_TASK_DATA,
    NAE_VIEW_ID_SEGMENT,
    OverflowService,
    TestMockDependenciesModule,
    TextField,
    I18nField,
    FieldTypeResource,
    AuthenticationModule,
    StringCollectionField,
} from '@netgrif/components-core';

describe('SimpleCaseViewComponent', () => {
    let component: DefaultSimpleCaseViewComponent;
    let fixture: ComponentFixture<DefaultSimpleCaseViewComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DefaultSimpleCaseViewComponent]
        })
            .compileComponents();
    }));
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DefaultSimpleCaseViewComponent],
            imports: [
                NavigationComponentModule,
                TestMockDependenciesModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([]),
                AuthenticationModule
            ],
            providers: [
                {provide: NAE_VIEW_ID_SEGMENT, useValue: 'id'},
                OverflowService,
                {
                    provide: NAE_NAVIGATION_ITEM_TASK_DATA,
                    useValue: [
                        {
                            fields: [
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
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_SHOW_CREATE_CASE_BUTTON,
                                    '',true,{visible: true}
                                ),
                                new FilterField(
                                    GroupNavigationConstants.ITEM_FIELD_CASE_FILTER,
                                    '',
                                    '',
                                    FieldTypeResource.CASE_FILTER,
                                    [],
                                    {visible: true},
                                    '',
                                    ''
                                ),
                                new I18nField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_CASE_EMPTY_CONTENT_TEXT,
                                    '',
                                    '',
                                    {visible: true}
                                ),
                                new TextField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_CASE_EMPTY_CONTENT_ICON,
                                    '',
                                    '',
                                    {visible: true}
                                ),
                                new BooleanField(
                                    GroupNavigationConstants.ITEM_FIELD_ID_CASE_ALLOW_EXPORT,
                                    '',
                                    true,
                                    {visible: true}
                                ),
                                new StringCollectionField(
                                    GroupNavigationConstants.ITEM_FIELD_CASE_ALLOWED_NETS,
                                    '',
                                    [],
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
        fixture = TestBed.createComponent(DefaultSimpleCaseViewComponent);
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
