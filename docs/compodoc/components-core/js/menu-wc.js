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
                                <a href="modules/AlertDialogModule.html" data-type="entity-link" >AlertDialogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AlertDialogModule-7c1628cdb2576b577454206c739e039b"' : 'data-target="#xs-components-links-module-AlertDialogModule-7c1628cdb2576b577454206c739e039b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AlertDialogModule-7c1628cdb2576b577454206c739e039b"' :
                                            'id="xs-components-links-module-AlertDialogModule-7c1628cdb2576b577454206c739e039b"' }>
                                            <li class="link">
                                                <a href="components/AlertDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlertDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationModule.html" data-type="entity-link" >AuthenticationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ConfirmDialogModule.html" data-type="entity-link" >ConfirmDialogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ConfirmDialogModule-f459a7545aa2d96cda70ce6fdae58142"' : 'data-target="#xs-components-links-module-ConfirmDialogModule-f459a7545aa2d96cda70ce6fdae58142"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ConfirmDialogModule-f459a7545aa2d96cda70ce6fdae58142"' :
                                            'id="xs-components-links-module-ConfirmDialogModule-f459a7545aa2d96cda70ce6fdae58142"' }>
                                            <li class="link">
                                                <a href="components/ConfirmDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CovalentModule.html" data-type="entity-link" >CovalentModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CurrencyModule.html" data-type="entity-link" >CurrencyModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DataFieldsModule.html" data-type="entity-link" >DataFieldsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DefaultSearchCategoriesModule.html" data-type="entity-link" >DefaultSearchCategoriesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DialogModule.html" data-type="entity-link" >DialogModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PromptDialogModule.html" data-type="entity-link" >PromptDialogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PromptDialogModule-b5dff2a152051e778f0100f0f476d302"' : 'data-target="#xs-components-links-module-PromptDialogModule-b5dff2a152051e778f0100f0f476d302"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PromptDialogModule-b5dff2a152051e778f0100f0f476d302"' :
                                            'id="xs-components-links-module-PromptDialogModule-b5dff2a152051e778f0100f0f476d302"' }>
                                            <li class="link">
                                                <a href="components/PromptDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PromptDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SignUpModule.html" data-type="entity-link" >SignUpModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SnackBarModule.html" data-type="entity-link" >SnackBarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SnackBarModule-ddb4cdef7567f2c4cbabb27716c5c6d0"' : 'data-target="#xs-components-links-module-SnackBarModule-ddb4cdef7567f2c4cbabb27716c5c6d0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SnackBarModule-ddb4cdef7567f2c4cbabb27716c5c6d0"' :
                                            'id="xs-components-links-module-SnackBarModule-ddb4cdef7567f2c4cbabb27716c5c6d0"' }>
                                            <li class="link">
                                                <a href="components/ErrorSnackBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorSnackBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GenericSnackBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenericSnackBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SuccessSnackBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SuccessSnackBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WarningSnackBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WarningSnackBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TestMockDependenciesModule.html" data-type="entity-link" >TestMockDependenciesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TranslateLibModule.html" data-type="entity-link" >TranslateLibModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TranslateLibModule-d0af318455dcd43cb1dbe190a596d247"' : 'data-target="#xs-injectables-links-module-TranslateLibModule-d0af318455dcd43cb1dbe190a596d247"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TranslateLibModule-d0af318455dcd43cb1dbe190a596d247"' :
                                        'id="xs-injectables-links-module-TranslateLibModule-d0af318455dcd43cb1dbe190a596d247"' }>
                                        <li class="link">
                                            <a href="injectables/LanguageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LanguageService</a>
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
                                <a href="classes/AbstractAddChildNodeComponent.html" data-type="entity-link" >AbstractAddChildNodeComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractAdvancedSearchComponent.html" data-type="entity-link" >AbstractAdvancedSearchComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractAuthenticationOverlay.html" data-type="entity-link" >AbstractAuthenticationOverlay</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractBooleanFieldComponent.html" data-type="entity-link" >AbstractBooleanFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractButtonFieldComponent.html" data-type="entity-link" >AbstractButtonFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractCaseListComponent.html" data-type="entity-link" >AbstractCaseListComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractCasePanelComponent.html" data-type="entity-link" >AbstractCasePanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractCaseView.html" data-type="entity-link" >AbstractCaseView</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractCountCard.html" data-type="entity-link" >AbstractCountCard</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractCurrencyNumberFieldComponent.html" data-type="entity-link" >AbstractCurrencyNumberFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractCustomCard.html" data-type="entity-link" >AbstractCustomCard</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractDashboardContent.html" data-type="entity-link" >AbstractDashboardContent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractDataFieldComponent.html" data-type="entity-link" >AbstractDataFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractDataFieldTemplateComponent.html" data-type="entity-link" >AbstractDataFieldTemplateComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractDateFieldComponent.html" data-type="entity-link" >AbstractDateFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractDateTimeFieldComponent.html" data-type="entity-link" >AbstractDateTimeFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractDefaultNumberFieldComponent.html" data-type="entity-link" >AbstractDefaultNumberFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractDialog.html" data-type="entity-link" >AbstractDialog</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractEditModeComponent.html" data-type="entity-link" >AbstractEditModeComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractEmailSubmissionFormComponent.html" data-type="entity-link" >AbstractEmailSubmissionFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractEnumerationAutocompleteDynamicFieldComponent.html" data-type="entity-link" >AbstractEnumerationAutocompleteDynamicFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractEnumerationAutocompleteSelectFieldComponent.html" data-type="entity-link" >AbstractEnumerationAutocompleteSelectFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractEnumerationFieldComponent.html" data-type="entity-link" >AbstractEnumerationFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractEnumerationIconFieldComponent.html" data-type="entity-link" >AbstractEnumerationIconFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractEnumerationListFieldComponent.html" data-type="entity-link" >AbstractEnumerationListFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractEnumerationSelectFieldComponent.html" data-type="entity-link" >AbstractEnumerationSelectFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractEnumerationStepperFieldComponent.html" data-type="entity-link" >AbstractEnumerationStepperFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractFieldComponentResolverComponent.html" data-type="entity-link" >AbstractFieldComponentResolverComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractFileFieldComponent.html" data-type="entity-link" >AbstractFileFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractFileListFieldComponent.html" data-type="entity-link" >AbstractFileListFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractFilterFieldComponent.html" data-type="entity-link" >AbstractFilterFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractFilterFieldContentComponent.html" data-type="entity-link" >AbstractFilterFieldContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractFilterSelectorComponent.html" data-type="entity-link" >AbstractFilterSelectorComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractForgottenPasswordComponent.html" data-type="entity-link" >AbstractForgottenPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractFulltextSearchComponent.html" data-type="entity-link" >AbstractFulltextSearchComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractGroupNavigationComponentResolverComponent.html" data-type="entity-link" >AbstractGroupNavigationComponentResolverComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractHeaderComponent.html" data-type="entity-link" >AbstractHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractHeaderModeComponent.html" data-type="entity-link" >AbstractHeaderModeComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractHeaderService.html" data-type="entity-link" >AbstractHeaderService</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractHtmlTextareaFieldComponent.html" data-type="entity-link" >AbstractHtmlTextareaFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractI18nDividerFieldComponent.html" data-type="entity-link" >AbstractI18nDividerFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractI18nFieldComponent.html" data-type="entity-link" >AbstractI18nFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractI18nTextFieldComponent.html" data-type="entity-link" >AbstractI18nTextFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractIframeCard.html" data-type="entity-link" >AbstractIframeCard</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractImmediateFilterTextComponent.html" data-type="entity-link" >AbstractImmediateFilterTextComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractImmediateFilterTextContentComponent.html" data-type="entity-link" >AbstractImmediateFilterTextContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractImportNetComponent.html" data-type="entity-link" >AbstractImportNetComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractInternalLinkComponent.html" data-type="entity-link" >AbstractInternalLinkComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractLanguageSelectorComponent.html" data-type="entity-link" >AbstractLanguageSelectorComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractLegalNoticeComponent.html" data-type="entity-link" >AbstractLegalNoticeComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractLoadFilterComponent.html" data-type="entity-link" >AbstractLoadFilterComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractLoadingModeComponent.html" data-type="entity-link" >AbstractLoadingModeComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractLoggerService.html" data-type="entity-link" >AbstractLoggerService</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractLoginFormComponent.html" data-type="entity-link" >AbstractLoginFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractLogoutShortcutComponent.html" data-type="entity-link" >AbstractLogoutShortcutComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractMultichoiceFieldComponent.html" data-type="entity-link" >AbstractMultichoiceFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractMultichoiceListFieldComponent.html" data-type="entity-link" >AbstractMultichoiceListFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractMultichoiceSelectFieldComponent.html" data-type="entity-link" >AbstractMultichoiceSelectFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractNavigationDrawerComponent.html" data-type="entity-link" >AbstractNavigationDrawerComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractNavigationRailComponent.html" data-type="entity-link" >AbstractNavigationRailComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractNavigationResizableDrawerComponent.html" data-type="entity-link" >AbstractNavigationResizableDrawerComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractNavigationTreeComponent.html" data-type="entity-link" >AbstractNavigationTreeComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractNewCaseComponent.html" data-type="entity-link" >AbstractNewCaseComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractNumberErrorsComponent.html" data-type="entity-link" >AbstractNumberErrorsComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractNumberFieldComponent.html" data-type="entity-link" >AbstractNumberFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractOptionSelectorComponent.html" data-type="entity-link" >AbstractOptionSelectorComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractPanelComponent.html" data-type="entity-link" >AbstractPanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractPasswordTextFieldComponent.html" data-type="entity-link" >AbstractPasswordTextFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractProfileComponent.html" data-type="entity-link" >AbstractProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractQuickPanelComponent.html" data-type="entity-link" >AbstractQuickPanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractRegistrationComponent.html" data-type="entity-link" >AbstractRegistrationComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractRegistrationFormComponent.html" data-type="entity-link" >AbstractRegistrationFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractRemoveNodeComponent.html" data-type="entity-link" >AbstractRemoveNodeComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractResourceProvider.html" data-type="entity-link" >AbstractResourceProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractResourceService.html" data-type="entity-link" >AbstractResourceService</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractRichTextareaFieldComponent.html" data-type="entity-link" >AbstractRichTextareaFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractRoleAssignment.html" data-type="entity-link" >AbstractRoleAssignment</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractSaveFilterComponent.html" data-type="entity-link" >AbstractSaveFilterComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractSearchClauseComponent.html" data-type="entity-link" >AbstractSearchClauseComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractSearchComponent.html" data-type="entity-link" >AbstractSearchComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractSearchConfigurationInputComponent.html" data-type="entity-link" >AbstractSearchConfigurationInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractSearchModeComponent.html" data-type="entity-link" >AbstractSearchModeComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractSearchOperandInputComponent.html" data-type="entity-link" >AbstractSearchOperandInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractSearchPredicateComponent.html" data-type="entity-link" >AbstractSearchPredicateComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractSideMenuContainerComponent.html" data-type="entity-link" >AbstractSideMenuContainerComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractSimpleTextFieldComponent.html" data-type="entity-link" >AbstractSimpleTextFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractSortModeComponent.html" data-type="entity-link" >AbstractSortModeComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractTabViewComponent.html" data-type="entity-link" >AbstractTabViewComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractTaskContentComponent.html" data-type="entity-link" >AbstractTaskContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractTaskListComponent.html" data-type="entity-link" >AbstractTaskListComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractTaskPanelComponent.html" data-type="entity-link" >AbstractTaskPanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractTaskView.html" data-type="entity-link" >AbstractTaskView</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractTextareaFieldComponent.html" data-type="entity-link" >AbstractTextareaFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractTextErrorsComponent.html" data-type="entity-link" >AbstractTextErrorsComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractTextFieldComponent.html" data-type="entity-link" >AbstractTextFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractTimeInstanceField.html" data-type="entity-link" >AbstractTimeInstanceField</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractTimeInstanceFieldComponent.html" data-type="entity-link" >AbstractTimeInstanceFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractToolbarComponent.html" data-type="entity-link" >AbstractToolbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractTreeComponent.html" data-type="entity-link" >AbstractTreeComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractTreeTaskContentComponent.html" data-type="entity-link" >AbstractTreeTaskContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractUserAssignComponent.html" data-type="entity-link" >AbstractUserAssignComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractUserAssignItemComponent.html" data-type="entity-link" >AbstractUserAssignItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractUserAssignListComponent.html" data-type="entity-link" >AbstractUserAssignListComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractUserCardComponent.html" data-type="entity-link" >AbstractUserCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractUserFieldComponent.html" data-type="entity-link" >AbstractUserFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractUserInviteComponent.html" data-type="entity-link" >AbstractUserInviteComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractWorkflowPanelComponent.html" data-type="entity-link" >AbstractWorkflowPanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractWorkflowViewComponent.html" data-type="entity-link" >AbstractWorkflowViewComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AfterAction.html" data-type="entity-link" >AfterAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthenticationMethodService.html" data-type="entity-link" >AuthenticationMethodService</a>
                            </li>
                            <li class="link">
                                <a href="classes/AutocompleteCategory.html" data-type="entity-link" >AutocompleteCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/BooleanField.html" data-type="entity-link" >BooleanField</a>
                            </li>
                            <li class="link">
                                <a href="classes/ButtonField.html" data-type="entity-link" >ButtonField</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseAuthor.html" data-type="entity-link" >CaseAuthor</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseCreationDate.html" data-type="entity-link" >CaseCreationDate</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseCreationDateTime.html" data-type="entity-link" >CaseCreationDateTime</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseDataset.html" data-type="entity-link" >CaseDataset</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseNetAttributeAutocompleteCategory.html" data-type="entity-link" >CaseNetAttributeAutocompleteCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseProcess.html" data-type="entity-link" >CaseProcess</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseRole.html" data-type="entity-link" >CaseRole</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseSimpleDataset.html" data-type="entity-link" >CaseSimpleDataset</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseStringId.html" data-type="entity-link" >CaseStringId</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseTask.html" data-type="entity-link" >CaseTask</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseTitle.html" data-type="entity-link" >CaseTitle</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseTreeNode.html" data-type="entity-link" >CaseTreeNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseVisualId.html" data-type="entity-link" >CaseVisualId</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClausePredicate.html" data-type="entity-link" >ClausePredicate</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfigurationInput.html" data-type="entity-link" >ConfigurationInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfigurationService.html" data-type="entity-link" >ConfigurationService</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConsoleLogPublisher.html" data-type="entity-link" >ConsoleLogPublisher</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardMultiData.html" data-type="entity-link" >DashboardMultiData</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardSingleData.html" data-type="entity-link" >DashboardSingleData</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataField.html" data-type="entity-link" >DataField</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatafieldMapKey.html" data-type="entity-link" >DatafieldMapKey</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateField.html" data-type="entity-link" >DateField</a>
                            </li>
                            <li class="link">
                                <a href="classes/DateTimeField.html" data-type="entity-link" >DateTimeField</a>
                            </li>
                            <li class="link">
                                <a href="classes/DynamicEnumerationField.html" data-type="entity-link" >DynamicEnumerationField</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditableClausePredicate.html" data-type="entity-link" >EditableClausePredicate</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditableClausePredicateWithGenerators.html" data-type="entity-link" >EditableClausePredicateWithGenerators</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditableElementaryPredicate.html" data-type="entity-link" >EditableElementaryPredicate</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditablePredicate.html" data-type="entity-link" >EditablePredicate</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditablePredicateWithGenerator.html" data-type="entity-link" >EditablePredicateWithGenerator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ElementaryPredicate.html" data-type="entity-link" >ElementaryPredicate</a>
                            </li>
                            <li class="link">
                                <a href="classes/EnumerationField.html" data-type="entity-link" >EnumerationField</a>
                            </li>
                            <li class="link">
                                <a href="classes/Equals.html" data-type="entity-link" >Equals</a>
                            </li>
                            <li class="link">
                                <a href="classes/EqualsDate.html" data-type="entity-link" >EqualsDate</a>
                            </li>
                            <li class="link">
                                <a href="classes/EqualsDateTime.html" data-type="entity-link" >EqualsDateTime</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileField.html" data-type="entity-link" >FileField</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileListField.html" data-type="entity-link" >FileListField</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileUploadModel.html" data-type="entity-link" >FileUploadModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Filter.html" data-type="entity-link" >Filter</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilteredArray.html" data-type="entity-link" >FilteredArray</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterField.html" data-type="entity-link" >FilterField</a>
                            </li>
                            <li class="link">
                                <a href="classes/GridFiller.html" data-type="entity-link" >GridFiller</a>
                            </li>
                            <li class="link">
                                <a href="classes/GridLayoutHelper.html" data-type="entity-link" >GridLayoutHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/GroupNavigationComponentResolverService.html" data-type="entity-link" >GroupNavigationComponentResolverService</a>
                            </li>
                            <li class="link">
                                <a href="classes/HeaderColumn.html" data-type="entity-link" >HeaderColumn</a>
                            </li>
                            <li class="link">
                                <a href="classes/HeaderState.html" data-type="entity-link" >HeaderState</a>
                            </li>
                            <li class="link">
                                <a href="classes/I18nField.html" data-type="entity-link" >I18nField</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImportToAdd.html" data-type="entity-link" >ImportToAdd</a>
                            </li>
                            <li class="link">
                                <a href="classes/IncrementingCounter.html" data-type="entity-link" >IncrementingCounter</a>
                            </li>
                            <li class="link">
                                <a href="classes/InRange.html" data-type="entity-link" >InRange</a>
                            </li>
                            <li class="link">
                                <a href="classes/InRangeDate.html" data-type="entity-link" >InRangeDate</a>
                            </li>
                            <li class="link">
                                <a href="classes/InRangeDateTime.html" data-type="entity-link" >InRangeDateTime</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsNull.html" data-type="entity-link" >IsNull</a>
                            </li>
                            <li class="link">
                                <a href="classes/LessThan.html" data-type="entity-link" >LessThan</a>
                            </li>
                            <li class="link">
                                <a href="classes/LessThanDate.html" data-type="entity-link" >LessThanDate</a>
                            </li>
                            <li class="link">
                                <a href="classes/LessThanDateTime.html" data-type="entity-link" >LessThanDateTime</a>
                            </li>
                            <li class="link">
                                <a href="classes/LessThanEqual.html" data-type="entity-link" >LessThanEqual</a>
                            </li>
                            <li class="link">
                                <a href="classes/LessThanEqualDate.html" data-type="entity-link" >LessThanEqualDate</a>
                            </li>
                            <li class="link">
                                <a href="classes/LessThanEqualDateTime.html" data-type="entity-link" >LessThanEqualDateTime</a>
                            </li>
                            <li class="link">
                                <a href="classes/Like.html" data-type="entity-link" >Like</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadingEmitter.html" data-type="entity-link" >LoadingEmitter</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadingWithFilterEmitter.html" data-type="entity-link" >LoadingWithFilterEmitter</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocalStorageLogPublisher.html" data-type="entity-link" >LocalStorageLogPublisher</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogEntry.html" data-type="entity-link" >LogEntry</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogPublisher.html" data-type="entity-link" >LogPublisher</a>
                            </li>
                            <li class="link">
                                <a href="classes/MergedFilter.html" data-type="entity-link" >MergedFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/MockAuthenticationMethodService.html" data-type="entity-link" >MockAuthenticationMethodService</a>
                            </li>
                            <li class="link">
                                <a href="classes/MockAuthenticationService.html" data-type="entity-link" >MockAuthenticationService</a>
                            </li>
                            <li class="link">
                                <a href="classes/MockEndpoint.html" data-type="entity-link" >MockEndpoint</a>
                            </li>
                            <li class="link">
                                <a href="classes/MockSignUpService.html" data-type="entity-link" >MockSignUpService</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoreThan.html" data-type="entity-link" >MoreThan</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoreThanDate.html" data-type="entity-link" >MoreThanDate</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoreThanDateTime.html" data-type="entity-link" >MoreThanDateTime</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoreThanEqual.html" data-type="entity-link" >MoreThanEqual</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoreThanEqualDate.html" data-type="entity-link" >MoreThanEqualDate</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoreThanEqualDateTime.html" data-type="entity-link" >MoreThanEqualDateTime</a>
                            </li>
                            <li class="link">
                                <a href="classes/MultichoiceField.html" data-type="entity-link" >MultichoiceField</a>
                            </li>
                            <li class="link">
                                <a href="classes/NetAttributeAutocompleteCategory.html" data-type="entity-link" >NetAttributeAutocompleteCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/NoConfigurationAutocompleteCategory.html" data-type="entity-link" >NoConfigurationAutocompleteCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/NoConfigurationCategory.html" data-type="entity-link" >NoConfigurationCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/NoConfigurationUserAutocompleteCategory.html" data-type="entity-link" >NoConfigurationUserAutocompleteCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotEquals.html" data-type="entity-link" >NotEquals</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotEqualsDate.html" data-type="entity-link" >NotEqualsDate</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotEqualsDateTime.html" data-type="entity-link" >NotEqualsDateTime</a>
                            </li>
                            <li class="link">
                                <a href="classes/NullStorage.html" data-type="entity-link" >NullStorage</a>
                            </li>
                            <li class="link">
                                <a href="classes/NullTaskOperations.html" data-type="entity-link" >NullTaskOperations</a>
                            </li>
                            <li class="link">
                                <a href="classes/NumberField.html" data-type="entity-link" >NumberField</a>
                            </li>
                            <li class="link">
                                <a href="classes/OpenedTab.html" data-type="entity-link" >OpenedTab</a>
                            </li>
                            <li class="link">
                                <a href="classes/Operator.html" data-type="entity-link" >Operator</a>
                            </li>
                            <li class="link">
                                <a href="classes/OperatorTemplatePart.html" data-type="entity-link" >OperatorTemplatePart</a>
                            </li>
                            <li class="link">
                                <a href="classes/PageLoadRequestContext.html" data-type="entity-link" >PageLoadRequestContext</a>
                            </li>
                            <li class="link">
                                <a href="classes/PanelWithHeaderBinding.html" data-type="entity-link" >PanelWithHeaderBinding</a>
                            </li>
                            <li class="link">
                                <a href="classes/PanelWithImmediateData.html" data-type="entity-link" >PanelWithImmediateData</a>
                            </li>
                            <li class="link">
                                <a href="classes/PortalWrapper.html" data-type="entity-link" >PortalWrapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/Predicate.html" data-type="entity-link" >Predicate</a>
                            </li>
                            <li class="link">
                                <a href="classes/PredicateWithGenerator.html" data-type="entity-link" >PredicateWithGenerator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProcessList.html" data-type="entity-link" >ProcessList</a>
                            </li>
                            <li class="link">
                                <a href="classes/Profile.html" data-type="entity-link" >Profile</a>
                            </li>
                            <li class="link">
                                <a href="classes/Query.html" data-type="entity-link" >Query</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueuedEvent.html" data-type="entity-link" >QueuedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResultWithAfterActions.html" data-type="entity-link" >ResultWithAfterActions</a>
                            </li>
                            <li class="link">
                                <a href="classes/SideMenuControl.html" data-type="entity-link" >SideMenuControl</a>
                            </li>
                            <li class="link">
                                <a href="classes/SideMenuRef.html" data-type="entity-link" >SideMenuRef</a>
                            </li>
                            <li class="link">
                                <a href="classes/SimpleFilter.html" data-type="entity-link" >SimpleFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/SnackBar.html" data-type="entity-link" >SnackBar</a>
                            </li>
                            <li class="link">
                                <a href="classes/SortableView.html" data-type="entity-link" >SortableView</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subgrid.html" data-type="entity-link" >Subgrid</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubjectTaskOperations.html" data-type="entity-link" >SubjectTaskOperations</a>
                            </li>
                            <li class="link">
                                <a href="classes/Substring.html" data-type="entity-link" >Substring</a>
                            </li>
                            <li class="link">
                                <a href="classes/TabbedCaseView.html" data-type="entity-link" >TabbedCaseView</a>
                            </li>
                            <li class="link">
                                <a href="classes/TabbedTaskView.html" data-type="entity-link" >TabbedTaskView</a>
                            </li>
                            <li class="link">
                                <a href="classes/TabbedVirtualScrollComponent.html" data-type="entity-link" >TabbedVirtualScrollComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/TabView.html" data-type="entity-link" >TabView</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskAssignee.html" data-type="entity-link" >TaskAssignee</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskHandlingService.html" data-type="entity-link" >TaskHandlingService</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskNetAttributeAutocompleteCategory.html" data-type="entity-link" >TaskNetAttributeAutocompleteCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskProcess.html" data-type="entity-link" >TaskProcess</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskRefField.html" data-type="entity-link" >TaskRefField</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskRole.html" data-type="entity-link" >TaskRole</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskTask.html" data-type="entity-link" >TaskTask</a>
                            </li>
                            <li class="link">
                                <a href="classes/TestConfigurationService.html" data-type="entity-link" >TestConfigurationService</a>
                            </li>
                            <li class="link">
                                <a href="classes/TestLoggingConfigurationService.html" data-type="entity-link" >TestLoggingConfigurationService</a>
                            </li>
                            <li class="link">
                                <a href="classes/TextAreaField.html" data-type="entity-link" >TextAreaField</a>
                            </li>
                            <li class="link">
                                <a href="classes/TextField.html" data-type="entity-link" >TextField</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserAutocomplete.html" data-type="entity-link" >UserAutocomplete</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserField.html" data-type="entity-link" >UserField</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserValue.html" data-type="entity-link" >UserValue</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewClassInfo.html" data-type="entity-link" >ViewClassInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewService.html" data-type="entity-link" >ViewService</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewWithHeaders.html" data-type="entity-link" >ViewWithHeaders</a>
                            </li>
                            <li class="link">
                                <a href="classes/WrappedBoolean.html" data-type="entity-link" >WrappedBoolean</a>
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
                                    <a href="injectables/ActiveGroupService.html" data-type="entity-link" >ActiveGroupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdvancedSearchComponentInitializationService.html" data-type="entity-link" >AdvancedSearchComponentInitializationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AllowedNetsService.html" data-type="entity-link" >AllowedNetsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AllowedNetsServiceFactory.html" data-type="entity-link" >AllowedNetsServiceFactory</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnonymousService.html" data-type="entity-link" >AnonymousService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssignPolicyService.html" data-type="entity-link" >AssignPolicyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssignTaskService.html" data-type="entity-link" >AssignTaskService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link" >AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseAllowedNetsService.html" data-type="entity-link" >BaseAllowedNetsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BasicAuthenticationService.html" data-type="entity-link" >BasicAuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CallChainService.html" data-type="entity-link" >CallChainService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CancelTaskService.html" data-type="entity-link" >CancelTaskService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CaseHeaderService.html" data-type="entity-link" >CaseHeaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CaseListFontColorService.html" data-type="entity-link" >CaseListFontColorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CaseResourceService.html" data-type="entity-link" >CaseResourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CaseTreeService.html" data-type="entity-link" >CaseTreeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CaseViewService.html" data-type="entity-link" >CaseViewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryFactory.html" data-type="entity-link" >CategoryFactory</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryResolverService.html" data-type="entity-link" >CategoryResolverService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChangedFieldsService.html" data-type="entity-link" >ChangedFieldsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomDateAdapter.html" data-type="entity-link" >CustomDateAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardResourceService.html" data-type="entity-link" >DashboardResourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataFocusPolicyService.html" data-type="entity-link" >DataFocusPolicyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DelegateTaskService.html" data-type="entity-link" >DelegateTaskService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DialogService.html" data-type="entity-link" >DialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DynamicNavigationRouteProviderService.html" data-type="entity-link" >DynamicNavigationRouteProviderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventQueueService.html" data-type="entity-link" >EventQueueService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventService.html" data-type="entity-link" >EventService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FieldConverterService.html" data-type="entity-link" >FieldConverterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilterExtractionService.html" data-type="entity-link" >FilterExtractionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilterRepository.html" data-type="entity-link" >FilterRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FinishPolicyService.html" data-type="entity-link" >FinishPolicyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FinishTaskService.html" data-type="entity-link" >FinishTaskService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HeaderSearchService.html" data-type="entity-link" >HeaderSearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link" >LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogPublisherService.html" data-type="entity-link" >LogPublisherService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MockCaseResourceService.html" data-type="entity-link" >MockCaseResourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MockUserPreferenceService.html" data-type="entity-link" >MockUserPreferenceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MockUserResourceService.html" data-type="entity-link" >MockUserResourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MockUserService.html" data-type="entity-link" >MockUserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NextGroupService.html" data-type="entity-link" >NextGroupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NullAuthenticationService.html" data-type="entity-link" >NullAuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OperatorResolverService.html" data-type="entity-link" >OperatorResolverService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OperatorService.html" data-type="entity-link" >OperatorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganizationListService.html" data-type="entity-link" >OrganizationListService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OverflowService.html" data-type="entity-link" >OverflowService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaperViewService.html" data-type="entity-link" >PaperViewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionService.html" data-type="entity-link" >PermissionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PetriNetResourceService.html" data-type="entity-link" >PetriNetResourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProcessService.html" data-type="entity-link" >ProcessService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PublicCaseResourceService.html" data-type="entity-link" >PublicCaseResourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PublicPetriNetResourceService.html" data-type="entity-link" >PublicPetriNetResourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PublicProcessService.html" data-type="entity-link" >PublicProcessService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PublicTaskResourceService.html" data-type="entity-link" >PublicTaskResourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PublicUrlResolverService.html" data-type="entity-link" >PublicUrlResolverService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RedirectService.html" data-type="entity-link" >RedirectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResourceProvider.html" data-type="entity-link" >ResourceProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleAssignmentService.html" data-type="entity-link" >RoleAssignmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoutingBuilderService.html" data-type="entity-link" >RoutingBuilderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchIndexResolverService.html" data-type="entity-link" >SearchIndexResolverService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchService.html" data-type="entity-link" >SearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SelectedCaseService.html" data-type="entity-link" >SelectedCaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionService.html" data-type="entity-link" >SessionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SideMenuService.html" data-type="entity-link" >SideMenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SignUpService.html" data-type="entity-link" >SignUpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SingleTaskContentService.html" data-type="entity-link" >SingleTaskContentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnackBarService.html" data-type="entity-link" >SnackBarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpinnerOverlayService.html" data-type="entity-link" >SpinnerOverlayService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskContentService.html" data-type="entity-link" >TaskContentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskDataService.html" data-type="entity-link" >TaskDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskEventService.html" data-type="entity-link" >TaskEventService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskHeaderService.html" data-type="entity-link" >TaskHeaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskRequestStateService.html" data-type="entity-link" >TaskRequestStateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskResourceService.html" data-type="entity-link" >TaskResourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskViewService.html" data-type="entity-link" >TaskViewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TestViewService.html" data-type="entity-link" >TestViewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TreeCaseViewService.html" data-type="entity-link" >TreeCaseViewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TreeTaskContentService.html" data-type="entity-link" >TreeTaskContentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UnlimitedTaskContentService.html" data-type="entity-link" >UnlimitedTaskContentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserComparatorService.html" data-type="entity-link" >UserComparatorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserFiltersService.html" data-type="entity-link" >UserFiltersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserInviteService.html" data-type="entity-link" >UserInviteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserListService.html" data-type="entity-link" >UserListService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserPreferenceService.html" data-type="entity-link" >UserPreferenceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserResourceService.html" data-type="entity-link" >UserResourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserTransformer.html" data-type="entity-link" >UserTransformer</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ViewIdService.html" data-type="entity-link" >ViewIdService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkflowHeaderService.html" data-type="entity-link" >WorkflowHeaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkflowViewService.html" data-type="entity-link" >WorkflowViewService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AnonymousAuthenticationInterceptor.html" data-type="entity-link" >AnonymousAuthenticationInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/AuthenticationInterceptor.html" data-type="entity-link" >AuthenticationInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/TranslateInterceptor.html" data-type="entity-link" >TranslateInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthenticationGuardService.html" data-type="entity-link" >AuthenticationGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthorityGuardService.html" data-type="entity-link" >AuthorityGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/GroupGuardService.html" data-type="entity-link" >GroupGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/RoleGuardService.html" data-type="entity-link" >RoleGuardService</a>
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
                                <a href="interfaces/Access.html" data-type="entity-link" >Access</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AggregationQuery.html" data-type="entity-link" >AggregationQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AggregationResult.html" data-type="entity-link" >AggregationResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AssignedUserPolicy.html" data-type="entity-link" >AssignedUserPolicy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AssignTaskEventOutcome.html" data-type="entity-link" >AssignTaskEventOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AsyncRenderingConfiguration.html" data-type="entity-link" >AsyncRenderingConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Author.html" data-type="entity-link" >Author</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthorGetRequest.html" data-type="entity-link" >AuthorGetRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Authority.html" data-type="entity-link" >Authority</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthorSearchRequest.html" data-type="entity-link" >AuthorSearchRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthState.html" data-type="entity-link" >AuthState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AutocompleteOptions.html" data-type="entity-link" >AutocompleteOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseFilter.html" data-type="entity-link" >BaseFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BasicLayout.html" data-type="entity-link" >BasicLayout</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Behavior.html" data-type="entity-link" >Behavior</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BucketContent.html" data-type="entity-link" >BucketContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CancelTaskEventOutcome.html" data-type="entity-link" >CancelTaskEventOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CardGridElement.html" data-type="entity-link" >CardGridElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Case.html" data-type="entity-link" >Case</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CaseEventOutcome.html" data-type="entity-link" >CaseEventOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CaseGetRequestBody.html" data-type="entity-link" >CaseGetRequestBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CaseLayout.html" data-type="entity-link" >CaseLayout</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CasePageLoadRequestResult.html" data-type="entity-link" >CasePageLoadRequestResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CaseSearchRequestBody.html" data-type="entity-link" >CaseSearchRequestBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CaseTreePath.html" data-type="entity-link" >CaseTreePath</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CaseUpdateResult.html" data-type="entity-link" >CaseUpdateResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CaseViewParams.html" data-type="entity-link" >CaseViewParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryGeneratorMetadata.html" data-type="entity-link" >CategoryGeneratorMetadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryMetadataConfiguration.html" data-type="entity-link" >CategoryMetadataConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategorySerialisationPair.html" data-type="entity-link" >CategorySerialisationPair</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Change.html" data-type="entity-link" >Change</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChangedFieldContainer.html" data-type="entity-link" >ChangedFieldContainer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChangedFields.html" data-type="entity-link" >ChangedFields</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChangedFieldsMap.html" data-type="entity-link" >ChangedFieldsMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColumnHeaderChange.html" data-type="entity-link" >ColumnHeaderChange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Component.html" data-type="entity-link" >Component</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigFilter.html" data-type="entity-link" >ConfigFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Count.html" data-type="entity-link" >Count</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CountCard.html" data-type="entity-link" >CountCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CountService.html" data-type="entity-link" >CountService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateCaseEventOutcome.html" data-type="entity-link" >CreateCaseEventOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateCaseRequestBody.html" data-type="entity-link" >CreateCaseRequestBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Credentials.html" data-type="entity-link" >Credentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomCard.html" data-type="entity-link" >CustomCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DashboardCard.html" data-type="entity-link" >DashboardCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DashboardEventContent.html" data-type="entity-link" >DashboardEventContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DashboardParams.html" data-type="entity-link" >DashboardParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Datafield.html" data-type="entity-link" >Datafield</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatafieldGridLayoutElement.html" data-type="entity-link" >DatafieldGridLayoutElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataFieldResource.html" data-type="entity-link" >DataFieldResource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataGeneratorConfiguration.html" data-type="entity-link" >DataGeneratorConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataGroup.html" data-type="entity-link" >DataGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataGroupFieldIndex.html" data-type="entity-link" >DataGroupFieldIndex</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataGroupLayout.html" data-type="entity-link" >DataGroupLayout</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DelegateTaskEventOutcome.html" data-type="entity-link" >DelegateTaskEventOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeleteCaseEventOutcome.html" data-type="entity-link" >DeleteCaseEventOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link" >DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogResult.html" data-type="entity-link" >DialogResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DisableButtonFuntions.html" data-type="entity-link" >DisableButtonFuntions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditChangeDescription.html" data-type="entity-link" >EditChangeDescription</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EnumerationFieldValue.html" data-type="entity-link" >EnumerationFieldValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EscapeResult.html" data-type="entity-link" >EscapeResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventOutcome.html" data-type="entity-link" >EventOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventOutcomeMessageResource.html" data-type="entity-link" >EventOutcomeMessageResource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExpansionTree.html" data-type="entity-link" >ExpansionTree</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtendedProcessRole.html" data-type="entity-link" >ExtendedProcessRole</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FeaturedValue.html" data-type="entity-link" >FeaturedValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FieldsGroup.html" data-type="entity-link" >FieldsGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FieldView.html" data-type="entity-link" >FieldView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileFieldValue.html" data-type="entity-link" >FileFieldValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileFieldValue-1.html" data-type="entity-link" >FileFieldValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileList.html" data-type="entity-link" >FileList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileListFieldValue.html" data-type="entity-link" >FileListFieldValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilesState.html" data-type="entity-link" >FilesState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileState.html" data-type="entity-link" >FileState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileUploadDataModel.html" data-type="entity-link" >FileUploadDataModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterMetadata.html" data-type="entity-link" >FilterMetadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterMetadataAllowedNets.html" data-type="entity-link" >FilterMetadataAllowedNets</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Filters.html" data-type="entity-link" >Filters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterSelectorInjectionData.html" data-type="entity-link" >FilterSelectorInjectionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterTextConfiguration.html" data-type="entity-link" >FilterTextConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterTextSegment.html" data-type="entity-link" >FilterTextSegment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FinishTaskEventOutcome.html" data-type="entity-link" >FinishTaskEventOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Form.html" data-type="entity-link" >Form</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormatFilter.html" data-type="entity-link" >FormatFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormSubmitEvent.html" data-type="entity-link" >FormSubmitEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetDataEventOutcome.html" data-type="entity-link" >GetDataEventOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetDataGroupsEventOutcome.html" data-type="entity-link" >GetDataGroupsEventOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetDataLocalisedEventOutcome.html" data-type="entity-link" >GetDataLocalisedEventOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GraphCard.html" data-type="entity-link" >GraphCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GridElement.html" data-type="entity-link" >GridElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GridElementWithItem.html" data-type="entity-link" >GridElementWithItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GridLayout.html" data-type="entity-link" >GridLayout</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Group.html" data-type="entity-link" >Group</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupInterface.html" data-type="entity-link" >GroupInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupNavigationItemLabel.html" data-type="entity-link" >GroupNavigationItemLabel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupsInterface.html" data-type="entity-link" >GroupsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HasForm.html" data-type="entity-link" >HasForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HeaderChange.html" data-type="entity-link" >HeaderChange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HeaderOption.html" data-type="entity-link" >HeaderOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HeaderStateInterface.html" data-type="entity-link" >HeaderStateInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I18nFieldValue.html" data-type="entity-link" >I18nFieldValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Icon.html" data-type="entity-link" >Icon</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IframeCard.html" data-type="entity-link" >IframeCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImportPetriNetEventOutcome.html" data-type="entity-link" >ImportPetriNetEventOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InjectedTabbedCaseViewData.html" data-type="entity-link" >InjectedTabbedCaseViewData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InjectedTabbedTaskViewData.html" data-type="entity-link" >InjectedTabbedTaskViewData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InjectedTabData.html" data-type="entity-link" >InjectedTabData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Layout.html" data-type="entity-link" >Layout</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadFilterInjectionData.html" data-type="entity-link" >LoadFilterInjectionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Locales.html" data-type="entity-link" >Locales</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocalisedBooleanFields.html" data-type="entity-link" >LocalisedBooleanFields</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocalisedDateFields.html" data-type="entity-link" >LocalisedDateFields</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocalisedEnumerationFields.html" data-type="entity-link" >LocalisedEnumerationFields</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocalisedFields.html" data-type="entity-link" >LocalisedFields</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocalisedMultichoiceFields.html" data-type="entity-link" >LocalisedMultichoiceFields</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocalisedNumberFields.html" data-type="entity-link" >LocalisedNumberFields</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocalisedTextFields.html" data-type="entity-link" >LocalisedTextFields</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocalisedUserFields.html" data-type="entity-link" >LocalisedUserFields</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LogEntryConfiguration.html" data-type="entity-link" >LogEntryConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoggerConfiguration.html" data-type="entity-link" >LoggerConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MergedFilterParams.html" data-type="entity-link" >MergedFilterParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageResource.html" data-type="entity-link" >MessageResource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MetaGeneratorConfiguration.html" data-type="entity-link" >MetaGeneratorConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MockTransition.html" data-type="entity-link" >MockTransition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModeChangeDescription.html" data-type="entity-link" >ModeChangeDescription</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MultichoiceFieldValue.html" data-type="entity-link" >MultichoiceFieldValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NameIdPair.html" data-type="entity-link" >NameIdPair</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavigationNode.html" data-type="entity-link" >NavigationNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NetAttributePair.html" data-type="entity-link" >NetAttributePair</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NetCache.html" data-type="entity-link" >NetCache</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NetgrifApplicationEngine.html" data-type="entity-link" >NetgrifApplicationEngine</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NetRole.html" data-type="entity-link" >NetRole</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewCaseConfiguration.html" data-type="entity-link" >NewCaseConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewCaseCreationConfigurationData.html" data-type="entity-link" >NewCaseCreationConfigurationData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewCaseInjectionData.html" data-type="entity-link" >NewCaseInjectionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ObjectParams.html" data-type="entity-link" >ObjectParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Option.html" data-type="entity-link" >Option</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OptionalDependencies.html" data-type="entity-link" >OptionalDependencies</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OptionSelectorInjectionData.html" data-type="entity-link" >OptionSelectorInjectionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OverflowState.html" data-type="entity-link" >OverflowState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Page.html" data-type="entity-link" >Page</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pagination.html" data-type="entity-link" >Pagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Permissions.html" data-type="entity-link" >Permissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PetriNet.html" data-type="entity-link" >PetriNet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PetriNetEventOutcome.html" data-type="entity-link" >PetriNetEventOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PetriNetObjectId.html" data-type="entity-link" >PetriNetObjectId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PetriNetReference.html" data-type="entity-link" >PetriNetReference</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PetriNetReferences.html" data-type="entity-link" >PetriNetReferences</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PetriNetReferenceWithPermissions.html" data-type="entity-link" >PetriNetReferenceWithPermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PetriNetRequestBody.html" data-type="entity-link" >PetriNetRequestBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PetriNetSearchRequest.html" data-type="entity-link" >PetriNetSearchRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PredicateId.html" data-type="entity-link" >PredicateId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PredicateRemovalEvent.html" data-type="entity-link" >PredicateRemovalEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Preferences.html" data-type="entity-link" >Preferences</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PreviewDialogData.html" data-type="entity-link" >PreviewDialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProcessListItem.html" data-type="entity-link" >ProcessListItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProcessRole.html" data-type="entity-link" >ProcessRole</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProcessVersion.html" data-type="entity-link" >ProcessVersion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Properties.html" data-type="entity-link" >Properties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProviderProgress.html" data-type="entity-link" >ProviderProgress</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestedPagination.html" data-type="entity-link" >RequestedPagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Resource.html" data-type="entity-link" >Resource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseData.html" data-type="entity-link" >ResponseData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RoleAccess.html" data-type="entity-link" >RoleAccess</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RoleConstraint.html" data-type="entity-link" >RoleConstraint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RoleObject.html" data-type="entity-link" >RoleObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RolesAndPermissions.html" data-type="entity-link" >RolesAndPermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RolesObject.html" data-type="entity-link" >RolesObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SavedFilterMetadata.html" data-type="entity-link" >SavedFilterMetadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SaveFilterInjectionData.html" data-type="entity-link" >SaveFilterInjectionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchAutocompleteOption.html" data-type="entity-link" >SearchAutocompleteOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchChangeDescription.html" data-type="entity-link" >SearchChangeDescription</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchComponentConfiguration.html" data-type="entity-link" >SearchComponentConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Services.html" data-type="entity-link" >Services</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SetAuthAndResourcesAddress.html" data-type="entity-link" >SetAuthAndResourcesAddress</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SetDataEventOutcome.html" data-type="entity-link" >SetDataEventOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SideMenuEvent.html" data-type="entity-link" >SideMenuEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SideMenuInjectionData.html" data-type="entity-link" >SideMenuInjectionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SnackBarInjectionData.html" data-type="entity-link" >SnackBarInjectionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SortChangeDescription.html" data-type="entity-link" >SortChangeDescription</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SplitDataGroup.html" data-type="entity-link" >SplitDataGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TabContent.html" data-type="entity-link" >TabContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TabLabel.html" data-type="entity-link" >TabLabel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TabViewInterface.html" data-type="entity-link" >TabViewInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskEventNotification.html" data-type="entity-link" >TaskEventNotification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskEventOutcome.html" data-type="entity-link" >TaskEventOutcome</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskFields.html" data-type="entity-link" >TaskFields</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskLayout.html" data-type="entity-link" >TaskLayout</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskLayout-1.html" data-type="entity-link" >TaskLayout</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskOperations.html" data-type="entity-link" >TaskOperations</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskPageLoadRequestResult.html" data-type="entity-link" >TaskPageLoadRequestResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskPanelData.html" data-type="entity-link" >TaskPanelData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskSearchCaseQuery.html" data-type="entity-link" >TaskSearchCaseQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskSearchRequestBody.html" data-type="entity-link" >TaskSearchRequestBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskSetDataRequestBody.html" data-type="entity-link" >TaskSetDataRequestBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskSetDataRequestContext.html" data-type="entity-link" >TaskSetDataRequestContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskSetDataRequestFields.html" data-type="entity-link" >TaskSetDataRequestFields</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskViewConfiguration.html" data-type="entity-link" >TaskViewConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskViewParams.html" data-type="entity-link" >TaskViewParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Theme.html" data-type="entity-link" >Theme</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Transaction.html" data-type="entity-link" >Transaction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Transformer.html" data-type="entity-link" >Transformer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Transition.html" data-type="entity-link" >Transition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TypeLocalisadField.html" data-type="entity-link" >TypeLocalisadField</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInvitationRequest.html" data-type="entity-link" >UserInvitationRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserListInjectedData.html" data-type="entity-link" >UserListInjectedData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserListItem.html" data-type="entity-link" >UserListItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPermissions.html" data-type="entity-link" >UserPermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRefs.html" data-type="entity-link" >UserRefs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRegistrationRequest.html" data-type="entity-link" >UserRegistrationRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserResource.html" data-type="entity-link" >UserResource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserResourceSmall.html" data-type="entity-link" >UserResourceSmall</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Validation.html" data-type="entity-link" >Validation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidationErrors.html" data-type="entity-link" >ValidationErrors</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/View.html" data-type="entity-link" >View</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewEntry.html" data-type="entity-link" >ViewEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Views.html" data-type="entity-link" >Views</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkflowPanelContent.html" data-type="entity-link" >WorkflowPanelContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkflowPanelDefinition.html" data-type="entity-link" >WorkflowPanelDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkflowsPanelContent.html" data-type="entity-link" >WorkflowsPanelContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WrapResult.html" data-type="entity-link" >WrapResult</a>
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
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
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