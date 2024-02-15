'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">
                        <img alt="" class="img-responsive" data-type="compodoc-logo" data-src=images/docs-title-logo.png>
                    </a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminComponentModule.html" data-type="entity-link" >AdminComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-AdminComponentModule-b2437ce1090a61ea2c18d2316d483ee6"' : 'data-target="#xs-components-links-module-AdminComponentModule-b2437ce1090a61ea2c18d2316d483ee6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminComponentModule-b2437ce1090a61ea2c18d2316d483ee6"' :
            'id="xs-components-links-module-AdminComponentModule-b2437ce1090a61ea2c18d2316d483ee6"' }>
                                            <li class="link">
                                                <a href="components/LdapGroupRoleAssignmentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LdapGroupRoleAssignmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RoleAssignmentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleAssignmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserInviteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserInviteComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdvancedSearchComponentModule.html" data-type="entity-link" >AdvancedSearchComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-AdvancedSearchComponentModule-d8d3cb41dea416f812dcdd2b0f4b04f9"' : 'data-target="#xs-components-links-module-AdvancedSearchComponentModule-d8d3cb41dea416f812dcdd2b0f4b04f9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdvancedSearchComponentModule-d8d3cb41dea416f812dcdd2b0f4b04f9"' :
            'id="xs-components-links-module-AdvancedSearchComponentModule-d8d3cb41dea416f812dcdd2b0f4b04f9"' }>
                                            <li class="link">
                                                <a href="components/AdvancedSearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdvancedSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchClauseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchClauseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchConfigurationInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchConfigurationInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchOperandInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchOperandInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchPredicateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchPredicateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationComponentModule.html" data-type="entity-link" >AuthenticationComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-AuthenticationComponentModule-8e44483830dac5dec60778fdf312d4ec"' : 'data-target="#xs-components-links-module-AuthenticationComponentModule-8e44483830dac5dec60778fdf312d4ec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthenticationComponentModule-8e44483830dac5dec60778fdf312d4ec"' :
            'id="xs-components-links-module-AuthenticationComponentModule-8e44483830dac5dec60778fdf312d4ec"' }>
                                            <li class="link">
                                                <a href="components/AuthenticationOverlayComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationOverlayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopupSessionIdleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PopupSessionIdleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SessionIdleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionIdleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CaseViewComponentModule.html" data-type="entity-link" >CaseViewComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-CaseViewComponentModule-06de5a56cc1ecad1497a33af6c71bfdb"' : 'data-target="#xs-components-links-module-CaseViewComponentModule-06de5a56cc1ecad1497a33af6c71bfdb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CaseViewComponentModule-06de5a56cc1ecad1497a33af6c71bfdb"' :
            'id="xs-components-links-module-CaseViewComponentModule-06de5a56cc1ecad1497a33af6c71bfdb"' }>
                                            <li class="link">
                                                <a href="components/CaseListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaseListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CaseListPaginatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaseListPaginatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateCaseButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateCaseButtonComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChangePasswordFormComponentModule.html" data-type="entity-link" >ChangePasswordFormComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-ChangePasswordFormComponentModule-707061d216663eb0a68e7c91376a476e"' : 'data-target="#xs-components-links-module-ChangePasswordFormComponentModule-707061d216663eb0a68e7c91376a476e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChangePasswordFormComponentModule-707061d216663eb0a68e7c91376a476e"' :
            'id="xs-components-links-module-ChangePasswordFormComponentModule-707061d216663eb0a68e7c91376a476e"' }>
                                            <li class="link">
                                                <a href="components/ChangePasswordFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChangePasswordFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardComponentModule.html" data-type="entity-link" >DashboardComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-DashboardComponentModule-ade8b2f43878e3dbf99ccc5f9e52c855"' : 'data-target="#xs-components-links-module-DashboardComponentModule-ade8b2f43878e3dbf99ccc5f9e52c855"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardComponentModule-ade8b2f43878e3dbf99ccc5f9e52c855"' :
            'id="xs-components-links-module-DashboardComponentModule-ade8b2f43878e3dbf99ccc5f9e52c855"' }>
                                            <li class="link">
                                                <a href="components/BarchartCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BarchartCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CountCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CountCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IframeCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IframeCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LineChartCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LineChartCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LinearGaugeCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LinearGaugeCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PieChartCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PieChartCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PortalCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PortalCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataFieldsComponentModule.html" data-type="entity-link" >DataFieldsComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-DataFieldsComponentModule-6e9ae4420a0dbc36466d9c3149db8519"' : 'data-target="#xs-components-links-module-DataFieldsComponentModule-6e9ae4420a0dbc36466d9c3149db8519"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DataFieldsComponentModule-6e9ae4420a0dbc36466d9c3149db8519"' :
            'id="xs-components-links-module-DataFieldsComponentModule-6e9ae4420a0dbc36466d9c3149db8519"' }>
                                            <li class="link">
                                                <a href="components/BooleanFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BooleanFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ButtonFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardBarChartTextFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardBarChartTextFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardIframeTextFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardIframeTextFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardLineChartTextFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardLineChartTextFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardPieChartTextFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardPieChartTextFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardPortalTextFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardPortalTextFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataFieldTemplateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataFieldTemplateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DateFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DateFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DateTimeFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DateTimeFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EasymdeWrapperComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EasymdeWrapperComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EnumerationAutocompleteDynamicFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EnumerationAutocompleteDynamicFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EnumerationAutocompleteSelectFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EnumerationAutocompleteSelectFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EnumerationFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EnumerationFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EnumerationIconFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EnumerationIconFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EnumerationListFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EnumerationListFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EnumerationSelectFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EnumerationSelectFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EnumerationStepperFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EnumerationStepperFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileListFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileListFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FilterFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FilterFieldContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterFieldContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FilterFieldTabViewContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterFieldTabViewContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HtmlTextareaFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HtmlTextareaFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/I18nDividerFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >I18nDividerFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/I18nFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >I18nFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/I18nTextFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >I18nTextFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultichoiceAutocompleteFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultichoiceAutocompleteFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultichoiceFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultichoiceFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultichoiceListFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultichoiceListFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultichoiceSelectFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultichoiceSelectFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NumberCurrencyFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NumberCurrencyFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NumberDefaultFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NumberDefaultFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NumberFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NumberFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PasswordTextFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordTextFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PreviewDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreviewDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequiredLabelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequiredLabelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RichTextareaFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RichTextareaFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SimpleTextFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SimpleTextFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskRefDashboardTileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskRefDashboardTileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskRefFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskRefFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextareaFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextareaFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserListFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserListFieldComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailSubmissionFormComponentModule.html" data-type="entity-link" >EmailSubmissionFormComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-EmailSubmissionFormComponentModule-7a2cc6d50afdcb656a86447805a8017e"' : 'data-target="#xs-components-links-module-EmailSubmissionFormComponentModule-7a2cc6d50afdcb656a86447805a8017e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EmailSubmissionFormComponentModule-7a2cc6d50afdcb656a86447805a8017e"' :
            'id="xs-components-links-module-EmailSubmissionFormComponentModule-7a2cc6d50afdcb656a86447805a8017e"' }>
                                            <li class="link">
                                                <a href="components/EmailSubmissionFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailSubmissionFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilterFieldContentModule.html" data-type="entity-link" >FilterFieldContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-FilterFieldContentModule-756e7268f00826692569db4f793d725c"' : 'data-target="#xs-components-links-module-FilterFieldContentModule-756e7268f00826692569db4f793d725c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FilterFieldContentModule-756e7268f00826692569db4f793d725c"' :
            'id="xs-components-links-module-FilterFieldContentModule-756e7268f00826692569db4f793d725c"' }>
                                            <li class="link">
                                                <a href="components/FilterFieldTabViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterFieldTabViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FilterFieldTabbedCaseViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterFieldTabbedCaseViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FilterFieldTabbedTaskViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterFieldTabbedTaskViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ForgottenPasswordFormComponentModule.html" data-type="entity-link" >ForgottenPasswordFormComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-ForgottenPasswordFormComponentModule-89975823d89b10c07983516616ff9a6b"' : 'data-target="#xs-components-links-module-ForgottenPasswordFormComponentModule-89975823d89b10c07983516616ff9a6b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ForgottenPasswordFormComponentModule-89975823d89b10c07983516616ff9a6b"' :
            'id="xs-components-links-module-ForgottenPasswordFormComponentModule-89975823d89b10c07983516616ff9a6b"' }>
                                            <li class="link">
                                                <a href="components/ForgottenPasswordFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgottenPasswordFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HeaderComponentModule.html" data-type="entity-link" >HeaderComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-HeaderComponentModule-2128011c35f7011dd96ac3d186234eda"' : 'data-target="#xs-components-links-module-HeaderComponentModule-2128011c35f7011dd96ac3d186234eda"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderComponentModule-2128011c35f7011dd96ac3d186234eda"' :
            'id="xs-components-links-module-HeaderComponentModule-2128011c35f7011dd96ac3d186234eda"' }>
                                            <li class="link">
                                                <a href="components/EditModeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditModeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingModeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingModeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchModeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchModeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SortModeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SortModeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LegalNoticeModule.html" data-type="entity-link" >LegalNoticeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-LegalNoticeModule-e8a7f7c9f7777ca8041fc2da781d9001"' : 'data-target="#xs-components-links-module-LegalNoticeModule-e8a7f7c9f7777ca8041fc2da781d9001"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LegalNoticeModule-e8a7f7c9f7777ca8041fc2da781d9001"' :
            'id="xs-components-links-module-LegalNoticeModule-e8a7f7c9f7777ca8041fc2da781d9001"' }>
                                            <li class="link">
                                                <a href="components/LegalNoticeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LegalNoticeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginFormComponentModule.html" data-type="entity-link" >LoginFormComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-LoginFormComponentModule-710d5af3aac34373cb305fc0321d17ce"' : 'data-target="#xs-components-links-module-LoginFormComponentModule-710d5af3aac34373cb305fc0321d17ce"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginFormComponentModule-710d5af3aac34373cb305fc0321d17ce"' :
            'id="xs-components-links-module-LoginFormComponentModule-710d5af3aac34373cb305fc0321d17ce"' }>
                                            <li class="link">
                                                <a href="components/LoginFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NavigationComponentModule.html" data-type="entity-link" >NavigationComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-NavigationComponentModule-8b9e14ac67a09b94ba2963b3fb743d7c"' : 'data-target="#xs-components-links-module-NavigationComponentModule-8b9e14ac67a09b94ba2963b3fb743d7c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavigationComponentModule-8b9e14ac67a09b94ba2963b3fb743d7c"' :
            'id="xs-components-links-module-NavigationComponentModule-8b9e14ac67a09b94ba2963b3fb743d7c"' }>
                                            <li class="link">
                                                <a href="components/BreadcrumbsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BreadcrumbsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultSimpleTaskViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultSimpleTaskViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultTabViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultTabViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultTabbedCaseViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultTabbedCaseViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultTabbedTaskViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultTabbedTaskViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupNavigationComponentResolverComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupNavigationComponentResolverComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationDoubleDrawerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationDoubleDrawerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationDrawerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationDrawerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationRailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationRailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationTreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationTreeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PanelComponentModule.html" data-type="entity-link" >PanelComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-PanelComponentModule-96ff5e6cd7483d11f1f294fcf395325a"' : 'data-target="#xs-components-links-module-PanelComponentModule-96ff5e6cd7483d11f1f294fcf395325a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PanelComponentModule-96ff5e6cd7483d11f1f294fcf395325a"' :
            'id="xs-components-links-module-PanelComponentModule-96ff5e6cd7483d11f1f294fcf395325a"' }>
                                            <li class="link">
                                                <a href="components/CasePanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CasePanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImmediateFilterTextComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImmediateFilterTextComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImmediateFilterTextContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImmediateFilterTextContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PanelItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PanelItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PublicWorkflowPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PublicWorkflowPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SingleTaskComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SingleTaskComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskListPaginationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskListPaginationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkflowPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkflowPanelComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileComponentModule.html" data-type="entity-link" >ProfileComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-ProfileComponentModule-dca096e053495bf5cac2138d756d8e5f"' : 'data-target="#xs-components-links-module-ProfileComponentModule-dca096e053495bf5cac2138d756d8e5f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileComponentModule-dca096e053495bf5cac2138d756d8e5f"' :
            'id="xs-components-links-module-ProfileComponentModule-dca096e053495bf5cac2138d756d8e5f"' }>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuickPanelComponentModule.html" data-type="entity-link" >QuickPanelComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-QuickPanelComponentModule-10cacf89646f952e827bca384ed45faa"' : 'data-target="#xs-components-links-module-QuickPanelComponentModule-10cacf89646f952e827bca384ed45faa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-QuickPanelComponentModule-10cacf89646f952e827bca384ed45faa"' :
            'id="xs-components-links-module-QuickPanelComponentModule-10cacf89646f952e827bca384ed45faa"' }>
                                            <li class="link">
                                                <a href="components/ImpersonateQuickPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImpersonateQuickPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InternalLinkComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InternalLinkComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LanguageSelectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LanguageSelectorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoutShortcutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoutShortcutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuickPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuickPanelComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedirectComponentModule.html" data-type="entity-link" >RedirectComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-RedirectComponentModule-0e863c3760b6bbf8ec1fac7a09f17b4d"' : 'data-target="#xs-components-links-module-RedirectComponentModule-0e863c3760b6bbf8ec1fac7a09f17b4d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RedirectComponentModule-0e863c3760b6bbf8ec1fac7a09f17b4d"' :
            'id="xs-components-links-module-RedirectComponentModule-0e863c3760b6bbf8ec1fac7a09f17b4d"' }>
                                            <li class="link">
                                                <a href="components/RedirectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedirectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegistrationFormComponentModule.html" data-type="entity-link" >RegistrationFormComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-RegistrationFormComponentModule-9b46017e6a329ebe6108b12d554fa0eb"' : 'data-target="#xs-components-links-module-RegistrationFormComponentModule-9b46017e6a329ebe6108b12d554fa0eb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegistrationFormComponentModule-9b46017e6a329ebe6108b12d554fa0eb"' :
            'id="xs-components-links-module-RegistrationFormComponentModule-9b46017e6a329ebe6108b12d554fa0eb"' }>
                                            <li class="link">
                                                <a href="components/RegistrationFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistrationFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchComponentModule.html" data-type="entity-link" >SearchComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-SearchComponentModule-d96872cfd4ae448182aeeecc457fed32"' : 'data-target="#xs-components-links-module-SearchComponentModule-d96872cfd4ae448182aeeecc457fed32"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchComponentModule-d96872cfd4ae448182aeeecc457fed32"' :
            'id="xs-components-links-module-SearchComponentModule-d96872cfd4ae448182aeeecc457fed32"' }>
                                            <li class="link">
                                                <a href="components/CaseSearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">CaseSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FulltextSearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FulltextSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskSearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">TaskSearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuAdminImpersonateComponentModule.html" data-type="entity-link" >SideMenuAdminImpersonateComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-SideMenuAdminImpersonateComponentModule-554afb98846faa3dfe0e6e54e80d2087"' : 'data-target="#xs-components-links-module-SideMenuAdminImpersonateComponentModule-554afb98846faa3dfe0e6e54e80d2087"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuAdminImpersonateComponentModule-554afb98846faa3dfe0e6e54e80d2087"' :
            'id="xs-components-links-module-SideMenuAdminImpersonateComponentModule-554afb98846faa3dfe0e6e54e80d2087"' }>
                                            <li class="link">
                                                <a href="components/AdminImpersonateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminImpersonateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminImpersonateItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminImpersonateItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminImpersonateListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminImpersonateListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuComponentModule.html" data-type="entity-link" >SideMenuComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-SideMenuComponentModule-2e973289139b6b8252aa1dab2635ad2f"' : 'data-target="#xs-components-links-module-SideMenuComponentModule-2e973289139b6b8252aa1dab2635ad2f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuComponentModule-2e973289139b6b8252aa1dab2635ad2f"' :
            'id="xs-components-links-module-SideMenuComponentModule-2e973289139b6b8252aa1dab2635ad2f"' }>
                                            <li class="link">
                                                <a href="components/SideMenuContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SideMenuContainerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuContentComponentModule.html" data-type="entity-link" >SideMenuContentComponentModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuFilterSelectorComponentModule.html" data-type="entity-link" >SideMenuFilterSelectorComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-SideMenuFilterSelectorComponentModule-54743deeacc9ee995f10580c3bc3699e"' : 'data-target="#xs-components-links-module-SideMenuFilterSelectorComponentModule-54743deeacc9ee995f10580c3bc3699e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuFilterSelectorComponentModule-54743deeacc9ee995f10580c3bc3699e"' :
            'id="xs-components-links-module-SideMenuFilterSelectorComponentModule-54743deeacc9ee995f10580c3bc3699e"' }>
                                            <li class="link">
                                                <a href="components/FilterSelectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterSelectorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuImportNetComponentModule.html" data-type="entity-link" >SideMenuImportNetComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-SideMenuImportNetComponentModule-1b806ebf18b2b21ebde5beef611eff95"' : 'data-target="#xs-components-links-module-SideMenuImportNetComponentModule-1b806ebf18b2b21ebde5beef611eff95"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuImportNetComponentModule-1b806ebf18b2b21ebde5beef611eff95"' :
            'id="xs-components-links-module-SideMenuImportNetComponentModule-1b806ebf18b2b21ebde5beef611eff95"' }>
                                            <li class="link">
                                                <a href="components/ImportNetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImportNetComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuLoadFilterComponentModule.html" data-type="entity-link" >SideMenuLoadFilterComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-SideMenuLoadFilterComponentModule-99f996f5afb6e488ecd0e8ca8766739a"' : 'data-target="#xs-components-links-module-SideMenuLoadFilterComponentModule-99f996f5afb6e488ecd0e8ca8766739a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuLoadFilterComponentModule-99f996f5afb6e488ecd0e8ca8766739a"' :
            'id="xs-components-links-module-SideMenuLoadFilterComponentModule-99f996f5afb6e488ecd0e8ca8766739a"' }>
                                            <li class="link">
                                                <a href="components/LoadFilterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadFilterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuMultiUserAssignComponentModule.html" data-type="entity-link" >SideMenuMultiUserAssignComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-SideMenuMultiUserAssignComponentModule-b03ed93c4a9772dafaa57c0add89f30e"' : 'data-target="#xs-components-links-module-SideMenuMultiUserAssignComponentModule-b03ed93c4a9772dafaa57c0add89f30e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuMultiUserAssignComponentModule-b03ed93c4a9772dafaa57c0add89f30e"' :
            'id="xs-components-links-module-SideMenuMultiUserAssignComponentModule-b03ed93c4a9772dafaa57c0add89f30e"' }>
                                            <li class="link">
                                                <a href="components/MultiUserAssignComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultiUserAssignComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultiUserAssignItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultiUserAssignItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultiUserAssignListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultiUserAssignListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuNewCaseComponentModule.html" data-type="entity-link" >SideMenuNewCaseComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-SideMenuNewCaseComponentModule-f46f6d550ccc595dde0f6571d787e8bd"' : 'data-target="#xs-components-links-module-SideMenuNewCaseComponentModule-f46f6d550ccc595dde0f6571d787e8bd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuNewCaseComponentModule-f46f6d550ccc595dde0f6571d787e8bd"' :
            'id="xs-components-links-module-SideMenuNewCaseComponentModule-f46f6d550ccc595dde0f6571d787e8bd"' }>
                                            <li class="link">
                                                <a href="components/NewCaseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewCaseComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuOptionSelectorComponentModule.html" data-type="entity-link" >SideMenuOptionSelectorComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-SideMenuOptionSelectorComponentModule-a4935668466d1ae2d88b035989872637"' : 'data-target="#xs-components-links-module-SideMenuOptionSelectorComponentModule-a4935668466d1ae2d88b035989872637"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuOptionSelectorComponentModule-a4935668466d1ae2d88b035989872637"' :
            'id="xs-components-links-module-SideMenuOptionSelectorComponentModule-a4935668466d1ae2d88b035989872637"' }>
                                            <li class="link">
                                                <a href="components/OptionSelectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OptionSelectorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuSaveFilterComponentModule.html" data-type="entity-link" >SideMenuSaveFilterComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-SideMenuSaveFilterComponentModule-a339524d8cc0d5ae4c027e3979d94f31"' : 'data-target="#xs-components-links-module-SideMenuSaveFilterComponentModule-a339524d8cc0d5ae4c027e3979d94f31"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuSaveFilterComponentModule-a339524d8cc0d5ae4c027e3979d94f31"' :
            'id="xs-components-links-module-SideMenuSaveFilterComponentModule-a339524d8cc0d5ae4c027e3979d94f31"' }>
                                            <li class="link">
                                                <a href="components/SaveFilterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaveFilterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuUserAssignComponentModule.html" data-type="entity-link" >SideMenuUserAssignComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-SideMenuUserAssignComponentModule-7d1b61ec6e74fe342d656d3d9470405b"' : 'data-target="#xs-components-links-module-SideMenuUserAssignComponentModule-7d1b61ec6e74fe342d656d3d9470405b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuUserAssignComponentModule-7d1b61ec6e74fe342d656d3d9470405b"' :
            'id="xs-components-links-module-SideMenuUserAssignComponentModule-7d1b61ec6e74fe342d656d3d9470405b"' }>
                                            <li class="link">
                                                <a href="components/UserAssignComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserAssignComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserAssignItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserAssignItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserAssignListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserAssignListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuUserImpersonateComponentModule.html" data-type="entity-link" >SideMenuUserImpersonateComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-SideMenuUserImpersonateComponentModule-f7e9b908551edc757053a65a432388d0"' : 'data-target="#xs-components-links-module-SideMenuUserImpersonateComponentModule-f7e9b908551edc757053a65a432388d0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuUserImpersonateComponentModule-f7e9b908551edc757053a65a432388d0"' :
            'id="xs-components-links-module-SideMenuUserImpersonateComponentModule-f7e9b908551edc757053a65a432388d0"' }>
                                            <li class="link">
                                                <a href="components/UserImpersonateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserImpersonateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsComponentModule.html" data-type="entity-link" >TabsComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-TabsComponentModule-dacc8577d23fa7fa9d79ca9b23a4ce18"' : 'data-target="#xs-components-links-module-TabsComponentModule-dacc8577d23fa7fa9d79ca9b23a4ce18"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsComponentModule-dacc8577d23fa7fa9d79ca9b23a4ce18"' :
            'id="xs-components-links-module-TabsComponentModule-dacc8577d23fa7fa9d79ca9b23a4ce18"' }>
                                            <li class="link">
                                                <a href="components/TabViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TaskContentComponentModule.html" data-type="entity-link" >TaskContentComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-TaskContentComponentModule-a6938fe3a98fac50c51ddcf5596c64b2"' : 'data-target="#xs-components-links-module-TaskContentComponentModule-a6938fe3a98fac50c51ddcf5596c64b2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TaskContentComponentModule-a6938fe3a98fac50c51ddcf5596c64b2"' :
            'id="xs-components-links-module-TaskContentComponentModule-a6938fe3a98fac50c51ddcf5596c64b2"' }>
                                            <li class="link">
                                                <a href="components/FieldComponentResolverComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FieldComponentResolverComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ToolbarComponentModule.html" data-type="entity-link" >ToolbarComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-ToolbarComponentModule-c34f4feb01c711a71346e72d4a86f89c"' : 'data-target="#xs-components-links-module-ToolbarComponentModule-c34f4feb01c711a71346e72d4a86f89c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ToolbarComponentModule-c34f4feb01c711a71346e72d4a86f89c"' :
            'id="xs-components-links-module-ToolbarComponentModule-c34f4feb01c711a71346e72d4a86f89c"' }>
                                            <li class="link">
                                                <a href="components/ToolbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TreeCaseViewComponentModule.html" data-type="entity-link" >TreeCaseViewComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-TreeCaseViewComponentModule-bfaaa2b456936802a7f6e41fff2c334d"' : 'data-target="#xs-components-links-module-TreeCaseViewComponentModule-bfaaa2b456936802a7f6e41fff2c334d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TreeCaseViewComponentModule-bfaaa2b456936802a7f6e41fff2c334d"' :
            'id="xs-components-links-module-TreeCaseViewComponentModule-bfaaa2b456936802a7f6e41fff2c334d"' }>
                                            <li class="link">
                                                <a href="components/AddChildNodeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddChildNodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RemoveNodeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RemoveNodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TreeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TreeTaskContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TreeTaskContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserComponentModule.html" data-type="entity-link" >UserComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-UserComponentModule-753b21563c56cf0b5660eb7867ce81e2"' : 'data-target="#xs-components-links-module-UserComponentModule-753b21563c56cf0b5660eb7867ce81e2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserComponentModule-753b21563c56cf0b5660eb7867ce81e2"' :
            'id="xs-components-links-module-UserComponentModule-753b21563c56cf0b5660eb7867ce81e2"' }>
                                            <li class="link">
                                                <a href="components/UserCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WorkflowViewComponentModule.html" data-type="entity-link" >WorkflowViewComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
            'data-target="#components-links-module-WorkflowViewComponentModule-332dc21f7c0c02246ad3b32a8a1967e1"' : 'data-target="#xs-components-links-module-WorkflowViewComponentModule-332dc21f7c0c02246ad3b32a8a1967e1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WorkflowViewComponentModule-332dc21f7c0c02246ad3b32a8a1967e1"' :
            'id="xs-components-links-module-WorkflowViewComponentModule-332dc21f7c0c02246ad3b32a8a1967e1"' }>
                                            <li class="link">
                                                <a href="components/WorkflowViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkflowViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ImportToAdd.html" data-type="entity-link" >ImportToAdd</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewClassInfo.html" data-type="entity-link" >ViewClassInfo</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
            'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DefaultGroupNavigationComponentResolverService.html" data-type="entity-link" >DefaultGroupNavigationComponentResolverService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/InjectedTabbedCaseViewDataWithNavigationItemTaskData.html" data-type="entity-link" >InjectedTabbedCaseViewDataWithNavigationItemTaskData</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="unit-test.html"><span class="icon ion-ios-podium"></span>Unit test coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
