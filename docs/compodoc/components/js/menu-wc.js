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
                        <img alt="" class="img-responsive" data-type="custom-logo" data-src="images/docs-title-logo.png">
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
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminComponentModule.html" data-type="entity-link" >AdminComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdminComponentModule-ac7930578ccec475fab2a48be3747eb073c7fab74f7862bb7cb96aa91871e03906ed16938ceb9457b6b5f63d5fadd97318ab642611309255efab18e345aa868f"' : 'data-bs-target="#xs-components-links-module-AdminComponentModule-ac7930578ccec475fab2a48be3747eb073c7fab74f7862bb7cb96aa91871e03906ed16938ceb9457b6b5f63d5fadd97318ab642611309255efab18e345aa868f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminComponentModule-ac7930578ccec475fab2a48be3747eb073c7fab74f7862bb7cb96aa91871e03906ed16938ceb9457b6b5f63d5fadd97318ab642611309255efab18e345aa868f"' :
                                            'id="xs-components-links-module-AdminComponentModule-ac7930578ccec475fab2a48be3747eb073c7fab74f7862bb7cb96aa91871e03906ed16938ceb9457b6b5f63d5fadd97318ab642611309255efab18e345aa868f"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdvancedSearchComponentModule-b2600f0f4e43b769d89f3db9cb49524174599b7b91d87fbfe8bb7eae97acaefa4540cb5f7ee1aa35c3a14690b9be0016bbc15e0d941bc73f6f719119609a1d52"' : 'data-bs-target="#xs-components-links-module-AdvancedSearchComponentModule-b2600f0f4e43b769d89f3db9cb49524174599b7b91d87fbfe8bb7eae97acaefa4540cb5f7ee1aa35c3a14690b9be0016bbc15e0d941bc73f6f719119609a1d52"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdvancedSearchComponentModule-b2600f0f4e43b769d89f3db9cb49524174599b7b91d87fbfe8bb7eae97acaefa4540cb5f7ee1aa35c3a14690b9be0016bbc15e0d941bc73f6f719119609a1d52"' :
                                            'id="xs-components-links-module-AdvancedSearchComponentModule-b2600f0f4e43b769d89f3db9cb49524174599b7b91d87fbfe8bb7eae97acaefa4540cb5f7ee1aa35c3a14690b9be0016bbc15e0d941bc73f6f719119609a1d52"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AuthenticationComponentModule-97607035c48e4bcb4c7f8e39a9a75996d911c39bd718cae593f4c7c7e50d69dcf8aa40149490e9bd3977d4a81ecbd4c27a38b743e151c6bdaba694934f8f26f5"' : 'data-bs-target="#xs-components-links-module-AuthenticationComponentModule-97607035c48e4bcb4c7f8e39a9a75996d911c39bd718cae593f4c7c7e50d69dcf8aa40149490e9bd3977d4a81ecbd4c27a38b743e151c6bdaba694934f8f26f5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthenticationComponentModule-97607035c48e4bcb4c7f8e39a9a75996d911c39bd718cae593f4c7c7e50d69dcf8aa40149490e9bd3977d4a81ecbd4c27a38b743e151c6bdaba694934f8f26f5"' :
                                            'id="xs-components-links-module-AuthenticationComponentModule-97607035c48e4bcb4c7f8e39a9a75996d911c39bd718cae593f4c7c7e50d69dcf8aa40149490e9bd3977d4a81ecbd4c27a38b743e151c6bdaba694934f8f26f5"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CaseViewComponentModule-31f076c6ba94ae26feb3a7d9c94c6e912621c5bfae5dde15f19babd9c7437dfafd94e6a92a0e8fb841cd02c617b2ae1727c966671ba940bd31c5991976a22cb9"' : 'data-bs-target="#xs-components-links-module-CaseViewComponentModule-31f076c6ba94ae26feb3a7d9c94c6e912621c5bfae5dde15f19babd9c7437dfafd94e6a92a0e8fb841cd02c617b2ae1727c966671ba940bd31c5991976a22cb9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CaseViewComponentModule-31f076c6ba94ae26feb3a7d9c94c6e912621c5bfae5dde15f19babd9c7437dfafd94e6a92a0e8fb841cd02c617b2ae1727c966671ba940bd31c5991976a22cb9"' :
                                            'id="xs-components-links-module-CaseViewComponentModule-31f076c6ba94ae26feb3a7d9c94c6e912621c5bfae5dde15f19babd9c7437dfafd94e6a92a0e8fb841cd02c617b2ae1727c966671ba940bd31c5991976a22cb9"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ChangePasswordFormComponentModule-d549e9c541e63dd6fa5cfca1cc4ca3c05ac0fc773c27eb098009e86bf22ac144af1ba3471008fceb25036d14baa5639593e1a76f956a2eead00aed85343d0d45"' : 'data-bs-target="#xs-components-links-module-ChangePasswordFormComponentModule-d549e9c541e63dd6fa5cfca1cc4ca3c05ac0fc773c27eb098009e86bf22ac144af1ba3471008fceb25036d14baa5639593e1a76f956a2eead00aed85343d0d45"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChangePasswordFormComponentModule-d549e9c541e63dd6fa5cfca1cc4ca3c05ac0fc773c27eb098009e86bf22ac144af1ba3471008fceb25036d14baa5639593e1a76f956a2eead00aed85343d0d45"' :
                                            'id="xs-components-links-module-ChangePasswordFormComponentModule-d549e9c541e63dd6fa5cfca1cc4ca3c05ac0fc773c27eb098009e86bf22ac144af1ba3471008fceb25036d14baa5639593e1a76f956a2eead00aed85343d0d45"' }>
                                            <li class="link">
                                                <a href="components/ChangePasswordFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChangePasswordFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardComponentModule.html" data-type="entity-link" >DashboardComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DashboardComponentModule-18ad28cae153a93e12dd5fc7a06c305e91b005c0dbf6f5ab70206e1585b0e973282459a48cf4e84d33574ca044ac5783b91b71634f0773cd7feab65c9dc617d7"' : 'data-bs-target="#xs-components-links-module-DashboardComponentModule-18ad28cae153a93e12dd5fc7a06c305e91b005c0dbf6f5ab70206e1585b0e973282459a48cf4e84d33574ca044ac5783b91b71634f0773cd7feab65c9dc617d7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardComponentModule-18ad28cae153a93e12dd5fc7a06c305e91b005c0dbf6f5ab70206e1585b0e973282459a48cf4e84d33574ca044ac5783b91b71634f0773cd7feab65c9dc617d7"' :
                                            'id="xs-components-links-module-DashboardComponentModule-18ad28cae153a93e12dd5fc7a06c305e91b005c0dbf6f5ab70206e1585b0e973282459a48cf4e84d33574ca044ac5783b91b71634f0773cd7feab65c9dc617d7"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DataFieldsComponentModule-22749368396ce89e46002fcc64ba7ba04f84a48ccc7b5937b09657b21f6fb4d0102f6eface8fd56bd866eed646dd11837a3b879a425009d2771604623bd316db"' : 'data-bs-target="#xs-components-links-module-DataFieldsComponentModule-22749368396ce89e46002fcc64ba7ba04f84a48ccc7b5937b09657b21f6fb4d0102f6eface8fd56bd866eed646dd11837a3b879a425009d2771604623bd316db"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DataFieldsComponentModule-22749368396ce89e46002fcc64ba7ba04f84a48ccc7b5937b09657b21f6fb4d0102f6eface8fd56bd866eed646dd11837a3b879a425009d2771604623bd316db"' :
                                            'id="xs-components-links-module-DataFieldsComponentModule-22749368396ce89e46002fcc64ba7ba04f84a48ccc7b5937b09657b21f6fb4d0102f6eface8fd56bd866eed646dd11837a3b879a425009d2771604623bd316db"' }>
                                            <li class="link">
                                                <a href="components/BooleanDefaultFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BooleanDefaultFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BooleanFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">BooleanFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ButtonDefaultFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonDefaultFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ButtonFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">ButtonFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CaseRefDefaultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaseRefDefaultComponent</a>
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
                                                <a href="components/DateDefaultFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DateDefaultFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DateFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">DateFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DateTimeDefaultFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DateTimeDefaultFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DateTimeFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">DateTimeFieldComponent</a>
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
                                                <a href="components/EnumerationCaserefFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EnumerationCaserefFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EnumerationFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">EnumerationFieldComponent</a>
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
                                                <a href="components/FileDefaultFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileDefaultFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">FileFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileListDefaultFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileListDefaultFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileListFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">FileListFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FilterDefaultFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterDefaultFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FilterFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">FilterFieldComponent</a>
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
                                                <a href="components/I18nFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">I18nFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/I18nTextFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >I18nTextFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultichoiceAutocompleteFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultichoiceAutocompleteFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultichoiceCaserefFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultichoiceCaserefFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultichoiceFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">MultichoiceFieldComponent</a>
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
                                                <a href="components/NumberDecimalFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NumberDecimalFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NumberDefaultFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NumberDefaultFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NumberFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">NumberFieldComponent</a>
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
                                                <a href="components/SignaturePadFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignaturePadFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SimpleTextFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SimpleTextFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StringCollectionDefaultFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StringCollectionDefaultFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskRefDashboardFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskRefDashboardFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskRefDashboardTileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskRefDashboardTileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskRefFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">TaskRefFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskRefListFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskRefListFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">TextFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextareaFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextareaFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDefaultFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDefaultFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">UserFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserListDefaultFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserListDefaultFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserListFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">UserListFieldComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DialogComponentsModule.html" data-type="entity-link" >DialogComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DialogComponentsModule-d37b339a8210e225aff9b03e837253fbc7d89aa6ef6e564dc33c0cf2e201c66a3eb59c0050077639f87fda5daf58af969ec39ba8a451082fb353e5ad4f42dcd9"' : 'data-bs-target="#xs-components-links-module-DialogComponentsModule-d37b339a8210e225aff9b03e837253fbc7d89aa6ef6e564dc33c0cf2e201c66a3eb59c0050077639f87fda5daf58af969ec39ba8a451082fb353e5ad4f42dcd9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DialogComponentsModule-d37b339a8210e225aff9b03e837253fbc7d89aa6ef6e564dc33c0cf2e201c66a3eb59c0050077639f87fda5daf58af969ec39ba8a451082fb353e5ad4f42dcd9"' :
                                            'id="xs-components-links-module-DialogComponentsModule-d37b339a8210e225aff9b03e837253fbc7d89aa6ef6e564dc33c0cf2e201c66a3eb59c0050077639f87fda5daf58af969ec39ba8a451082fb353e5ad4f42dcd9"' }>
                                            <li class="link">
                                                <a href="components/AdminImpersonateDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminImpersonateDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FilterSelectorDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterSelectorDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImportNetDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImportNetDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadFilterDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadFilterDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultiUserAssignDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultiUserAssignDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewCaseDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewCaseDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SaveFilterDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaveFilterDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskViewDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskViewDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserAssignDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserAssignDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserImpersonateDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserImpersonateDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailSubmissionFormComponentModule.html" data-type="entity-link" >EmailSubmissionFormComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-EmailSubmissionFormComponentModule-64a071cd610ca7db6f1830b655187b59e945bbb2386497a1c21d2825d00a42bf849541c279c3ffb637e610c0a6d307f9a34e46b02687ee9faa0ffd83f8b15aa2"' : 'data-bs-target="#xs-components-links-module-EmailSubmissionFormComponentModule-64a071cd610ca7db6f1830b655187b59e945bbb2386497a1c21d2825d00a42bf849541c279c3ffb637e610c0a6d307f9a34e46b02687ee9faa0ffd83f8b15aa2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EmailSubmissionFormComponentModule-64a071cd610ca7db6f1830b655187b59e945bbb2386497a1c21d2825d00a42bf849541c279c3ffb637e610c0a6d307f9a34e46b02687ee9faa0ffd83f8b15aa2"' :
                                            'id="xs-components-links-module-EmailSubmissionFormComponentModule-64a071cd610ca7db6f1830b655187b59e945bbb2386497a1c21d2825d00a42bf849541c279c3ffb637e610c0a6d307f9a34e46b02687ee9faa0ffd83f8b15aa2"' }>
                                            <li class="link">
                                                <a href="components/EmailSubmissionFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailSubmissionFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilterFieldContentModule.html" data-type="entity-link" >FilterFieldContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FilterFieldContentModule-ac601ac35d48bf45f685301a72fe6cfb5f550e3ee680bea23283026fc0e6afa4f6186273e65edf7f51096204bf6b505ecda6569ddc382bc9b7f5e6d347e54f42"' : 'data-bs-target="#xs-components-links-module-FilterFieldContentModule-ac601ac35d48bf45f685301a72fe6cfb5f550e3ee680bea23283026fc0e6afa4f6186273e65edf7f51096204bf6b505ecda6569ddc382bc9b7f5e6d347e54f42"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FilterFieldContentModule-ac601ac35d48bf45f685301a72fe6cfb5f550e3ee680bea23283026fc0e6afa4f6186273e65edf7f51096204bf6b505ecda6569ddc382bc9b7f5e6d347e54f42"' :
                                            'id="xs-components-links-module-FilterFieldContentModule-ac601ac35d48bf45f685301a72fe6cfb5f550e3ee680bea23283026fc0e6afa4f6186273e65edf7f51096204bf6b505ecda6569ddc382bc9b7f5e6d347e54f42"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ForgottenPasswordFormComponentModule-b8b5df3abb1cbf0c287b2fd5edc2dbbbe1728a599ea61f48a25d9fb472e76483c57815e2dfe2a4b10dec611b1990f4316b413ab6992d8f5711b81a623752f3ad"' : 'data-bs-target="#xs-components-links-module-ForgottenPasswordFormComponentModule-b8b5df3abb1cbf0c287b2fd5edc2dbbbe1728a599ea61f48a25d9fb472e76483c57815e2dfe2a4b10dec611b1990f4316b413ab6992d8f5711b81a623752f3ad"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ForgottenPasswordFormComponentModule-b8b5df3abb1cbf0c287b2fd5edc2dbbbe1728a599ea61f48a25d9fb472e76483c57815e2dfe2a4b10dec611b1990f4316b413ab6992d8f5711b81a623752f3ad"' :
                                            'id="xs-components-links-module-ForgottenPasswordFormComponentModule-b8b5df3abb1cbf0c287b2fd5edc2dbbbe1728a599ea61f48a25d9fb472e76483c57815e2dfe2a4b10dec611b1990f4316b413ab6992d8f5711b81a623752f3ad"' }>
                                            <li class="link">
                                                <a href="components/ForgottenPasswordFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgottenPasswordFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HeaderComponentModule.html" data-type="entity-link" >HeaderComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HeaderComponentModule-6d2ecfd20d473b68325108a9956fde86a401114b51f4f95507e2bbb037359ce2f963cf620739d68caa00329128b9e17e13c7600d6098c14ed60c316d409539a9"' : 'data-bs-target="#xs-components-links-module-HeaderComponentModule-6d2ecfd20d473b68325108a9956fde86a401114b51f4f95507e2bbb037359ce2f963cf620739d68caa00329128b9e17e13c7600d6098c14ed60c316d409539a9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeaderComponentModule-6d2ecfd20d473b68325108a9956fde86a401114b51f4f95507e2bbb037359ce2f963cf620739d68caa00329128b9e17e13c7600d6098c14ed60c316d409539a9"' :
                                            'id="xs-components-links-module-HeaderComponentModule-6d2ecfd20d473b68325108a9956fde86a401114b51f4f95507e2bbb037359ce2f963cf620739d68caa00329128b9e17e13c7600d6098c14ed60c316d409539a9"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LegalNoticeModule-8874189978cdb8ce60cd071b10783058541c54d900f3e01317b3331d4f4c26d04c50d3463966242613d1a63e3eb6a5838b3ef8022d00b92a3c6ab44f332e3e97"' : 'data-bs-target="#xs-components-links-module-LegalNoticeModule-8874189978cdb8ce60cd071b10783058541c54d900f3e01317b3331d4f4c26d04c50d3463966242613d1a63e3eb6a5838b3ef8022d00b92a3c6ab44f332e3e97"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LegalNoticeModule-8874189978cdb8ce60cd071b10783058541c54d900f3e01317b3331d4f4c26d04c50d3463966242613d1a63e3eb6a5838b3ef8022d00b92a3c6ab44f332e3e97"' :
                                            'id="xs-components-links-module-LegalNoticeModule-8874189978cdb8ce60cd071b10783058541c54d900f3e01317b3331d4f4c26d04c50d3463966242613d1a63e3eb6a5838b3ef8022d00b92a3c6ab44f332e3e97"' }>
                                            <li class="link">
                                                <a href="components/LegalNoticeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LegalNoticeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginFormComponentModule.html" data-type="entity-link" >LoginFormComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginFormComponentModule-5dbddd8d46db2e471eb5fbe0213e2f0d2c056f03c2cc569275e161ee50da1f028dee041be98a2244d5a5b2c334f5a9ee96f5f71271674ae3ad54c0080dad4e39"' : 'data-bs-target="#xs-components-links-module-LoginFormComponentModule-5dbddd8d46db2e471eb5fbe0213e2f0d2c056f03c2cc569275e161ee50da1f028dee041be98a2244d5a5b2c334f5a9ee96f5f71271674ae3ad54c0080dad4e39"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginFormComponentModule-5dbddd8d46db2e471eb5fbe0213e2f0d2c056f03c2cc569275e161ee50da1f028dee041be98a2244d5a5b2c334f5a9ee96f5f71271674ae3ad54c0080dad4e39"' :
                                            'id="xs-components-links-module-LoginFormComponentModule-5dbddd8d46db2e471eb5fbe0213e2f0d2c056f03c2cc569275e161ee50da1f028dee041be98a2244d5a5b2c334f5a9ee96f5f71271674ae3ad54c0080dad4e39"' }>
                                            <li class="link">
                                                <a href="components/LoginFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NavigationComponentModule.html" data-type="entity-link" >NavigationComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-NavigationComponentModule-621c2a94cbe1d2e9fb943defeadd537f58f0b6517ae984ef31af87c3dd9afe413ad6d59c00edf8d131bf139ae842e130be031905658045a1c7c294f1f19017b6"' : 'data-bs-target="#xs-components-links-module-NavigationComponentModule-621c2a94cbe1d2e9fb943defeadd537f58f0b6517ae984ef31af87c3dd9afe413ad6d59c00edf8d131bf139ae842e130be031905658045a1c7c294f1f19017b6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavigationComponentModule-621c2a94cbe1d2e9fb943defeadd537f58f0b6517ae984ef31af87c3dd9afe413ad6d59c00edf8d131bf139ae842e130be031905658045a1c7c294f1f19017b6"' :
                                            'id="xs-components-links-module-NavigationComponentModule-621c2a94cbe1d2e9fb943defeadd537f58f0b6517ae984ef31af87c3dd9afe413ad6d59c00edf8d131bf139ae842e130be031905658045a1c7c294f1f19017b6"' }>
                                            <li class="link">
                                                <a href="components/BreadcrumbsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BreadcrumbsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultCaseRefListViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultCaseRefListViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultNoFilterProvidedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultNoFilterProvidedComponent</a>
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
                                                <a href="components/DefaultTaskViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultTaskViewComponent</a>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PanelComponentModule-f7710fb65dcd0eb0fd6394ff9d43efaef770dfb5418dc1334851c4eb46b73fefe258bc9176070602ccf0f75038808399690217ce047e6d3a27e007e05db71de2"' : 'data-bs-target="#xs-components-links-module-PanelComponentModule-f7710fb65dcd0eb0fd6394ff9d43efaef770dfb5418dc1334851c4eb46b73fefe258bc9176070602ccf0f75038808399690217ce047e6d3a27e007e05db71de2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PanelComponentModule-f7710fb65dcd0eb0fd6394ff9d43efaef770dfb5418dc1334851c4eb46b73fefe258bc9176070602ccf0f75038808399690217ce047e6d3a27e007e05db71de2"' :
                                            'id="xs-components-links-module-PanelComponentModule-f7710fb65dcd0eb0fd6394ff9d43efaef770dfb5418dc1334851c4eb46b73fefe258bc9176070602ccf0f75038808399690217ce047e6d3a27e007e05db71de2"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProfileComponentModule-5eede65d2cf1b5d92a96fe9162e43b74839646c8d631e3bfcdc0a418cd00206bd678a1e24aa9bdd94610d386c5c053a744adb00d65ee17fd4c7e9c525337f576"' : 'data-bs-target="#xs-components-links-module-ProfileComponentModule-5eede65d2cf1b5d92a96fe9162e43b74839646c8d631e3bfcdc0a418cd00206bd678a1e24aa9bdd94610d386c5c053a744adb00d65ee17fd4c7e9c525337f576"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileComponentModule-5eede65d2cf1b5d92a96fe9162e43b74839646c8d631e3bfcdc0a418cd00206bd678a1e24aa9bdd94610d386c5c053a744adb00d65ee17fd4c7e9c525337f576"' :
                                            'id="xs-components-links-module-ProfileComponentModule-5eede65d2cf1b5d92a96fe9162e43b74839646c8d631e3bfcdc0a418cd00206bd678a1e24aa9bdd94610d386c5c053a744adb00d65ee17fd4c7e9c525337f576"' }>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuickPanelComponentModule.html" data-type="entity-link" >QuickPanelComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-QuickPanelComponentModule-e53ebea8aa45947ec91bd05aca2895bd2347ccefe407e58e79ed6331d94ad6ad4163e67cd577bd039355f62d643b722fa9726fc175ea5b83b90fe6f34aed39ad"' : 'data-bs-target="#xs-components-links-module-QuickPanelComponentModule-e53ebea8aa45947ec91bd05aca2895bd2347ccefe407e58e79ed6331d94ad6ad4163e67cd577bd039355f62d643b722fa9726fc175ea5b83b90fe6f34aed39ad"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-QuickPanelComponentModule-e53ebea8aa45947ec91bd05aca2895bd2347ccefe407e58e79ed6331d94ad6ad4163e67cd577bd039355f62d643b722fa9726fc175ea5b83b90fe6f34aed39ad"' :
                                            'id="xs-components-links-module-QuickPanelComponentModule-e53ebea8aa45947ec91bd05aca2895bd2347ccefe407e58e79ed6331d94ad6ad4163e67cd577bd039355f62d643b722fa9726fc175ea5b83b90fe6f34aed39ad"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RedirectComponentModule-8a98e6081089c9ce1d874afba6849cd1d6f7c38f0d591061322326c57fe428af522e9ae0a140f23f457ccc12c98d3d41203e564f9462121a90d58d4ba2e5ce71"' : 'data-bs-target="#xs-components-links-module-RedirectComponentModule-8a98e6081089c9ce1d874afba6849cd1d6f7c38f0d591061322326c57fe428af522e9ae0a140f23f457ccc12c98d3d41203e564f9462121a90d58d4ba2e5ce71"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RedirectComponentModule-8a98e6081089c9ce1d874afba6849cd1d6f7c38f0d591061322326c57fe428af522e9ae0a140f23f457ccc12c98d3d41203e564f9462121a90d58d4ba2e5ce71"' :
                                            'id="xs-components-links-module-RedirectComponentModule-8a98e6081089c9ce1d874afba6849cd1d6f7c38f0d591061322326c57fe428af522e9ae0a140f23f457ccc12c98d3d41203e564f9462121a90d58d4ba2e5ce71"' }>
                                            <li class="link">
                                                <a href="components/RedirectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedirectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegistrationFormComponentModule.html" data-type="entity-link" >RegistrationFormComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegistrationFormComponentModule-fc7da258a5761b20f4ac636f047875bc121cd48fc2d763657dbbd09f86f2193038b508b99c019d5af4537fe80e857f120090d9b535cda0b94a6c72ae46933df8"' : 'data-bs-target="#xs-components-links-module-RegistrationFormComponentModule-fc7da258a5761b20f4ac636f047875bc121cd48fc2d763657dbbd09f86f2193038b508b99c019d5af4537fe80e857f120090d9b535cda0b94a6c72ae46933df8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegistrationFormComponentModule-fc7da258a5761b20f4ac636f047875bc121cd48fc2d763657dbbd09f86f2193038b508b99c019d5af4537fe80e857f120090d9b535cda0b94a6c72ae46933df8"' :
                                            'id="xs-components-links-module-RegistrationFormComponentModule-fc7da258a5761b20f4ac636f047875bc121cd48fc2d763657dbbd09f86f2193038b508b99c019d5af4537fe80e857f120090d9b535cda0b94a6c72ae46933df8"' }>
                                            <li class="link">
                                                <a href="components/RegistrationFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistrationFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchComponentModule.html" data-type="entity-link" >SearchComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SearchComponentModule-287ce8f9cd360e9e6af8232c3e8bd6fb707c7bd2f4e5463513cf4a51fff303f4353a73abc18065b72862fec881f7811fb22f4d60e2f21e09026d249a23a46c53"' : 'data-bs-target="#xs-components-links-module-SearchComponentModule-287ce8f9cd360e9e6af8232c3e8bd6fb707c7bd2f4e5463513cf4a51fff303f4353a73abc18065b72862fec881f7811fb22f4d60e2f21e09026d249a23a46c53"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchComponentModule-287ce8f9cd360e9e6af8232c3e8bd6fb707c7bd2f4e5463513cf4a51fff303f4353a73abc18065b72862fec881f7811fb22f4d60e2f21e09026d249a23a46c53"' :
                                            'id="xs-components-links-module-SearchComponentModule-287ce8f9cd360e9e6af8232c3e8bd6fb707c7bd2f4e5463513cf4a51fff303f4353a73abc18065b72862fec881f7811fb22f4d60e2f21e09026d249a23a46c53"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SideMenuAdminImpersonateComponentModule-565083763dd696a5f0d6cae56d49685b70c027390b90c1af52535e7e038acc6e94e7ddbaf0ba4060b0c73a638bea44c17bf645e3d482ce9ad83ba95a2bad0a3c"' : 'data-bs-target="#xs-components-links-module-SideMenuAdminImpersonateComponentModule-565083763dd696a5f0d6cae56d49685b70c027390b90c1af52535e7e038acc6e94e7ddbaf0ba4060b0c73a638bea44c17bf645e3d482ce9ad83ba95a2bad0a3c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuAdminImpersonateComponentModule-565083763dd696a5f0d6cae56d49685b70c027390b90c1af52535e7e038acc6e94e7ddbaf0ba4060b0c73a638bea44c17bf645e3d482ce9ad83ba95a2bad0a3c"' :
                                            'id="xs-components-links-module-SideMenuAdminImpersonateComponentModule-565083763dd696a5f0d6cae56d49685b70c027390b90c1af52535e7e038acc6e94e7ddbaf0ba4060b0c73a638bea44c17bf645e3d482ce9ad83ba95a2bad0a3c"' }>
                                            <li class="link">
                                                <a href="components/AdminImpersonateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">AdminImpersonateComponent</a>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SideMenuComponentModule-867d651a57ba106e304b4f2e51088dc3153fe4afb6fd408d5c97b07b29f2112f2767bdd8626a1e60f612cd7fc6d0902aceef5e95e2db3885203169f74223412e"' : 'data-bs-target="#xs-components-links-module-SideMenuComponentModule-867d651a57ba106e304b4f2e51088dc3153fe4afb6fd408d5c97b07b29f2112f2767bdd8626a1e60f612cd7fc6d0902aceef5e95e2db3885203169f74223412e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuComponentModule-867d651a57ba106e304b4f2e51088dc3153fe4afb6fd408d5c97b07b29f2112f2767bdd8626a1e60f612cd7fc6d0902aceef5e95e2db3885203169f74223412e"' :
                                            'id="xs-components-links-module-SideMenuComponentModule-867d651a57ba106e304b4f2e51088dc3153fe4afb6fd408d5c97b07b29f2112f2767bdd8626a1e60f612cd7fc6d0902aceef5e95e2db3885203169f74223412e"' }>
                                            <li class="link">
                                                <a href="components/SideMenuContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">SideMenuContainerComponent</a>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SideMenuFilterSelectorComponentModule-628a2c42aa216816a57946ed2a5dcbe4add3dc2fb25e7abfec1f7f2e1d99fe070f1c3d7718fbc46c9edfe8b35b05a802129e55c5fbef7459cc568bd44091b91c"' : 'data-bs-target="#xs-components-links-module-SideMenuFilterSelectorComponentModule-628a2c42aa216816a57946ed2a5dcbe4add3dc2fb25e7abfec1f7f2e1d99fe070f1c3d7718fbc46c9edfe8b35b05a802129e55c5fbef7459cc568bd44091b91c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuFilterSelectorComponentModule-628a2c42aa216816a57946ed2a5dcbe4add3dc2fb25e7abfec1f7f2e1d99fe070f1c3d7718fbc46c9edfe8b35b05a802129e55c5fbef7459cc568bd44091b91c"' :
                                            'id="xs-components-links-module-SideMenuFilterSelectorComponentModule-628a2c42aa216816a57946ed2a5dcbe4add3dc2fb25e7abfec1f7f2e1d99fe070f1c3d7718fbc46c9edfe8b35b05a802129e55c5fbef7459cc568bd44091b91c"' }>
                                            <li class="link">
                                                <a href="components/FilterSelectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">FilterSelectorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuImportNetComponentModule.html" data-type="entity-link" >SideMenuImportNetComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SideMenuImportNetComponentModule-b6cd9a15d564ef8fd16477fa854cf95a57fd9c7f44184d2d7a8893dc505e1bcd997ad55bbdc5a9ce56f01f38ca8d54074f0447b6594e6b33db316bbc23b4c6b7"' : 'data-bs-target="#xs-components-links-module-SideMenuImportNetComponentModule-b6cd9a15d564ef8fd16477fa854cf95a57fd9c7f44184d2d7a8893dc505e1bcd997ad55bbdc5a9ce56f01f38ca8d54074f0447b6594e6b33db316bbc23b4c6b7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuImportNetComponentModule-b6cd9a15d564ef8fd16477fa854cf95a57fd9c7f44184d2d7a8893dc505e1bcd997ad55bbdc5a9ce56f01f38ca8d54074f0447b6594e6b33db316bbc23b4c6b7"' :
                                            'id="xs-components-links-module-SideMenuImportNetComponentModule-b6cd9a15d564ef8fd16477fa854cf95a57fd9c7f44184d2d7a8893dc505e1bcd997ad55bbdc5a9ce56f01f38ca8d54074f0447b6594e6b33db316bbc23b4c6b7"' }>
                                            <li class="link">
                                                <a href="components/ImportNetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">ImportNetComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuLoadFilterComponentModule.html" data-type="entity-link" >SideMenuLoadFilterComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SideMenuLoadFilterComponentModule-2fa6f635b611659beeb2a841374966824c28b232a1d7110379905830bb73d2bc162bc2c0372247be153bddab8ba7f9c1de2d92458d8c019587fb4cb427eab185"' : 'data-bs-target="#xs-components-links-module-SideMenuLoadFilterComponentModule-2fa6f635b611659beeb2a841374966824c28b232a1d7110379905830bb73d2bc162bc2c0372247be153bddab8ba7f9c1de2d92458d8c019587fb4cb427eab185"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuLoadFilterComponentModule-2fa6f635b611659beeb2a841374966824c28b232a1d7110379905830bb73d2bc162bc2c0372247be153bddab8ba7f9c1de2d92458d8c019587fb4cb427eab185"' :
                                            'id="xs-components-links-module-SideMenuLoadFilterComponentModule-2fa6f635b611659beeb2a841374966824c28b232a1d7110379905830bb73d2bc162bc2c0372247be153bddab8ba7f9c1de2d92458d8c019587fb4cb427eab185"' }>
                                            <li class="link">
                                                <a href="components/LoadFilterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">LoadFilterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuMultiUserAssignComponentModule.html" data-type="entity-link" >SideMenuMultiUserAssignComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SideMenuMultiUserAssignComponentModule-bf2933a1d359b9e9e299d9cdcf9729121de664ffbc61a68257d1762497f8c6e994c9110304e750de76926a438ace08e41aee99ec100e344af8a73d102ad9fc82"' : 'data-bs-target="#xs-components-links-module-SideMenuMultiUserAssignComponentModule-bf2933a1d359b9e9e299d9cdcf9729121de664ffbc61a68257d1762497f8c6e994c9110304e750de76926a438ace08e41aee99ec100e344af8a73d102ad9fc82"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuMultiUserAssignComponentModule-bf2933a1d359b9e9e299d9cdcf9729121de664ffbc61a68257d1762497f8c6e994c9110304e750de76926a438ace08e41aee99ec100e344af8a73d102ad9fc82"' :
                                            'id="xs-components-links-module-SideMenuMultiUserAssignComponentModule-bf2933a1d359b9e9e299d9cdcf9729121de664ffbc61a68257d1762497f8c6e994c9110304e750de76926a438ace08e41aee99ec100e344af8a73d102ad9fc82"' }>
                                            <li class="link">
                                                <a href="components/MultiUserAssignComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">MultiUserAssignComponent</a>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SideMenuNewCaseComponentModule-37880e474606ab94439198ea02e57f5bdf08ccfa54996eb8b7ecd307ab7f464741e9d698751e531a704106b38fa7bd3c2d02471b75513ea151bb6501a409e342"' : 'data-bs-target="#xs-components-links-module-SideMenuNewCaseComponentModule-37880e474606ab94439198ea02e57f5bdf08ccfa54996eb8b7ecd307ab7f464741e9d698751e531a704106b38fa7bd3c2d02471b75513ea151bb6501a409e342"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuNewCaseComponentModule-37880e474606ab94439198ea02e57f5bdf08ccfa54996eb8b7ecd307ab7f464741e9d698751e531a704106b38fa7bd3c2d02471b75513ea151bb6501a409e342"' :
                                            'id="xs-components-links-module-SideMenuNewCaseComponentModule-37880e474606ab94439198ea02e57f5bdf08ccfa54996eb8b7ecd307ab7f464741e9d698751e531a704106b38fa7bd3c2d02471b75513ea151bb6501a409e342"' }>
                                            <li class="link">
                                                <a href="components/NewCaseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">NewCaseComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuOptionSelectorComponentModule.html" data-type="entity-link" >SideMenuOptionSelectorComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SideMenuOptionSelectorComponentModule-1d9c09210eae549d002ce730f520e5d0e8095914cc7c43c1fc3042599bb4de4ab17ffed1c2bea1d9eaf43020377aeb1ff27bc7038022fac48d58168882d0f3f1"' : 'data-bs-target="#xs-components-links-module-SideMenuOptionSelectorComponentModule-1d9c09210eae549d002ce730f520e5d0e8095914cc7c43c1fc3042599bb4de4ab17ffed1c2bea1d9eaf43020377aeb1ff27bc7038022fac48d58168882d0f3f1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuOptionSelectorComponentModule-1d9c09210eae549d002ce730f520e5d0e8095914cc7c43c1fc3042599bb4de4ab17ffed1c2bea1d9eaf43020377aeb1ff27bc7038022fac48d58168882d0f3f1"' :
                                            'id="xs-components-links-module-SideMenuOptionSelectorComponentModule-1d9c09210eae549d002ce730f520e5d0e8095914cc7c43c1fc3042599bb4de4ab17ffed1c2bea1d9eaf43020377aeb1ff27bc7038022fac48d58168882d0f3f1"' }>
                                            <li class="link">
                                                <a href="components/OptionSelectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">OptionSelectorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuSaveFilterComponentModule.html" data-type="entity-link" >SideMenuSaveFilterComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SideMenuSaveFilterComponentModule-f9ffa88f8242f9191e15979c884bec9df1313479665b5be156a013e826ec51307cf8491fb3062ee3dacb745e0798086f6c0e23a4d828117233ab3c8b0a49fbbf"' : 'data-bs-target="#xs-components-links-module-SideMenuSaveFilterComponentModule-f9ffa88f8242f9191e15979c884bec9df1313479665b5be156a013e826ec51307cf8491fb3062ee3dacb745e0798086f6c0e23a4d828117233ab3c8b0a49fbbf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuSaveFilterComponentModule-f9ffa88f8242f9191e15979c884bec9df1313479665b5be156a013e826ec51307cf8491fb3062ee3dacb745e0798086f6c0e23a4d828117233ab3c8b0a49fbbf"' :
                                            'id="xs-components-links-module-SideMenuSaveFilterComponentModule-f9ffa88f8242f9191e15979c884bec9df1313479665b5be156a013e826ec51307cf8491fb3062ee3dacb745e0798086f6c0e23a4d828117233ab3c8b0a49fbbf"' }>
                                            <li class="link">
                                                <a href="components/SaveFilterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">SaveFilterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SideMenuUserAssignComponentModule.html" data-type="entity-link" >SideMenuUserAssignComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SideMenuUserAssignComponentModule-3b7f989a9c0e0aa83a78641dd1d9188f4bbda2cd6bd5baaaba582ca87dbd23193402df1b2f57679eb67788bcfe983bea10d258741ee2e38f33a92b3c0f577bae"' : 'data-bs-target="#xs-components-links-module-SideMenuUserAssignComponentModule-3b7f989a9c0e0aa83a78641dd1d9188f4bbda2cd6bd5baaaba582ca87dbd23193402df1b2f57679eb67788bcfe983bea10d258741ee2e38f33a92b3c0f577bae"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuUserAssignComponentModule-3b7f989a9c0e0aa83a78641dd1d9188f4bbda2cd6bd5baaaba582ca87dbd23193402df1b2f57679eb67788bcfe983bea10d258741ee2e38f33a92b3c0f577bae"' :
                                            'id="xs-components-links-module-SideMenuUserAssignComponentModule-3b7f989a9c0e0aa83a78641dd1d9188f4bbda2cd6bd5baaaba582ca87dbd23193402df1b2f57679eb67788bcfe983bea10d258741ee2e38f33a92b3c0f577bae"' }>
                                            <li class="link">
                                                <a href="components/UserAssignComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">UserAssignComponent</a>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SideMenuUserImpersonateComponentModule-d3501b4f8986b11cde5c2a2b8d55c5f107df91c0c33f0a15fc1e607fa210bc6f58a68f182d533756d7de05ac3e815ca0cfc2aa12653d0fb25df6a06429ec0a91"' : 'data-bs-target="#xs-components-links-module-SideMenuUserImpersonateComponentModule-d3501b4f8986b11cde5c2a2b8d55c5f107df91c0c33f0a15fc1e607fa210bc6f58a68f182d533756d7de05ac3e815ca0cfc2aa12653d0fb25df6a06429ec0a91"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuUserImpersonateComponentModule-d3501b4f8986b11cde5c2a2b8d55c5f107df91c0c33f0a15fc1e607fa210bc6f58a68f182d533756d7de05ac3e815ca0cfc2aa12653d0fb25df6a06429ec0a91"' :
                                            'id="xs-components-links-module-SideMenuUserImpersonateComponentModule-d3501b4f8986b11cde5c2a2b8d55c5f107df91c0c33f0a15fc1e607fa210bc6f58a68f182d533756d7de05ac3e815ca0cfc2aa12653d0fb25df6a06429ec0a91"' }>
                                            <li class="link">
                                                <a href="components/UserImpersonateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">UserImpersonateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsComponentModule.html" data-type="entity-link" >TabsComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TabsComponentModule-3d09732b7c7d2be7f4e3fcc119905819d75d2fb68aa83282ffe1e219f991acb7e9f5d0a4cc699d5055d57be73384cc102dbd1519b95714f786c1bd6500fbce72"' : 'data-bs-target="#xs-components-links-module-TabsComponentModule-3d09732b7c7d2be7f4e3fcc119905819d75d2fb68aa83282ffe1e219f991acb7e9f5d0a4cc699d5055d57be73384cc102dbd1519b95714f786c1bd6500fbce72"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsComponentModule-3d09732b7c7d2be7f4e3fcc119905819d75d2fb68aa83282ffe1e219f991acb7e9f5d0a4cc699d5055d57be73384cc102dbd1519b95714f786c1bd6500fbce72"' :
                                            'id="xs-components-links-module-TabsComponentModule-3d09732b7c7d2be7f4e3fcc119905819d75d2fb68aa83282ffe1e219f991acb7e9f5d0a4cc699d5055d57be73384cc102dbd1519b95714f786c1bd6500fbce72"' }>
                                            <li class="link">
                                                <a href="components/TabViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TaskContentComponentModule.html" data-type="entity-link" >TaskContentComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TaskContentComponentModule-9ae56d38371040fed494b775c4be9ad9215cdaf88635656f55cf7e479459a340896978a29198f4f188c698a7dffde736beec5f5b5ab6a06b26c7ff1f69f58398"' : 'data-bs-target="#xs-components-links-module-TaskContentComponentModule-9ae56d38371040fed494b775c4be9ad9215cdaf88635656f55cf7e479459a340896978a29198f4f188c698a7dffde736beec5f5b5ab6a06b26c7ff1f69f58398"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TaskContentComponentModule-9ae56d38371040fed494b775c4be9ad9215cdaf88635656f55cf7e479459a340896978a29198f4f188c698a7dffde736beec5f5b5ab6a06b26c7ff1f69f58398"' :
                                            'id="xs-components-links-module-TaskContentComponentModule-9ae56d38371040fed494b775c4be9ad9215cdaf88635656f55cf7e479459a340896978a29198f4f188c698a7dffde736beec5f5b5ab6a06b26c7ff1f69f58398"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ToolbarComponentModule-5f2850664edda6757edbf1dfa3d44e18ab129972dad765440b1bc69bf6c73ade81297dbcfaa2f3f5533b92c7ba80e92d3a3a18b20b2f894733985955f3c8543e"' : 'data-bs-target="#xs-components-links-module-ToolbarComponentModule-5f2850664edda6757edbf1dfa3d44e18ab129972dad765440b1bc69bf6c73ade81297dbcfaa2f3f5533b92c7ba80e92d3a3a18b20b2f894733985955f3c8543e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ToolbarComponentModule-5f2850664edda6757edbf1dfa3d44e18ab129972dad765440b1bc69bf6c73ade81297dbcfaa2f3f5533b92c7ba80e92d3a3a18b20b2f894733985955f3c8543e"' :
                                            'id="xs-components-links-module-ToolbarComponentModule-5f2850664edda6757edbf1dfa3d44e18ab129972dad765440b1bc69bf6c73ade81297dbcfaa2f3f5533b92c7ba80e92d3a3a18b20b2f894733985955f3c8543e"' }>
                                            <li class="link">
                                                <a href="components/ToolbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TreeCaseViewComponentModule.html" data-type="entity-link" >TreeCaseViewComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TreeCaseViewComponentModule-d1d31838d2be824012ff5cc7775be2f3ce1203ecc7e3526a4baf2c76d6c3e77629d371e64f56679a79c67b93c2be0a2b2054dd011d131d1672ae3adf4d4e2626"' : 'data-bs-target="#xs-components-links-module-TreeCaseViewComponentModule-d1d31838d2be824012ff5cc7775be2f3ce1203ecc7e3526a4baf2c76d6c3e77629d371e64f56679a79c67b93c2be0a2b2054dd011d131d1672ae3adf4d4e2626"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TreeCaseViewComponentModule-d1d31838d2be824012ff5cc7775be2f3ce1203ecc7e3526a4baf2c76d6c3e77629d371e64f56679a79c67b93c2be0a2b2054dd011d131d1672ae3adf4d4e2626"' :
                                            'id="xs-components-links-module-TreeCaseViewComponentModule-d1d31838d2be824012ff5cc7775be2f3ce1203ecc7e3526a4baf2c76d6c3e77629d371e64f56679a79c67b93c2be0a2b2054dd011d131d1672ae3adf4d4e2626"' }>
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
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserComponentModule-0abbf225f4bf591a4029b0e1e367ef5f4590e2017602734ba03c5985c29f17d9d2166ad6eb9397b68e3af072b8e62ac02ec878a7e61e21f0186280442bf2a35a"' : 'data-bs-target="#xs-components-links-module-UserComponentModule-0abbf225f4bf591a4029b0e1e367ef5f4590e2017602734ba03c5985c29f17d9d2166ad6eb9397b68e3af072b8e62ac02ec878a7e61e21f0186280442bf2a35a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserComponentModule-0abbf225f4bf591a4029b0e1e367ef5f4590e2017602734ba03c5985c29f17d9d2166ad6eb9397b68e3af072b8e62ac02ec878a7e61e21f0186280442bf2a35a"' :
                                            'id="xs-components-links-module-UserComponentModule-0abbf225f4bf591a4029b0e1e367ef5f4590e2017602734ba03c5985c29f17d9d2166ad6eb9397b68e3af072b8e62ac02ec878a7e61e21f0186280442bf2a35a"' }>
                                            <li class="link">
                                                <a href="components/UserCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WorkflowViewComponentModule.html" data-type="entity-link" >WorkflowViewComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-WorkflowViewComponentModule-73065ea3290c362e8039e8fa735a1b33b046a19a0f5e00fede0cb8cf4502f93faaa997d4e387814ce404fbd3551ea2c2fce875f8ed6038b7475c920be5b71d87"' : 'data-bs-target="#xs-components-links-module-WorkflowViewComponentModule-73065ea3290c362e8039e8fa735a1b33b046a19a0f5e00fede0cb8cf4502f93faaa997d4e387814ce404fbd3551ea2c2fce875f8ed6038b7475c920be5b71d87"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WorkflowViewComponentModule-73065ea3290c362e8039e8fa735a1b33b046a19a0f5e00fede0cb8cf4502f93faaa997d4e387814ce404fbd3551ea2c2fce875f8ed6038b7475c920be5b71d87"' :
                                            'id="xs-components-links-module-WorkflowViewComponentModule-73065ea3290c362e8039e8fa735a1b33b046a19a0f5e00fede0cb8cf4502f93faaa997d4e387814ce404fbd3551ea2c2fce875f8ed6038b7475c920be5b71d87"' }>
                                            <li class="link">
                                                <a href="components/WorkflowViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkflowViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
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
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
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
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/FileList.html" data-type="entity-link" >FileList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Form.html" data-type="entity-link" >Form</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InjectedTabbedCaseViewDataWithNavigationItemTaskData.html" data-type="entity-link" >InjectedTabbedCaseViewDataWithNavigationItemTaskData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InjectedTabbedTaskViewDataWithNavigationItemTaskData.html" data-type="entity-link" >InjectedTabbedTaskViewDataWithNavigationItemTaskData</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});