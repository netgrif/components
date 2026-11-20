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
                                <a href="modules/ActionEditorModule.html" data-type="entity-link" >ActionEditorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ActionEditorModule-74f7212f7741dd98b6f703e458b68b54a75ce440cec868d725784919ac59afba9a670d2b5b5b5ba17ce623bf5b327819e295977cd3f6bf7190cff74fa98f9be8"' : 'data-bs-target="#xs-components-links-module-ActionEditorModule-74f7212f7741dd98b6f703e458b68b54a75ce440cec868d725784919ac59afba9a670d2b5b5b5ba17ce623bf5b327819e295977cd3f6bf7190cff74fa98f9be8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ActionEditorModule-74f7212f7741dd98b6f703e458b68b54a75ce440cec868d725784919ac59afba9a670d2b5b5b5ba17ce623bf5b327819e295977cd3f6bf7190cff74fa98f9be8"' :
                                            'id="xs-components-links-module-ActionEditorModule-74f7212f7741dd98b6f703e458b68b54a75ce440cec868d725784919ac59afba9a670d2b5b5b5ba17ce623bf5b327819e295977cd3f6bf7190cff74fa98f9be8"' }>
                                            <li class="link">
                                                <a href="components/ActionEditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActionEditorListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionEditorListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActionEditorMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionEditorMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActionEditorMenuDescriptionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionEditorMenuDescriptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActionEditorMenuItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionEditorMenuItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FunctionEditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FunctionEditorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-ActionEditorModule-74f7212f7741dd98b6f703e458b68b54a75ce440cec868d725784919ac59afba9a670d2b5b5b5ba17ce623bf5b327819e295977cd3f6bf7190cff74fa98f9be8"' : 'data-bs-target="#xs-pipes-links-module-ActionEditorModule-74f7212f7741dd98b6f703e458b68b54a75ce440cec868d725784919ac59afba9a670d2b5b5b5ba17ce623bf5b327819e295977cd3f6bf7190cff74fa98f9be8"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-ActionEditorModule-74f7212f7741dd98b6f703e458b68b54a75ce440cec868d725784919ac59afba9a670d2b5b5b5ba17ce623bf5b327819e295977cd3f6bf7190cff74fa98f9be8"' :
                                            'id="xs-pipes-links-module-ActionEditorModule-74f7212f7741dd98b6f703e458b68b54a75ce440cec868d725784919ac59afba9a670d2b5b5b5ba17ce623bf5b327819e295977cd3f6bf7190cff74fa98f9be8"' }>
                                            <li class="link">
                                                <a href="pipes/SafeHtmlPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SafeHtmlPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminComponentModule.html" data-type="entity-link" >AdminComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdminComponentModule-25fa298890867a20df2868385a3fd6dea628b0635836dcf0da081f8b12ae7b5c792c566c5cd0b43900d6e3d7e10c020b0d04817af0d2dda830cdceb9238ffefd"' : 'data-bs-target="#xs-components-links-module-AdminComponentModule-25fa298890867a20df2868385a3fd6dea628b0635836dcf0da081f8b12ae7b5c792c566c5cd0b43900d6e3d7e10c020b0d04817af0d2dda830cdceb9238ffefd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminComponentModule-25fa298890867a20df2868385a3fd6dea628b0635836dcf0da081f8b12ae7b5c792c566c5cd0b43900d6e3d7e10c020b0d04817af0d2dda830cdceb9238ffefd"' :
                                            'id="xs-components-links-module-AdminComponentModule-25fa298890867a20df2868385a3fd6dea628b0635836dcf0da081f8b12ae7b5c792c566c5cd0b43900d6e3d7e10c020b0d04817af0d2dda830cdceb9238ffefd"' }>
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
                                            'data-bs-target="#components-links-module-AdvancedSearchComponentModule-8236c8dbd702818ccbbea5de3de21178fc775074b0eadf82cb49500b0a42f995a562a256d6016da7b26a6c7247a9fd2fb81765a964e0e895f67a435397fe3201"' : 'data-bs-target="#xs-components-links-module-AdvancedSearchComponentModule-8236c8dbd702818ccbbea5de3de21178fc775074b0eadf82cb49500b0a42f995a562a256d6016da7b26a6c7247a9fd2fb81765a964e0e895f67a435397fe3201"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdvancedSearchComponentModule-8236c8dbd702818ccbbea5de3de21178fc775074b0eadf82cb49500b0a42f995a562a256d6016da7b26a6c7247a9fd2fb81765a964e0e895f67a435397fe3201"' :
                                            'id="xs-components-links-module-AdvancedSearchComponentModule-8236c8dbd702818ccbbea5de3de21178fc775074b0eadf82cb49500b0a42f995a562a256d6016da7b26a6c7247a9fd2fb81765a964e0e895f67a435397fe3201"' }>
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
                                <a href="modules/BuilderDialogsModule.html" data-type="entity-link" >BuilderDialogsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-BuilderDialogsModule-65a9e2ba235326ef5a15eac9a1ec5793730695be3f06eb19e3a3f74f38d6e5538e7de4e30a19ef16a9fdd40cb243c0b79b7cb4e2bd5b67f8a38185006d809596"' : 'data-bs-target="#xs-components-links-module-BuilderDialogsModule-65a9e2ba235326ef5a15eac9a1ec5793730695be3f06eb19e3a3f74f38d6e5538e7de4e30a19ef16a9fdd40cb243c0b79b7cb4e2bd5b67f8a38185006d809596"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BuilderDialogsModule-65a9e2ba235326ef5a15eac9a1ec5793730695be3f06eb19e3a3f74f38d6e5538e7de4e30a19ef16a9fdd40cb243c0b79b7cb4e2bd5b67f8a38185006d809596"' :
                                            'id="xs-components-links-module-BuilderDialogsModule-65a9e2ba235326ef5a15eac9a1ec5793730695be3f06eb19e3a3f74f38d6e5538e7de4e30a19ef16a9fdd40cb243c0b79b7cb4e2bd5b67f8a38185006d809596"' }>
                                            <li class="link">
                                                <a href="components/DialogArcEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogArcEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogChangeDataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogChangeDataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogDeadNetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogDeadNetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogDeleteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogDeleteModelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogDeleteModelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogErrorsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogErrorsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogLocalStorageModelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogLocalStorageModelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogManageRolesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogManageRolesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogMarkingChangeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogMarkingChangeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogModelEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogModelEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogPlaceEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogPlaceEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogPlaceRefDeleteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogPlaceRefDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogRefactorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogRefactorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogTransitionEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogTransitionEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TriggerTreeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TriggerTreeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BuilderModule.html" data-type="entity-link" >BuilderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-BuilderModule-4ca53691b533c2f93d6ed46e51275e446dd72ffca2e922c97bfaa4f38450c64e758c6b50920ea34fd1dc0d1fd70645133cb96b30129a31de0f0e47d90ec8af97"' : 'data-bs-target="#xs-components-links-module-BuilderModule-4ca53691b533c2f93d6ed46e51275e446dd72ffca2e922c97bfaa4f38450c64e758c6b50920ea34fd1dc0d1fd70645133cb96b30129a31de0f0e47d90ec8af97"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BuilderModule-4ca53691b533c2f93d6ed46e51275e446dd72ffca2e922c97bfaa4f38450c64e758c6b50920ea34fd1dc0d1fd70645133cb96b30129a31de0f0e47d90ec8af97"' :
                                            'id="xs-components-links-module-BuilderModule-4ca53691b533c2f93d6ed46e51275e446dd72ffca2e922c97bfaa4f38450c64e758c6b50920ea34fd1dc0d1fd70645133cb96b30129a31de0f0e47d90ec8af97"' }>
                                            <li class="link">
                                                <a href="components/BuilderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BuilderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProcessRefDefaultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProcessRefDefaultComponent</a>
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
                                            'data-bs-target="#components-links-module-DashboardComponentModule-99e2215b439b4b96b95aa8b916766f72c645b65dfc61611e5d6364724bab601a1093f38883df25d5effb5ae16bff2f61efbb6452b3aa48fd478a11fd3608ffe6"' : 'data-bs-target="#xs-components-links-module-DashboardComponentModule-99e2215b439b4b96b95aa8b916766f72c645b65dfc61611e5d6364724bab601a1093f38883df25d5effb5ae16bff2f61efbb6452b3aa48fd478a11fd3608ffe6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardComponentModule-99e2215b439b4b96b95aa8b916766f72c645b65dfc61611e5d6364724bab601a1093f38883df25d5effb5ae16bff2f61efbb6452b3aa48fd478a11fd3608ffe6"' :
                                            'id="xs-components-links-module-DashboardComponentModule-99e2215b439b4b96b95aa8b916766f72c645b65dfc61611e5d6364724bab601a1093f38883df25d5effb5ae16bff2f61efbb6452b3aa48fd478a11fd3608ffe6"' }>
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
                                            'data-bs-target="#components-links-module-DataFieldsComponentModule-0197e2df25ec7b43da5beab525fd9b86d721871ef3a28020568e6069ed6d9d65eab5c6213524b16ed58e6647768da2a570ed06244c9dc268f63747b2a5bc804a"' : 'data-bs-target="#xs-components-links-module-DataFieldsComponentModule-0197e2df25ec7b43da5beab525fd9b86d721871ef3a28020568e6069ed6d9d65eab5c6213524b16ed58e6647768da2a570ed06244c9dc268f63747b2a5bc804a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DataFieldsComponentModule-0197e2df25ec7b43da5beab525fd9b86d721871ef3a28020568e6069ed6d9d65eab5c6213524b16ed58e6647768da2a570ed06244c9dc268f63747b2a5bc804a"' :
                                            'id="xs-components-links-module-DataFieldsComponentModule-0197e2df25ec7b43da5beab525fd9b86d721871ef3a28020568e6069ed6d9d65eab5c6213524b16ed58e6647768da2a570ed06244c9dc268f63747b2a5bc804a"' }>
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
                                                <a href="components/FilterStringQueryFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterStringQueryFieldComponent</a>
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
                                            'data-bs-target="#components-links-module-DialogComponentsModule-a44baa3263bad37dda8c27a034805ad10ffefb118fd4ab99b701ed4c5b0d4cfc304627354353eafa5bd4a27185345fa82518631ba68e4e34865acc9ce1764f80"' : 'data-bs-target="#xs-components-links-module-DialogComponentsModule-a44baa3263bad37dda8c27a034805ad10ffefb118fd4ab99b701ed4c5b0d4cfc304627354353eafa5bd4a27185345fa82518631ba68e4e34865acc9ce1764f80"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DialogComponentsModule-a44baa3263bad37dda8c27a034805ad10ffefb118fd4ab99b701ed4c5b0d4cfc304627354353eafa5bd4a27185345fa82518631ba68e4e34865acc9ce1764f80"' :
                                            'id="xs-components-links-module-DialogComponentsModule-a44baa3263bad37dda8c27a034805ad10ffefb118fd4ab99b701ed4c5b0d4cfc304627354353eafa5bd4a27185345fa82518631ba68e4e34865acc9ce1764f80"' }>
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
                                                <a href="components/MultiUserAssignDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultiUserAssignDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewCaseDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewCaseDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SingleTaskViewDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SingleTaskViewDialogComponent</a>
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
                                <a href="modules/FormBuilderModule.html" data-type="entity-link" >FormBuilderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FormBuilderModule-2b59f0d5499bb6b26c4e479b1caa4c89379bbca98e67917179f0e8952524017b31c2470b4d99c991b65ea3a3c6192950e420ed1ad99637e860db7e3d98cf838f"' : 'data-bs-target="#xs-components-links-module-FormBuilderModule-2b59f0d5499bb6b26c4e479b1caa4c89379bbca98e67917179f0e8952524017b31c2470b4d99c991b65ea3a3c6192950e420ed1ad99637e860db7e3d98cf838f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormBuilderModule-2b59f0d5499bb6b26c4e479b1caa4c89379bbca98e67917179f0e8952524017b31c2470b4d99c991b65ea3a3c6192950e420ed1ad99637e860db7e3d98cf838f"' :
                                            'id="xs-components-links-module-FormBuilderModule-2b59f0d5499bb6b26c4e479b1caa4c89379bbca98e67917179f0e8952524017b31c2470b4d99c991b65ea3a3c6192950e420ed1ad99637e860db7e3d98cf838f"' }>
                                            <li class="link">
                                                <a href="components/EditPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FieldListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FieldListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormBuilderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormBuilderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GridsterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GridsterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GridsterDataFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GridsterDataFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfoLabelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InfoLabelComponent</a>
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
                                            'data-bs-target="#components-links-module-LegalNoticeModule-38f9569685144f6033dd703233dae65bb360bdb162f8ce3b8d794f7a714e89f3f4abfed728adf8bd8c62f0be1ca127397f30da827edd46629e87d3766c5734d0"' : 'data-bs-target="#xs-components-links-module-LegalNoticeModule-38f9569685144f6033dd703233dae65bb360bdb162f8ce3b8d794f7a714e89f3f4abfed728adf8bd8c62f0be1ca127397f30da827edd46629e87d3766c5734d0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LegalNoticeModule-38f9569685144f6033dd703233dae65bb360bdb162f8ce3b8d794f7a714e89f3f4abfed728adf8bd8c62f0be1ca127397f30da827edd46629e87d3766c5734d0"' :
                                            'id="xs-components-links-module-LegalNoticeModule-38f9569685144f6033dd703233dae65bb360bdb162f8ce3b8d794f7a714e89f3f4abfed728adf8bd8c62f0be1ca127397f30da827edd46629e87d3766c5734d0"' }>
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
                                <a href="modules/ModelerModule.html" data-type="entity-link" >ModelerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ModelerModule-83e6cb68f2a2b43b3e02a344169a09e4d1526edfd859d299ef97cfbba20fc3ce6d956fed8ec9a1157c3beaae9ddadbeaa7a7f359f1821022e73c6ddc00dfe123"' : 'data-bs-target="#xs-components-links-module-ModelerModule-83e6cb68f2a2b43b3e02a344169a09e4d1526edfd859d299ef97cfbba20fc3ce6d956fed8ec9a1157c3beaae9ddadbeaa7a7f359f1821022e73c6ddc00dfe123"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModelerModule-83e6cb68f2a2b43b3e02a344169a09e4d1526edfd859d299ef97cfbba20fc3ce6d956fed8ec9a1157c3beaae9ddadbeaa7a7f359f1821022e73c6ddc00dfe123"' :
                                            'id="xs-components-links-module-ModelerModule-83e6cb68f2a2b43b3e02a344169a09e4d1526edfd859d299ef97cfbba20fc3ce6d956fed8ec9a1157c3beaae9ddadbeaa7a7f359f1821022e73c6ddc00dfe123"' }>
                                            <li class="link">
                                                <a href="components/ActionDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActionMasterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionMasterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActionMasterItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionMasterItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActionsModeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionsModeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContextMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContextMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ControlPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ControlPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataMasterItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataMasterItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataModeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataModeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataTranslationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataTranslationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditModeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditModeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileToolComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileToolComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FlagComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FlagComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FunctionMasterItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FunctionMasterItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HistoryDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HistoryDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HistoryMasterItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HistoryMasterItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HistoryModeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HistoryModeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/I18nFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">I18nFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/I18nModeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >I18nModeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImportSuccessfulComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImportSuccessfulComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImportToolButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImportToolButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LanguagesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LanguagesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainMasterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainMasterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainMasterItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainMasterItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MasterDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MasterDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModelTranslationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModelTranslationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModelerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModelerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProgressComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProgressComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RoleDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RoleMasterItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleMasterItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RoleModeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleModeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RoleTranslationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleTranslationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SimulationModeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SimulationModeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskRefInitFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskRefInitFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskTranslationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskTranslationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToolComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TranslationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TranslationsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NavigationComponentModule.html" data-type="entity-link" >NavigationComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-NavigationComponentModule-61746b87a3821e1a9def18abdb07b76f7ed8eb388be249b0ea04a5adb44a247f1e01a56dcef44bccd0cebf3232507de785833e5e7b3e29c290cd0148e1032b17"' : 'data-bs-target="#xs-components-links-module-NavigationComponentModule-61746b87a3821e1a9def18abdb07b76f7ed8eb388be249b0ea04a5adb44a247f1e01a56dcef44bccd0cebf3232507de785833e5e7b3e29c290cd0148e1032b17"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavigationComponentModule-61746b87a3821e1a9def18abdb07b76f7ed8eb388be249b0ea04a5adb44a247f1e01a56dcef44bccd0cebf3232507de785833e5e7b3e29c290cd0148e1032b17"' :
                                            'id="xs-components-links-module-NavigationComponentModule-61746b87a3821e1a9def18abdb07b76f7ed8eb388be249b0ea04a5adb44a247f1e01a56dcef44bccd0cebf3232507de785833e5e7b3e29c290cd0148e1032b17"' }>
                                            <li class="link">
                                                <a href="components/BreadcrumbsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BreadcrumbsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultCaseRefListViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultCaseRefListViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultNoFilterProvidedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultNoFilterProvidedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultPublicResolverComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultPublicResolverComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultPublicSingleTaskViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultPublicSingleTaskViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultPublicTaskViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultPublicTaskViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultPublicWorkflowViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultPublicWorkflowViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultSimpleCaseViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultSimpleCaseViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultSimpleTaskViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultSimpleTaskViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultSingleTaskViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultSingleTaskViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultTabViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultTabViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultTabbedCaseViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultTabbedCaseViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultTabbedSingleTaskViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultTabbedSingleTaskViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultTabbedTaskViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultTabbedTaskViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultTaskViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultTaskViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultTicketViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultTicketViewComponent</a>
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
                                            'data-bs-target="#components-links-module-QuickPanelComponentModule-1dd1d411f3c04d2c768abbde0c00bacaf9ef2898ff0abce0865c0fd6c6e79fb0723f72d876848b615e31763ad260a7c56245d41cad0b9cbc9071c18a7c65faa1"' : 'data-bs-target="#xs-components-links-module-QuickPanelComponentModule-1dd1d411f3c04d2c768abbde0c00bacaf9ef2898ff0abce0865c0fd6c6e79fb0723f72d876848b615e31763ad260a7c56245d41cad0b9cbc9071c18a7c65faa1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-QuickPanelComponentModule-1dd1d411f3c04d2c768abbde0c00bacaf9ef2898ff0abce0865c0fd6c6e79fb0723f72d876848b615e31763ad260a7c56245d41cad0b9cbc9071c18a7c65faa1"' :
                                            'id="xs-components-links-module-QuickPanelComponentModule-1dd1d411f3c04d2c768abbde0c00bacaf9ef2898ff0abce0865c0fd6c6e79fb0723f72d876848b615e31763ad260a7c56245d41cad0b9cbc9071c18a7c65faa1"' }>
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
                                            'data-bs-target="#components-links-module-RedirectComponentModule-fbc27e066706ba0b20a6c44e5e24f4388ca15ac135fe74cc504c52126769fa352748c92643e093da7312e40b16a1258686b490f93f3dc9e277389c22d9654325"' : 'data-bs-target="#xs-components-links-module-RedirectComponentModule-fbc27e066706ba0b20a6c44e5e24f4388ca15ac135fe74cc504c52126769fa352748c92643e093da7312e40b16a1258686b490f93f3dc9e277389c22d9654325"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RedirectComponentModule-fbc27e066706ba0b20a6c44e5e24f4388ca15ac135fe74cc504c52126769fa352748c92643e093da7312e40b16a1258686b490f93f3dc9e277389c22d9654325"' :
                                            'id="xs-components-links-module-RedirectComponentModule-fbc27e066706ba0b20a6c44e5e24f4388ca15ac135fe74cc504c52126769fa352748c92643e093da7312e40b16a1258686b490f93f3dc9e277389c22d9654325"' }>
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
                                            'data-bs-target="#components-links-module-SearchComponentModule-a2dd31d799bab7bfaad2947254fc2eeab5dce142cdeeffc764269639204e60cb0c16059f2f1eed1bcb1c0dbdc8c8387965fb7f10bcdcfef226443e7d4ff478d6"' : 'data-bs-target="#xs-components-links-module-SearchComponentModule-a2dd31d799bab7bfaad2947254fc2eeab5dce142cdeeffc764269639204e60cb0c16059f2f1eed1bcb1c0dbdc8c8387965fb7f10bcdcfef226443e7d4ff478d6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchComponentModule-a2dd31d799bab7bfaad2947254fc2eeab5dce142cdeeffc764269639204e60cb0c16059f2f1eed1bcb1c0dbdc8c8387965fb7f10bcdcfef226443e7d4ff478d6"' :
                                            'id="xs-components-links-module-SearchComponentModule-a2dd31d799bab7bfaad2947254fc2eeab5dce142cdeeffc764269639204e60cb0c16059f2f1eed1bcb1c0dbdc8c8387965fb7f10bcdcfef226443e7d4ff478d6"' }>
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
                                            'data-bs-target="#components-links-module-SideMenuComponentModule-9647cb04c75c48423996a7b38355f41ffbf410b35497f3a701a829d7d591bdf4ab578d94a75f6872c5627c9758c46bf2e50afa1bc1fb2bf1efd48e56b13dbff6"' : 'data-bs-target="#xs-components-links-module-SideMenuComponentModule-9647cb04c75c48423996a7b38355f41ffbf410b35497f3a701a829d7d591bdf4ab578d94a75f6872c5627c9758c46bf2e50afa1bc1fb2bf1efd48e56b13dbff6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuComponentModule-9647cb04c75c48423996a7b38355f41ffbf410b35497f3a701a829d7d591bdf4ab578d94a75f6872c5627c9758c46bf2e50afa1bc1fb2bf1efd48e56b13dbff6"' :
                                            'id="xs-components-links-module-SideMenuComponentModule-9647cb04c75c48423996a7b38355f41ffbf410b35497f3a701a829d7d591bdf4ab578d94a75f6872c5627c9758c46bf2e50afa1bc1fb2bf1efd48e56b13dbff6"' }>
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
                                            'data-bs-target="#components-links-module-SideMenuFilterSelectorComponentModule-62c502b53feda68cb00b88416b6c9e52bf632875da3deade3bf001fb70abd1b4aa5f522aa215ae32d62ee05fb951017977853e56865e0578afbe884975d3a50f"' : 'data-bs-target="#xs-components-links-module-SideMenuFilterSelectorComponentModule-62c502b53feda68cb00b88416b6c9e52bf632875da3deade3bf001fb70abd1b4aa5f522aa215ae32d62ee05fb951017977853e56865e0578afbe884975d3a50f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuFilterSelectorComponentModule-62c502b53feda68cb00b88416b6c9e52bf632875da3deade3bf001fb70abd1b4aa5f522aa215ae32d62ee05fb951017977853e56865e0578afbe884975d3a50f"' :
                                            'id="xs-components-links-module-SideMenuFilterSelectorComponentModule-62c502b53feda68cb00b88416b6c9e52bf632875da3deade3bf001fb70abd1b4aa5f522aa215ae32d62ee05fb951017977853e56865e0578afbe884975d3a50f"' }>
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
                                            'data-bs-target="#components-links-module-SideMenuOptionSelectorComponentModule-acd6336f25af96a6b84dd66871f535069d47ac7499b64287352559a24fc834bf21755c81720147ed875fec0f728984c47b57dd44bcba3fa1285fbed6dace53d6"' : 'data-bs-target="#xs-components-links-module-SideMenuOptionSelectorComponentModule-acd6336f25af96a6b84dd66871f535069d47ac7499b64287352559a24fc834bf21755c81720147ed875fec0f728984c47b57dd44bcba3fa1285fbed6dace53d6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuOptionSelectorComponentModule-acd6336f25af96a6b84dd66871f535069d47ac7499b64287352559a24fc834bf21755c81720147ed875fec0f728984c47b57dd44bcba3fa1285fbed6dace53d6"' :
                                            'id="xs-components-links-module-SideMenuOptionSelectorComponentModule-acd6336f25af96a6b84dd66871f535069d47ac7499b64287352559a24fc834bf21755c81720147ed875fec0f728984c47b57dd44bcba3fa1285fbed6dace53d6"' }>
                                            <li class="link">
                                                <a href="components/OptionSelectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" class="deprecated-name">OptionSelectorComponent</a>
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
                                            'data-bs-target="#components-links-module-SideMenuUserImpersonateComponentModule-12252745aa6428fa44323355f982432e277d9eed7d120535496623e1368ad2932893878d50d80c3bbdc3a661e3a13f7529403058e109d0f70c574b939c8e2b93"' : 'data-bs-target="#xs-components-links-module-SideMenuUserImpersonateComponentModule-12252745aa6428fa44323355f982432e277d9eed7d120535496623e1368ad2932893878d50d80c3bbdc3a661e3a13f7529403058e109d0f70c574b939c8e2b93"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SideMenuUserImpersonateComponentModule-12252745aa6428fa44323355f982432e277d9eed7d120535496623e1368ad2932893878d50d80c3bbdc3a661e3a13f7529403058e109d0f70c574b939c8e2b93"' :
                                            'id="xs-components-links-module-SideMenuUserImpersonateComponentModule-12252745aa6428fa44323355f982432e277d9eed7d120535496623e1368ad2932893878d50d80c3bbdc3a661e3a13f7529403058e109d0f70c574b939c8e2b93"' }>
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
                                            'data-bs-target="#components-links-module-UserComponentModule-5afb300d6d8299614f5772a21f89067218e726157bfa2516850cdc96315c1430b3cffa6b0e7cac2fce35f221ad52f48a1556ff723885335514a7c57d001d1977"' : 'data-bs-target="#xs-components-links-module-UserComponentModule-5afb300d6d8299614f5772a21f89067218e726157bfa2516850cdc96315c1430b3cffa6b0e7cac2fce35f221ad52f48a1556ff723885335514a7c57d001d1977"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserComponentModule-5afb300d6d8299614f5772a21f89067218e726157bfa2516850cdc96315c1430b3cffa6b0e7cac2fce35f221ad52f48a1556ff723885335514a7c57d001d1977"' :
                                            'id="xs-components-links-module-UserComponentModule-5afb300d6d8299614f5772a21f89067218e726157bfa2516850cdc96315c1430b3cffa6b0e7cac2fce35f221ad52f48a1556ff723885335514a7c57d001d1977"' }>
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
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AbstractMasterComponent.html" data-type="entity-link" >AbstractMasterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditModeComponent-1.html" data-type="entity-link" >EditModeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/I18nFieldComponent-1.html" data-type="entity-link" >I18nFieldComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MaterialIconPickerComponent.html" data-type="entity-link" >MaterialIconPickerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PageMasterComponent.html" data-type="entity-link" >PageMasterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TaskModeComponent.html" data-type="entity-link" >TaskModeComponent</a>
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
                                <a href="classes/AbstractDetailComponent.html" data-type="entity-link" >AbstractDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractRegistry.html" data-type="entity-link" >AbstractRegistry</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActionGroup.html" data-type="entity-link" >ActionGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddTokenTool.html" data-type="entity-link" >AddTokenTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/ArcBuilder.html" data-type="entity-link" >ArcBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/CanvasArc.html" data-type="entity-link" >CanvasArc</a>
                            </li>
                            <li class="link">
                                <a href="classes/CanvasElementCollection.html" data-type="entity-link" >CanvasElementCollection</a>
                            </li>
                            <li class="link">
                                <a href="classes/CanvasListenerTool.html" data-type="entity-link" >CanvasListenerTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/CanvasNodeElement.html" data-type="entity-link" >CanvasNodeElement</a>
                            </li>
                            <li class="link">
                                <a href="classes/CanvasObject.html" data-type="entity-link" >CanvasObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/CanvasPlace.html" data-type="entity-link" >CanvasPlace</a>
                            </li>
                            <li class="link">
                                <a href="classes/CanvasTool.html" data-type="entity-link" >CanvasTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/CanvasToolContext.html" data-type="entity-link" >CanvasToolContext</a>
                            </li>
                            <li class="link">
                                <a href="classes/CanvasTransition.html" data-type="entity-link" >CanvasTransition</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangedArc.html" data-type="entity-link" >ChangedArc</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeDataTool.html" data-type="entity-link" >ChangeDataTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangedRole.html" data-type="entity-link" >ChangedRole</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangedTransition.html" data-type="entity-link" >ChangedTransition</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearModelTool.html" data-type="entity-link" >ClearModelTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContextMenu.html" data-type="entity-link" >ContextMenu</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContextMenuInterruptionError.html" data-type="entity-link" >ContextMenuInterruptionError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ControlPanelButton.html" data-type="entity-link" >ControlPanelButton</a>
                            </li>
                            <li class="link">
                                <a href="classes/ControlPanelIcon.html" data-type="entity-link" >ControlPanelIcon</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateArcTool.html" data-type="entity-link" >CreateArcTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInhibitorArcTool.html" data-type="entity-link" >CreateInhibitorArcTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePlaceTool.html" data-type="entity-link" >CreatePlaceTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePTArc.html" data-type="entity-link" >CreatePTArc</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReadArcTool.html" data-type="entity-link" >CreateReadArcTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRegularArcTool.html" data-type="entity-link" >CreateRegularArcTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResetArcTool.html" data-type="entity-link" >CreateResetArcTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTransitionTool.html" data-type="entity-link" >CreateTransitionTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataFieldUtils.html" data-type="entity-link" >DataFieldUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteArcMenuItem.html" data-type="entity-link" >DeleteArcMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteBreakpointMenuItem.html" data-type="entity-link" >DeleteBreakpointMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteMenuItem.html" data-type="entity-link" >DeleteMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeletePlaceMenuItem.html" data-type="entity-link" >DeletePlaceMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteSelectedMenuItem.html" data-type="entity-link" >DeleteSelectedMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteTransitionMenuItem.html" data-type="entity-link" >DeleteTransitionMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditableAction.html" data-type="entity-link" >EditableAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditArcMenuItem.html" data-type="entity-link" >EditArcMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditFormMenuItem.html" data-type="entity-link" >EditFormMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditModelMenuItem.html" data-type="entity-link" >EditModelMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditPlaceMenuItem.html" data-type="entity-link" >EditPlaceMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditTransitionActionsMenuItem.html" data-type="entity-link" >EditTransitionActionsMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditTransitionMenuItem.html" data-type="entity-link" >EditTransitionMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditTransitionPermissionsMenuItem.html" data-type="entity-link" >EditTransitionPermissionsMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/ElementChange.html" data-type="entity-link" >ElementChange</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventSimulationTool.html" data-type="entity-link" >EventSimulationTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/GridsterDataField.html" data-type="entity-link" >GridsterDataField</a>
                            </li>
                            <li class="link">
                                <a href="classes/GridTool.html" data-type="entity-link" >GridTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/GridTool-1.html" data-type="entity-link" >GridTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/History.html" data-type="entity-link" >History</a>
                            </li>
                            <li class="link">
                                <a href="classes/HistoryChange.html" data-type="entity-link" >HistoryChange</a>
                            </li>
                            <li class="link">
                                <a href="classes/Hotkey.html" data-type="entity-link" >Hotkey</a>
                            </li>
                            <li class="link">
                                <a href="classes/I18nStringKeyTemplate.html" data-type="entity-link" >I18nStringKeyTemplate</a>
                            </li>
                            <li class="link">
                                <a href="classes/I18nTool.html" data-type="entity-link" >I18nTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/Identifiable.html" data-type="entity-link" >Identifiable</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImportToAdd.html" data-type="entity-link" >ImportToAdd</a>
                            </li>
                            <li class="link">
                                <a href="classes/InhibitorArcBuilder.html" data-type="entity-link" >InhibitorArcBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/LeafNode.html" data-type="entity-link" >LeafNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/Locale.html" data-type="entity-link" >Locale</a>
                            </li>
                            <li class="link">
                                <a href="classes/Locales.html" data-type="entity-link" >Locales</a>
                            </li>
                            <li class="link">
                                <a href="classes/ManageModelPermissionsMenuItem.html" data-type="entity-link" >ManageModelPermissionsMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/MasterItem.html" data-type="entity-link" >MasterItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/MaterialIconList.html" data-type="entity-link" >MaterialIconList</a>
                            </li>
                            <li class="link">
                                <a href="classes/MenuItem.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/MenuItem-1.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/MenuItemConfiguration.html" data-type="entity-link" >MenuItemConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="classes/Mode.html" data-type="entity-link" >Mode</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModelChange.html" data-type="entity-link" >ModelChange</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModelConfig.html" data-type="entity-link" >ModelConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModelerConfig.html" data-type="entity-link" >ModelerConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModelerUtils.html" data-type="entity-link" >ModelerUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModelImported.html" data-type="entity-link" >ModelImported</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModeRegistry.html" data-type="entity-link" >ModeRegistry</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModeService.html" data-type="entity-link" >ModeService</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlaceChange.html" data-type="entity-link" >PlaceChange</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlaceCreated.html" data-type="entity-link" >PlaceCreated</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlaceDeleted.html" data-type="entity-link" >PlaceDeleted</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlaceMoved.html" data-type="entity-link" >PlaceMoved</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuickDrawTool.html" data-type="entity-link" >QuickDrawTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReadArcBuilder.html" data-type="entity-link" >ReadArcBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegularPTArcBuilder.html" data-type="entity-link" >RegularPTArcBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegularTPArcBuilder.html" data-type="entity-link" >RegularTPArcBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveTokenTool.html" data-type="entity-link" >RemoveTokenTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetArcBuilder.html" data-type="entity-link" >ResetArcBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPositionAndZoomTool.html" data-type="entity-link" >ResetPositionAndZoomTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPositionAndZoomTool-1.html" data-type="entity-link" >ResetPositionAndZoomTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetSimulationTool.html" data-type="entity-link" >ResetSimulationTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectArcsMenuItem.html" data-type="entity-link" >SelectArcsMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectTool.html" data-type="entity-link" >SelectTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/SequenceGenerator.html" data-type="entity-link" >SequenceGenerator</a>
                            </li>
                            <li class="link">
                                <a href="classes/SimulationMode.html" data-type="entity-link" >SimulationMode</a>
                            </li>
                            <li class="link">
                                <a href="classes/SimulationTool.html" data-type="entity-link" >SimulationTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/SwitchLabelTool.html" data-type="entity-link" >SwitchLabelTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/SwitchLabelTool-1.html" data-type="entity-link" >SwitchLabelTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskSimulationTool.html" data-type="entity-link" >TaskSimulationTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tool.html" data-type="entity-link" >Tool</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToolGroup.html" data-type="entity-link" >ToolGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToolRegistry.html" data-type="entity-link" >ToolRegistry</a>
                            </li>
                            <li class="link">
                                <a href="classes/TranslationGroupConfiguration.html" data-type="entity-link" >TranslationGroupConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="classes/TutorialStep.html" data-type="entity-link" >TutorialStep</a>
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
                                    <a href="injectables/AbstractMasterDetailService.html" data-type="entity-link" >AbstractMasterDetailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ActionEditorService.html" data-type="entity-link" >ActionEditorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ActionEditorTreeService.html" data-type="entity-link" >ActionEditorTreeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ActionItemProviderService.html" data-type="entity-link" >ActionItemProviderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ActionsMasterDetailService.html" data-type="entity-link" >ActionsMasterDetailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ActionsModeService.html" data-type="entity-link" >ActionsModeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ArcFactory.html" data-type="entity-link" >ArcFactory</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BuilderIntegrationService.html" data-type="entity-link" >BuilderIntegrationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BuilderModeService.html" data-type="entity-link" >BuilderModeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BuilderPaginatorIntl.html" data-type="entity-link" >BuilderPaginatorIntl</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CanvasModeService.html" data-type="entity-link" >CanvasModeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ControlPanelService.html" data-type="entity-link" >ControlPanelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataActionsTool.html" data-type="entity-link" >DataActionsTool</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataMasterDetailService.html" data-type="entity-link" >DataMasterDetailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataModeService.html" data-type="entity-link" >DataModeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DefaultGroupNavigationComponentResolverService.html" data-type="entity-link" >DefaultGroupNavigationComponentResolverService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EditModeService.html" data-type="entity-link" >EditModeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExportTool.html" data-type="entity-link" >ExportTool</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FieldListService.html" data-type="entity-link" >FieldListService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FunctionsTool.html" data-type="entity-link" >FunctionsTool</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalToolRegistry.html" data-type="entity-link" >GlobalToolRegistry</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GridsterFieldToEngineFieldService.html" data-type="entity-link" >GridsterFieldToEngineFieldService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GridsterService.html" data-type="entity-link" >GridsterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HistoryMasterDetailService.html" data-type="entity-link" >HistoryMasterDetailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HistoryModeService.html" data-type="entity-link" >HistoryModeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HistoryService.html" data-type="entity-link" >HistoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/I18nControlService.html" data-type="entity-link" >I18nControlService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/I18nModeService.html" data-type="entity-link" >I18nModeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImportTool.html" data-type="entity-link" >ImportTool</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LanguageSelectService.html" data-type="entity-link" >LanguageSelectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LanguagesTool.html" data-type="entity-link" >LanguagesTool</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link" >LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModelerTabsService.html" data-type="entity-link" >ModelerTabsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModelExportService.html" data-type="entity-link" >ModelExportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModelImportService.html" data-type="entity-link" >ModelImportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModelService.html" data-type="entity-link" >ModelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModelSourceService.html" data-type="entity-link" >ModelSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MortgageService.html" data-type="entity-link" >MortgageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProcessActionsTool.html" data-type="entity-link" >ProcessActionsTool</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RedoTool.html" data-type="entity-link" >RedoTool</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleActionsTool.html" data-type="entity-link" >RoleActionsTool</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleMasterDetailService.html" data-type="entity-link" >RoleMasterDetailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleModeService.html" data-type="entity-link" >RoleModeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SelectedTransitionService.html" data-type="entity-link" >SelectedTransitionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SimulationModeService.html" data-type="entity-link" >SimulationModeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SvgExportTool.html" data-type="entity-link" >SvgExportTool</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskModeService.html" data-type="entity-link" >TaskModeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransitionActionsTool.html" data-type="entity-link" >TransitionActionsTool</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TranslationsTool.html" data-type="entity-link" >TranslationsTool</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TutorialService.html" data-type="entity-link" >TutorialService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UndoTool.html" data-type="entity-link" >UndoTool</a>
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
                                <a href="interfaces/ActionChangedEvent.html" data-type="entity-link" >ActionChangedEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ArcEditData.html" data-type="entity-link" >ArcEditData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ArcListener.html" data-type="entity-link" >ArcListener</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChangeMessageResolver.html" data-type="entity-link" >ChangeMessageResolver</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommandAction.html" data-type="entity-link" >CommandAction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommandActions.html" data-type="entity-link" >CommandActions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ComponentDef.html" data-type="entity-link" >ComponentDef</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data-1.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataGroupCaseIdPair.html" data-type="entity-link" >DataGroupCaseIdPair</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataRefDef.html" data-type="entity-link" >DataRefDef</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataSet.html" data-type="entity-link" >DataSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link" >DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogErrorsData.html" data-type="entity-link" >DialogErrorsData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogRefactorData.html" data-type="entity-link" >DialogRefactorData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileList.html" data-type="entity-link" >FileList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Form.html" data-type="entity-link" >Form</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HistoryDataSave.html" data-type="entity-link" >HistoryDataSave</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InjectedTabbedBuilderViewData.html" data-type="entity-link" >InjectedTabbedBuilderViewData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InjectedTabbedCaseViewDataWithNavigationItemTaskData.html" data-type="entity-link" >InjectedTabbedCaseViewDataWithNavigationItemTaskData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InjectedTabbedTaskViewDataWithNavigationItemTaskData.html" data-type="entity-link" >InjectedTabbedTaskViewDataWithNavigationItemTaskData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InjectedTabbedTicketViewDataWithNavigationItemTaskData.html" data-type="entity-link" >InjectedTabbedTicketViewDataWithNavigationItemTaskData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/KeyListener.html" data-type="entity-link" >KeyListener</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ManagePermissionData.html" data-type="entity-link" >ManagePermissionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelEditData.html" data-type="entity-link" >ModelEditData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelSource.html" data-type="entity-link" >ModelSource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MouseListener.html" data-type="entity-link" >MouseListener</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlaceEditData.html" data-type="entity-link" >PlaceEditData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlaceListener.html" data-type="entity-link" >PlaceListener</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlaceRefDeleteData.html" data-type="entity-link" >PlaceRefDeleteData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PropertyDef.html" data-type="entity-link" >PropertyDef</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Reference.html" data-type="entity-link" >Reference</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReferenceDialogData.html" data-type="entity-link" >ReferenceDialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReferenceGroup.html" data-type="entity-link" >ReferenceGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Scope.html" data-type="entity-link" >Scope</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TicketItem.html" data-type="entity-link" >TicketItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TransitionEditData.html" data-type="entity-link" >TransitionEditData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TransitionListener.html" data-type="entity-link" >TransitionListener</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TreeNode.html" data-type="entity-link" >TreeNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TriggerNode.html" data-type="entity-link" >TriggerNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TypeArray.html" data-type="entity-link" >TypeArray</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TypeArray-1.html" data-type="entity-link" >TypeArray</a>
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