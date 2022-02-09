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
                                            'data-target="#components-links-module-AdminComponentModule-26e98c8be2eb2d39a6a28a53abe0571d"' : 'data-target="#xs-components-links-module-AdminComponentModule-26e98c8be2eb2d39a6a28a53abe0571d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminComponentModule-26e98c8be2eb2d39a6a28a53abe0571d"' :
                                            'id="xs-components-links-module-AdminComponentModule-26e98c8be2eb2d39a6a28a53abe0571d"' }>
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
                                            'data-target="#components-links-module-AdvancedSearchComponentModule-4e5ea022bae9a0b52ce0abde31660668"' : 'data-target="#xs-components-links-module-AdvancedSearchComponentModule-4e5ea022bae9a0b52ce0abde31660668"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdvancedSearchComponentModule-4e5ea022bae9a0b52ce0abde31660668"' :
                                            'id="xs-components-links-module-AdvancedSearchComponentModule-4e5ea022bae9a0b52ce0abde31660668"' }>
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
                                            'data-target="#components-links-module-AuthenticationComponentModule-60f1bf3974b7ff514ccd706ce98b5139"' : 'data-target="#xs-components-links-module-AuthenticationComponentModule-60f1bf3974b7ff514ccd706ce98b5139"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthenticationComponentModule-60f1bf3974b7ff514ccd706ce98b5139"' :
                                            'id="xs-components-links-module-AuthenticationComponentModule-60f1bf3974b7ff514ccd706ce98b5139"' }>
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
                                            'data-target="#components-links-module-CaseViewComponentModule-91f93d2b0ea4d3344124f5dcc21dfafa"' : 'data-target="#xs-components-links-module-CaseViewComponentModule-91f93d2b0ea4d3344124f5dcc21dfafa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CaseViewComponentModule-91f93d2b0ea4d3344124f5dcc21dfafa"' :
                                            'id="xs-components-links-module-CaseViewComponentModule-91f93d2b0ea4d3344124f5dcc21dfafa"' }>
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
                                            'data-target="#components-links-module-DashboardComponentModule-cc9aa3aaed417bc34f456d8b40dd6cf9"' : 'data-target="#xs-components-links-module-DashboardComponentModule-cc9aa3aaed417bc34f456d8b40dd6cf9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardComponentModule-cc9aa3aaed417bc34f456d8b40dd6cf9"' :
                                            'id="xs-components-links-module-DashboardComponentModule-cc9aa3aaed417bc34f456d8b40dd6cf9"' }>
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
                                            'data-target="#components-links-module-DataFieldsComponentModule-aecbebc0bad3d6b29d21de7eac53cb39"' : 'data-target="#xs-components-links-module-DataFieldsComponentModule-aecbebc0bad3d6b29d21de7eac53cb39"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DataFieldsComponentModule-aecbebc0bad3d6b29d21de7eac53cb39"' :
                                            'id="xs-components-links-module-DataFieldsComponentModule-aecbebc0bad3d6b29d21de7eac53cb39"' }>
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
                                            'data-target="#components-links-module-EmailSubmissionFormComponentModule-98e68c2f3d7d2aae036793880dc5c8e7"' : 'data-target="#xs-components-links-module-EmailSubmissionFormComponentModule-98e68c2f3d7d2aae036793880dc5c8e7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EmailSubmissionFormComponentModule-98e68c2f3d7d2aae036793880dc5c8e7"' :
                                            'id="xs-components-links-module-EmailSubmissionFormComponentModule-98e68c2f3d7d2aae036793880dc5c8e7"' }>
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
                                            'data-target="#components-links-module-ForgottenPasswordFormComponentModule-8af2b5a05f1ee7f41947a335ff299855"' : 'data-target="#xs-components-links-module-ForgottenPasswordFormComponentModule-8af2b5a05f1ee7f41947a335ff299855"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ForgottenPasswordFormComponentModule-8af2b5a05f1ee7f41947a335ff299855"' :
                                            'id="xs-components-links-module-ForgottenPasswordFormComponentModule-8af2b5a05f1ee7f41947a335ff299855"' }>
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
                                            'data-target="#components-links-module-HeaderComponentModule-9f1a65b4a076c0aab1c144e8c8b012f8"' : 'data-target="#xs-components-links-module-HeaderComponentModule-9f1a65b4a076c0aab1c144e8c8b012f8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderComponentModule-9f1a65b4a076c0aab1c144e8c8b012f8"' :
                                            'id="xs-components-links-module-HeaderComponentModule-9f1a65b4a076c0aab1c144e8c8b012f8"' }>
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
                                            'data-target="#components-links-module-LegalNoticeModule-e9a56bf864a86918238d84dafaa536ab"' : 'data-target="#xs-components-links-module-LegalNoticeModule-e9a56bf864a86918238d84dafaa536ab"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LegalNoticeModule-e9a56bf864a86918238d84dafaa536ab"' :
                                            'id="xs-components-links-module-LegalNoticeModule-e9a56bf864a86918238d84dafaa536ab"' }>
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
                                            'data-target="#components-links-module-LoginFormComponentModule-66983504dd553a70e4879f474927d88b"' : 'data-target="#xs-components-links-module-LoginFormComponentModule-66983504dd553a70e4879f474927d88b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginFormComponentModule-66983504dd553a70e4879f474927d88b"' :
                                            'id="xs-components-links-module-LoginFormComponentModule-66983504dd553a70e4879f474927d88b"' }>
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
                                            'data-target="#components-links-module-NavigationComponentModule-97a4f34b2787cbb8607e4bfe1e62e70b"' : 'data-target="#xs-components-links-module-NavigationComponentModule-97a4f34b2787cbb8607e4bfe1e62e70b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavigationComponentModule-97a4f34b2787cbb8607e4bfe1e62e70b"' :
                                            'id="xs-components-links-module-NavigationComponentModule-97a4f34b2787cbb8607e4bfe1e62e70b"' }>
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
                                            'data-target="#components-links-module-PanelComponentModule-c351ad8e49e95d5d292a7872db74df76"' : 'data-target="#xs-components-links-module-PanelComponentModule-c351ad8e49e95d5d292a7872db74df76"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PanelComponentModule-c351ad8e49e95d5d292a7872db74df76"' :
                                            'id="xs-components-links-module-PanelComponentModule-c351ad8e49e95d5d292a7872db74df76"' }>
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
                                            'data-target="#components-links-module-ProfileComponentModule-9a2f709e1b5cb73dac3f01e6cef4f602"' : 'data-target="#xs-components-links-module-ProfileComponentModule-9a2f709e1b5cb73dac3f01e6cef4f602"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileComponentModule-9a2f709e1b5cb73dac3f01e6cef4f602"' :
                                            'id="xs-components-links-module-ProfileComponentModule-9a2f709e1b5cb73dac3f01e6cef4f602"' }>
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
                                            'data-target="#components-links-module-QuickPanelComponentModule-778447fa8e237e8290213c21cea76e93"' : 'data-target="#xs-components-links-module-QuickPanelComponentModule-778447fa8e237e8290213c21cea76e93"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-QuickPanelComponentModule-778447fa8e237e8290213c21cea76e93"' :
                                            'id="xs-components-links-module-QuickPanelComponentModule-778447fa8e237e8290213c21cea76e93"' }>
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
                                            'data-target="#components-links-module-RedirectComponentModule-8424c4fdbcfb7e8222fd5bd754c25b65"' : 'data-target="#xs-components-links-module-RedirectComponentModule-8424c4fdbcfb7e8222fd5bd754c25b65"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RedirectComponentModule-8424c4fdbcfb7e8222fd5bd754c25b65"' :
                                            'id="xs-components-links-module-RedirectComponentModule-8424c4fdbcfb7e8222fd5bd754c25b65"' }>
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
                                            'data-target="#components-links-module-RegistrationFormComponentModule-f965b1140b9ed75e17cbdd41e0118103"' : 'data-target="#xs-components-links-module-RegistrationFormComponentModule-f965b1140b9ed75e17cbdd41e0118103"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegistrationFormComponentModule-f965b1140b9ed75e17cbdd41e0118103"' :
                                            'id="xs-components-links-module-RegistrationFormComponentModule-f965b1140b9ed75e17cbdd41e0118103"' }>
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
                                            'data-target="#components-links-module-SearchComponentModule-0d931da4e7f80aced85e5d04d3f52d80"' : 'data-target="#xs-components-links-module-SearchComponentModule-0d931da4e7f80aced85e5d04d3f52d80"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchComponentModule-0d931da4e7f80aced85e5d04d3f52d80"' :
                                            'id="xs-components-links-module-SearchComponentModule-0d931da4e7f80aced85e5d04d3f52d80"' }>
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
                                            'data-target="#components-links-module-SideMenuComponentModule-fe6c476859b4cf27a4524f387e629a98"' : 'data-target="#xs-components-links-module-SideMenuComponentModule-fe6c476859b4cf27a4524f387e629a98"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuComponentModule-fe6c476859b4cf27a4524f387e629a98"' :
                                            'id="xs-components-links-module-SideMenuComponentModule-fe6c476859b4cf27a4524f387e629a98"' }>
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
                                            'data-target="#components-links-module-SideMenuFilterSelectorComponentModule-4245c07564334b587f488fcef96f9802"' : 'data-target="#xs-components-links-module-SideMenuFilterSelectorComponentModule-4245c07564334b587f488fcef96f9802"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuFilterSelectorComponentModule-4245c07564334b587f488fcef96f9802"' :
                                            'id="xs-components-links-module-SideMenuFilterSelectorComponentModule-4245c07564334b587f488fcef96f9802"' }>
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
                                            'data-target="#components-links-module-SideMenuImportNetComponentModule-580b4652b066b286d65e8c8df8163271"' : 'data-target="#xs-components-links-module-SideMenuImportNetComponentModule-580b4652b066b286d65e8c8df8163271"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuImportNetComponentModule-580b4652b066b286d65e8c8df8163271"' :
                                            'id="xs-components-links-module-SideMenuImportNetComponentModule-580b4652b066b286d65e8c8df8163271"' }>
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
                                            'data-target="#components-links-module-SideMenuLoadFilterComponentModule-071d1146414bfd9313a2440f508bddf4"' : 'data-target="#xs-components-links-module-SideMenuLoadFilterComponentModule-071d1146414bfd9313a2440f508bddf4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuLoadFilterComponentModule-071d1146414bfd9313a2440f508bddf4"' :
                                            'id="xs-components-links-module-SideMenuLoadFilterComponentModule-071d1146414bfd9313a2440f508bddf4"' }>
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
                                            'data-target="#components-links-module-SideMenuNewCaseComponentModule-e9d22e87b34e46f1b1b2b2c4d7f6e083"' : 'data-target="#xs-components-links-module-SideMenuNewCaseComponentModule-e9d22e87b34e46f1b1b2b2c4d7f6e083"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuNewCaseComponentModule-e9d22e87b34e46f1b1b2b2c4d7f6e083"' :
                                            'id="xs-components-links-module-SideMenuNewCaseComponentModule-e9d22e87b34e46f1b1b2b2c4d7f6e083"' }>
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
                                            'data-target="#components-links-module-SideMenuOptionSelectorComponentModule-194879a9e9b32d112f2ea6057411bc67"' : 'data-target="#xs-components-links-module-SideMenuOptionSelectorComponentModule-194879a9e9b32d112f2ea6057411bc67"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuOptionSelectorComponentModule-194879a9e9b32d112f2ea6057411bc67"' :
                                            'id="xs-components-links-module-SideMenuOptionSelectorComponentModule-194879a9e9b32d112f2ea6057411bc67"' }>
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
                                            'data-target="#components-links-module-SideMenuSaveFilterComponentModule-e1a279066404e83d1d3821384aad09ec"' : 'data-target="#xs-components-links-module-SideMenuSaveFilterComponentModule-e1a279066404e83d1d3821384aad09ec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuSaveFilterComponentModule-e1a279066404e83d1d3821384aad09ec"' :
                                            'id="xs-components-links-module-SideMenuSaveFilterComponentModule-e1a279066404e83d1d3821384aad09ec"' }>
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
                                            'data-target="#components-links-module-SideMenuUserAssignComponentModule-0157036564d6fd3fb634f36d806a8547"' : 'data-target="#xs-components-links-module-SideMenuUserAssignComponentModule-0157036564d6fd3fb634f36d806a8547"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuUserAssignComponentModule-0157036564d6fd3fb634f36d806a8547"' :
                                            'id="xs-components-links-module-SideMenuUserAssignComponentModule-0157036564d6fd3fb634f36d806a8547"' }>
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
                                            'data-target="#components-links-module-TabsComponentModule-6a71b72bd178cab9150b8cc3814b24b3"' : 'data-target="#xs-components-links-module-TabsComponentModule-6a71b72bd178cab9150b8cc3814b24b3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsComponentModule-6a71b72bd178cab9150b8cc3814b24b3"' :
                                            'id="xs-components-links-module-TabsComponentModule-6a71b72bd178cab9150b8cc3814b24b3"' }>
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
                                            'data-target="#components-links-module-TaskContentComponentModule-8d244b522694c0246b5a0c2b7f00b4bc"' : 'data-target="#xs-components-links-module-TaskContentComponentModule-8d244b522694c0246b5a0c2b7f00b4bc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TaskContentComponentModule-8d244b522694c0246b5a0c2b7f00b4bc"' :
                                            'id="xs-components-links-module-TaskContentComponentModule-8d244b522694c0246b5a0c2b7f00b4bc"' }>
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
                                            'data-target="#components-links-module-ToolbarComponentModule-dc1b8df8f1b21e4b50fe462baffc13ef"' : 'data-target="#xs-components-links-module-ToolbarComponentModule-dc1b8df8f1b21e4b50fe462baffc13ef"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ToolbarComponentModule-dc1b8df8f1b21e4b50fe462baffc13ef"' :
                                            'id="xs-components-links-module-ToolbarComponentModule-dc1b8df8f1b21e4b50fe462baffc13ef"' }>
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
                                            'data-target="#components-links-module-TreeCaseViewComponentModule-06595ca0d487424691ed1821faf631be"' : 'data-target="#xs-components-links-module-TreeCaseViewComponentModule-06595ca0d487424691ed1821faf631be"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TreeCaseViewComponentModule-06595ca0d487424691ed1821faf631be"' :
                                            'id="xs-components-links-module-TreeCaseViewComponentModule-06595ca0d487424691ed1821faf631be"' }>
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
                                            'data-target="#components-links-module-UserComponentModule-11e186d184e79164cef9188a1c1c5067"' : 'data-target="#xs-components-links-module-UserComponentModule-11e186d184e79164cef9188a1c1c5067"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserComponentModule-11e186d184e79164cef9188a1c1c5067"' :
                                            'id="xs-components-links-module-UserComponentModule-11e186d184e79164cef9188a1c1c5067"' }>
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
                                            'data-target="#components-links-module-WorkflowViewComponentModule-7b3abdc68307928b890062a414859049"' : 'data-target="#xs-components-links-module-WorkflowViewComponentModule-7b3abdc68307928b890062a414859049"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WorkflowViewComponentModule-7b3abdc68307928b890062a414859049"' :
                                            'id="xs-components-links-module-WorkflowViewComponentModule-7b3abdc68307928b890062a414859049"' }>
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