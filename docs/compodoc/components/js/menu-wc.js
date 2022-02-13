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
                                            'data-target="#components-links-module-AdminComponentModule-2e2e218a1e22c8d46f2c9f0e91979e7f"' : 'data-target="#xs-components-links-module-AdminComponentModule-2e2e218a1e22c8d46f2c9f0e91979e7f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminComponentModule-2e2e218a1e22c8d46f2c9f0e91979e7f"' :
                                            'id="xs-components-links-module-AdminComponentModule-2e2e218a1e22c8d46f2c9f0e91979e7f"' }>
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
                                            'data-target="#components-links-module-AuthenticationComponentModule-fd20f73bd600494ac1842aceb09e2e62"' : 'data-target="#xs-components-links-module-AuthenticationComponentModule-fd20f73bd600494ac1842aceb09e2e62"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthenticationComponentModule-fd20f73bd600494ac1842aceb09e2e62"' :
                                            'id="xs-components-links-module-AuthenticationComponentModule-fd20f73bd600494ac1842aceb09e2e62"' }>
                                            <li class="link">
                                                <a href="components/AuthenticationOverlayComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationOverlayComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CaseViewComponentModule.html" data-type="entity-link" >CaseViewComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CaseViewComponentModule-125378ed7f2a6ee34cb144516781f167"' : 'data-target="#xs-components-links-module-CaseViewComponentModule-125378ed7f2a6ee34cb144516781f167"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CaseViewComponentModule-125378ed7f2a6ee34cb144516781f167"' :
                                            'id="xs-components-links-module-CaseViewComponentModule-125378ed7f2a6ee34cb144516781f167"' }>
                                            <li class="link">
                                                <a href="components/CaseListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaseListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardComponentModule.html" data-type="entity-link" >DashboardComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardComponentModule-fffff171eaaddf28cdc889ee1c05286c"' : 'data-target="#xs-components-links-module-DashboardComponentModule-fffff171eaaddf28cdc889ee1c05286c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardComponentModule-fffff171eaaddf28cdc889ee1c05286c"' :
                                            'id="xs-components-links-module-DashboardComponentModule-fffff171eaaddf28cdc889ee1c05286c"' }>
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
                                            'data-target="#components-links-module-DataFieldsComponentModule-0881e7a814bb76371b9e94d2b8486e38"' : 'data-target="#xs-components-links-module-DataFieldsComponentModule-0881e7a814bb76371b9e94d2b8486e38"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DataFieldsComponentModule-0881e7a814bb76371b9e94d2b8486e38"' :
                                            'id="xs-components-links-module-DataFieldsComponentModule-0881e7a814bb76371b9e94d2b8486e38"' }>
                                            <li class="link">
                                                <a href="components/BooleanFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BooleanFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ButtonFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonFieldComponent</a>
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
                                                <a href="components/TextFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextareaFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextareaFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserFieldComponent</a>
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
                                            'data-target="#components-links-module-HeaderComponentModule-3dcb4584183e5e8f67f0cfbd8c8207c5"' : 'data-target="#xs-components-links-module-HeaderComponentModule-3dcb4584183e5e8f67f0cfbd8c8207c5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderComponentModule-3dcb4584183e5e8f67f0cfbd8c8207c5"' :
                                            'id="xs-components-links-module-HeaderComponentModule-3dcb4584183e5e8f67f0cfbd8c8207c5"' }>
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
                                            'data-target="#components-links-module-NavigationComponentModule-6e34799abab8204e0b632bea371d6ddb"' : 'data-target="#xs-components-links-module-NavigationComponentModule-6e34799abab8204e0b632bea371d6ddb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavigationComponentModule-6e34799abab8204e0b632bea371d6ddb"' :
                                            'id="xs-components-links-module-NavigationComponentModule-6e34799abab8204e0b632bea371d6ddb"' }>
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
                                            'data-target="#components-links-module-PanelComponentModule-36f082c4dfb630b85a5937faf8e0c680"' : 'data-target="#xs-components-links-module-PanelComponentModule-36f082c4dfb630b85a5937faf8e0c680"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PanelComponentModule-36f082c4dfb630b85a5937faf8e0c680"' :
                                            'id="xs-components-links-module-PanelComponentModule-36f082c4dfb630b85a5937faf8e0c680"' }>
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
                                                <a href="components/PublicWorkflowPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PublicWorkflowPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskListComponent</a>
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
                                            'data-target="#components-links-module-QuickPanelComponentModule-d408d4fa99aae0bde5a0c1b6e319f057"' : 'data-target="#xs-components-links-module-QuickPanelComponentModule-d408d4fa99aae0bde5a0c1b6e319f057"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-QuickPanelComponentModule-d408d4fa99aae0bde5a0c1b6e319f057"' :
                                            'id="xs-components-links-module-QuickPanelComponentModule-d408d4fa99aae0bde5a0c1b6e319f057"' }>
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
                                            'data-target="#components-links-module-SideMenuFilterSelectorComponentModule-9eac9d0e24720399faff7375953cd74b"' : 'data-target="#xs-components-links-module-SideMenuFilterSelectorComponentModule-9eac9d0e24720399faff7375953cd74b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuFilterSelectorComponentModule-9eac9d0e24720399faff7375953cd74b"' :
                                            'id="xs-components-links-module-SideMenuFilterSelectorComponentModule-9eac9d0e24720399faff7375953cd74b"' }>
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
                                            'data-target="#components-links-module-SideMenuImportNetComponentModule-069086266220f92e5c1222d35508c98e"' : 'data-target="#xs-components-links-module-SideMenuImportNetComponentModule-069086266220f92e5c1222d35508c98e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuImportNetComponentModule-069086266220f92e5c1222d35508c98e"' :
                                            'id="xs-components-links-module-SideMenuImportNetComponentModule-069086266220f92e5c1222d35508c98e"' }>
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
                                            'data-target="#components-links-module-SideMenuLoadFilterComponentModule-099fd6e753dff07bfe3c92debb8f7c96"' : 'data-target="#xs-components-links-module-SideMenuLoadFilterComponentModule-099fd6e753dff07bfe3c92debb8f7c96"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuLoadFilterComponentModule-099fd6e753dff07bfe3c92debb8f7c96"' :
                                            'id="xs-components-links-module-SideMenuLoadFilterComponentModule-099fd6e753dff07bfe3c92debb8f7c96"' }>
                                            <li class="link">
                                                <a href="components/LoadFilterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadFilterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuNewCaseComponentModule.html" data-type="entity-link" >SideMenuNewCaseComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SideMenuNewCaseComponentModule-56e470ac30f078a3cda08dea7b16a334"' : 'data-target="#xs-components-links-module-SideMenuNewCaseComponentModule-56e470ac30f078a3cda08dea7b16a334"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuNewCaseComponentModule-56e470ac30f078a3cda08dea7b16a334"' :
                                            'id="xs-components-links-module-SideMenuNewCaseComponentModule-56e470ac30f078a3cda08dea7b16a334"' }>
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
                                            'data-target="#components-links-module-SideMenuOptionSelectorComponentModule-b88bfb5ab03c0980160bf62e3a76fb2c"' : 'data-target="#xs-components-links-module-SideMenuOptionSelectorComponentModule-b88bfb5ab03c0980160bf62e3a76fb2c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuOptionSelectorComponentModule-b88bfb5ab03c0980160bf62e3a76fb2c"' :
                                            'id="xs-components-links-module-SideMenuOptionSelectorComponentModule-b88bfb5ab03c0980160bf62e3a76fb2c"' }>
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
                                            'data-target="#components-links-module-SideMenuSaveFilterComponentModule-9e8354a793d4254730657e58c293a73b"' : 'data-target="#xs-components-links-module-SideMenuSaveFilterComponentModule-9e8354a793d4254730657e58c293a73b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuSaveFilterComponentModule-9e8354a793d4254730657e58c293a73b"' :
                                            'id="xs-components-links-module-SideMenuSaveFilterComponentModule-9e8354a793d4254730657e58c293a73b"' }>
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
                                            'data-target="#components-links-module-SideMenuUserAssignComponentModule-b473f99fb57f28eb8ff117e47e4baa88"' : 'data-target="#xs-components-links-module-SideMenuUserAssignComponentModule-b473f99fb57f28eb8ff117e47e4baa88"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuUserAssignComponentModule-b473f99fb57f28eb8ff117e47e4baa88"' :
                                            'id="xs-components-links-module-SideMenuUserAssignComponentModule-b473f99fb57f28eb8ff117e47e4baa88"' }>
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
                                <a href="modules/TabsComponentModule.html" data-type="entity-link" >TabsComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TabsComponentModule-a07e3ee8e6f4456e77e6cfd4b412cf24"' : 'data-target="#xs-components-links-module-TabsComponentModule-a07e3ee8e6f4456e77e6cfd4b412cf24"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsComponentModule-a07e3ee8e6f4456e77e6cfd4b412cf24"' :
                                            'id="xs-components-links-module-TabsComponentModule-a07e3ee8e6f4456e77e6cfd4b412cf24"' }>
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
                                            'data-target="#components-links-module-TaskContentComponentModule-9f1f61c049b501834f6fd225409bd386"' : 'data-target="#xs-components-links-module-TaskContentComponentModule-9f1f61c049b501834f6fd225409bd386"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TaskContentComponentModule-9f1f61c049b501834f6fd225409bd386"' :
                                            'id="xs-components-links-module-TaskContentComponentModule-9f1f61c049b501834f6fd225409bd386"' }>
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
                                            'data-target="#components-links-module-TreeCaseViewComponentModule-ba82291d47813e0b3195ba9e60f6b7a4"' : 'data-target="#xs-components-links-module-TreeCaseViewComponentModule-ba82291d47813e0b3195ba9e60f6b7a4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TreeCaseViewComponentModule-ba82291d47813e0b3195ba9e60f6b7a4"' :
                                            'id="xs-components-links-module-TreeCaseViewComponentModule-ba82291d47813e0b3195ba9e60f6b7a4"' }>
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
                                            'data-target="#components-links-module-WorkflowViewComponentModule-eeb6a464c4fa162a8e368cd0da7ea290"' : 'data-target="#xs-components-links-module-WorkflowViewComponentModule-eeb6a464c4fa162a8e368cd0da7ea290"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WorkflowViewComponentModule-eeb6a464c4fa162a8e368cd0da7ea290"' :
                                            'id="xs-components-links-module-WorkflowViewComponentModule-eeb6a464c4fa162a8e368cd0da7ea290"' }>
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