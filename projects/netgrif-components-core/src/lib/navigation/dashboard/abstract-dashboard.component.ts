import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {PaginationParams} from '../../utility/pagination/pagination-params';
import {ToolbarConfig} from '../../toolbar/toolbar-config';
import {Case} from '../../resources/interface/case';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {LoggerService} from '../../logger/services/logger.service';
import {UriService} from '../service/uri.service';
import {DoubleDrawerNavigationService} from '../navigation-double-drawer/service/double-drawer-navigation.service';
import {CaseSearchRequestBody} from '../../filter/models/case-search-request-body';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {I18nFieldValue} from '../../data-fields/i18n-field/models/i18n-field-value';
import {LanguageService} from '../../translate/language.service';
import {LoadingEmitter} from '../../utility/loading-emitter';


@Component({
    selector: 'ncc-dashboard',
    template: ''
})
export abstract class AbstractDashboardComponent {

    public static readonly MAIN_DASHBOARD = 'main_dashboard';

    public static readonly DASHBOARD_MANAGEMENT_IDENTIFIER = 'dashboard_management';

    public static readonly DASHBOARD_MANAGEMENT_ID_DATAFIELD = 'dashboard_id';
    public static readonly DASHBOARD_MANAGEMENT_ITEM_TO_PREFERENCE_ITEM_DATAFIELD = 'dashboard_item_to_preference_item';
    public static readonly DASHBOARD_MANAGEMENT_SIMPLE_TOOLBAR_DATAFIELD = 'simple_dashboard_toolbar';
    public static readonly DASHBOARD_MANAGEMENT_PROFILE_TOOLBAR_DATAFIELD = 'profile_dashboard_toolbar';
    public static readonly DASHBOARD_MANAGEMENT_LANGUAGE_TOOLBAR_DATAFIELD = 'language_dashboard_toolbar';
    public static readonly DASHBOARD_MANAGEMENT_LOGOUT_TOOLBAR_DATAFIELD = 'logout_dashboard_toolbar';
    public static readonly DASHBOARD_MANAGEMENT_NAME_DATAFIELD = 'dashboard_name';
    public static readonly DASHBOARD_MANAGEMENT_LOGO_DATAFIELD = 'dashboard_logo';
    public static readonly DASHBOARD_MANAGEMENT_ITEMS_ORDER_DATAFIELD = "items_order";
    public static readonly DASHBOARD_MANAGEMENT_PROFILE_URL_DATAFIELD = "profile_url";
    public static readonly DASHBOARD_MANAGEMENT_LOGIN_URL_DATAFIELD = "login_url";

    public static readonly DASHBOARD_ITEM_ICON_DATAFIELD = 'item_icon';
    public static readonly DASHBOARD_ITEM_NAME_DATAFIELD = 'item_name';
    public static readonly DASHBOARD_ITEM_URL_DATAFIELD = 'external_url';
    public static readonly DASHBOARD_ITEM_INTERNAL_DATAFIELD = 'is_internal';
    public static readonly DASHBOARD_ITEM_EXTERNAL_ICON_DATAFIELD = 'external_icon';
    public static readonly DASHBOARD_ITEM_FONT_COLOR_DATAFIELD = 'font_color';
    public static readonly DASHBOARD_ITEM_FONT_WEIGHT_DATAFIELD = 'font_weight';
    public static readonly DASHBOARD_ITEM_ICON_COLOR_DATAFIELD = 'icon_color';

    public toolbarConfig: ToolbarConfig = {
        profileEnabled: false,
        languageEnabled: false,
        logoutEnabled: false,
        simpleToolbar: true,
        toolbarName: {
            defaultValue: 'Netgrif',
            translations: {}
        },
        toolbarLogo: 'assets/img/netgrif_full_white.svg',
        profileUrl: 'profile',
        loginUrl: ''
    };

    public dashboardId: string = AbstractDashboardComponent.MAIN_DASHBOARD;
    public dashboardCase: Case;
    public dashboardItems: Array<Case>;
    public dashboardItemsMapping: {
        [key: string]: Case
    };
    private itemsLoaded: number = 0;

    public loading$: LoadingEmitter = new LoadingEmitter();

    constructor(
        protected _caseResource: CaseResourceService,
        protected _log: LoggerService,
        protected _uriService: UriService,
        protected _router: Router,
        protected _languageService: LanguageService,
        protected _doubleDrawerNavigationService: DoubleDrawerNavigationService
    ) {
        this.dashboardItemsMapping = {};
        this.dashboardItems = [];
        this.loading$.on();
        const dashboardManagementSearchBody: CaseSearchRequestBody = {
            process: {identifier: AbstractDashboardComponent.DASHBOARD_MANAGEMENT_IDENTIFIER},
            data: {
                [AbstractDashboardComponent.DASHBOARD_MANAGEMENT_ID_DATAFIELD]: this.dashboardId
            }
        };
        let dashboardManagementParams = new HttpParams()
            .set(PaginationParams.PAGE_SIZE, 1);
        this._caseResource.searchCases(SimpleFilter.fromCaseQuery(dashboardManagementSearchBody), dashboardManagementParams).subscribe(resultDashboard => {
            const dashboardContent = resultDashboard.content;
            if (!dashboardContent || !dashboardContent.length || dashboardContent.length < 1) {
                this.loading$.off();
                this._log.error('Dashboard management case not found.');
                return;
            }
            this.dashboardCase = dashboardContent[0];
            this.toolbarConfig = {
                profileEnabled: this.getManagementProfileToolbar(this.dashboardCase),
                languageEnabled: this.getManagementLanguageToolbar(this.dashboardCase),
                logoutEnabled: this.getManagementLogoutToolbar(this.dashboardCase),
                simpleToolbar: this.getManagementSimpleToolbar(this.dashboardCase),
                toolbarName: this.getManagementName(this.dashboardCase),
                toolbarLogo: this.getManagementLogo(this.dashboardCase),
                profileUrl: this.getManagementProfileUrl(this.dashboardCase),
                loginUrl: this.getManagementLoginUrl(this.dashboardCase)
            }

            const dashboardItemsOptions = this.dashboardCase.immediateData
                .find(immediateField => immediateField['importId'] === AbstractDashboardComponent.DASHBOARD_MANAGEMENT_ITEM_TO_PREFERENCE_ITEM_DATAFIELD).options;

            const dashboardPreferenceToItems = Object.entries(dashboardItemsOptions)
                .filter(([key, value]) => (value as any as I18nFieldValue).defaultValue != null)
                .reduce((accum, [key, value]) => {
                    accum[(value as any as I18nFieldValue).defaultValue] = key;
                    return accum;
                }, {});

            let dashboardItemsParams = new HttpParams()
                .set(PaginationParams.PAGE_SIZE, 100);
            this.getDashboardItems(dashboardItemsOptions, dashboardItemsParams);
            this.getPreferenceItems(dashboardPreferenceToItems, dashboardItemsParams);
        });
    }

    private getPreferenceItems(dashboardPreferenceToItems: {}, dashboardItemsParams: HttpParams) {
        let preferenceItemsSearchBody = {
            stringId: Object.keys(dashboardPreferenceToItems)
        };
        this._caseResource.searchCases(SimpleFilter.fromCaseQuery(preferenceItemsSearchBody), dashboardItemsParams).subscribe(resultItems => {
            const itemsContent = resultItems.content;
            itemsContent.forEach(preferenceItemCase => {
                const navigationItem = this._doubleDrawerNavigationService.resolveItemCaseToNavigationItem(preferenceItemCase);
                const dashboardItemId = dashboardPreferenceToItems[preferenceItemCase.stringId];
                if (!navigationItem) {
                    this.dashboardItems = this.dashboardItems.filter(dashItem => dashItem.stringId !== dashboardItemId);
                    return;
                }
                this.dashboardItemsMapping[dashboardItemId] = preferenceItemCase;
            });
            this.itemsLoaded += 1;
            if (this.itemsLoaded == 2) {
                this.loading$.off();
            }
        });
    }

    private getDashboardItems(dashboardItemsOptions: {
        defaultValue?: string
    }, dashboardItemsParams: HttpParams) {
        const itemsOrder = this.getManagementItemsOrder(this.dashboardCase).split(",");
        let dashboardItemsSearchBody: CaseSearchRequestBody = {
            stringId: Object.keys(dashboardItemsOptions)
        };
        this._caseResource.searchCases(SimpleFilter.fromCaseQuery(dashboardItemsSearchBody), dashboardItemsParams).subscribe(resultItems => {
            const itemsContent = resultItems.content;
            if (!itemsContent || !itemsContent.length || itemsContent.length < 1) {
                this.loading$.off();
                this._log.error('No dashboard items found.');
            }
            itemsContent.forEach(item => {
                const itemIndex = itemsOrder.indexOf(item.stringId);
                this.dashboardItems[itemIndex] = item;
            });
            this.itemsLoaded += 1;
            if (this.itemsLoaded == 2) {
                this.loading$.off();
            }
        });
    }

    // GET item fields
    public getItemName(itemCase: Case): string {
        const i18nFieldValue = this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_ITEM_NAME_DATAFIELD) as I18nFieldValue;
        return this._languageService.getLanguage() in i18nFieldValue.translations
            ? i18nFieldValue.translations[this._languageService.getLanguage()]
            : i18nFieldValue.defaultValue;
    }

    public getItemIcon(itemCase: Case): string {
        return this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_ITEM_ICON_DATAFIELD) as string;
    }

    public getItemInternal(itemCase: Case): boolean {
        return this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_ITEM_INTERNAL_DATAFIELD) as boolean;
    }

    public getItemExternalIcon(itemCase: Case): boolean {
        return this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_ITEM_EXTERNAL_ICON_DATAFIELD) as boolean;
    }

    public getItemURL(itemCase: Case): string {
        return this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_ITEM_URL_DATAFIELD) as string;
    }

    public getItemFontColor(itemCase: Case): string {
        const fontColor = this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_ITEM_FONT_COLOR_DATAFIELD) as string;
        return !!fontColor && fontColor !== '' ? fontColor : 'black';
    }

    public getItemFontWeight(itemCase: Case): string {
        const fontWeight = this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_ITEM_FONT_WEIGHT_DATAFIELD) as string;
        return !!fontWeight && fontWeight !== '' ? fontWeight : 'normal';
    }

    public getItemIconColor(itemCase: Case): string {
        const iconColor = this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_ITEM_ICON_COLOR_DATAFIELD);
        return !!iconColor && iconColor !== '' ? iconColor : 'black';
    }

    // GET management fields
    protected getManagementSimpleToolbar(itemCase: Case): boolean {
        return this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_MANAGEMENT_SIMPLE_TOOLBAR_DATAFIELD) as boolean;
    }

    protected getManagementProfileToolbar(itemCase: Case): boolean {
        return this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_MANAGEMENT_PROFILE_TOOLBAR_DATAFIELD) as boolean;
    }

    protected getManagementLanguageToolbar(itemCase: Case): boolean {
        return this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_MANAGEMENT_LANGUAGE_TOOLBAR_DATAFIELD) as boolean;
    }

    protected getManagementLogoutToolbar(itemCase: Case): boolean {
        return this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_MANAGEMENT_LOGOUT_TOOLBAR_DATAFIELD) as boolean;
    }

    protected getManagementName(itemCase: Case): I18nFieldValue {
        return this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_MANAGEMENT_NAME_DATAFIELD) as I18nFieldValue;
    }

    protected getManagementLogo(itemCase: Case): string {
        return this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_MANAGEMENT_LOGO_DATAFIELD) as string;
    }

    protected getManagementItemsOrder(itemCase: Case): string {
        return this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_MANAGEMENT_ITEMS_ORDER_DATAFIELD) as string;
    }

    protected getManagementProfileUrl(itemCase: Case): string {
        return this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_MANAGEMENT_PROFILE_URL_DATAFIELD) as string;
    }

    protected getManagementLoginUrl(itemCase: Case): string {
        return this.getFieldValue(itemCase, AbstractDashboardComponent.DASHBOARD_MANAGEMENT_LOGIN_URL_DATAFIELD) as string;
    }

    protected getFieldValue(itemCase: Case, fieldId: string): any {
        return itemCase.immediateData.find(immediateField => immediateField["importId"] === fieldId).value;
    }

    public navigate(itemCase: Case) {
        if (this.getItemInternal(itemCase)) {
            const itemPath = this._doubleDrawerNavigationService.getItemRoutingPath(this.dashboardItemsMapping[itemCase.stringId]);
            const nodePath = this.getFieldValue(this.dashboardItemsMapping[itemCase.stringId], 'nodePath');
            this._uriService.getNodeByPath(nodePath).subscribe(uriResource => {
                this._uriService.activeNode = uriResource;
                this._router.navigate([itemPath]);
            });
        } else {
            window.open(this.getItemURL(itemCase), "_blank");
        }
    }
}
