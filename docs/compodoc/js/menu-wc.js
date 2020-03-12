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
                                <a href="modules/AuthenticationModule.html" data-type="entity-link">AuthenticationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CardModule.html" data-type="entity-link">CardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CardModule-aa4f660d922138dc5e094cdd28ac6843"' : 'data-target="#xs-components-links-module-CardModule-aa4f660d922138dc5e094cdd28ac6843"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CardModule-aa4f660d922138dc5e094cdd28ac6843"' :
                                            'id="xs-components-links-module-CardModule-aa4f660d922138dc5e094cdd28ac6843"' }>
                                            <li class="link">
                                                <a href="components/ForgottenPasswordCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForgottenPasswordCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistrationCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegistrationCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CovalentModule.html" data-type="entity-link">CovalentModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PanelModule.html" data-type="entity-link">PanelModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PanelModule-da5e4cb85713eb67b9b2ba27c0f15081"' : 'data-target="#xs-components-links-module-PanelModule-da5e4cb85713eb67b9b2ba27c0f15081"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PanelModule-da5e4cb85713eb67b9b2ba27c0f15081"' :
                                            'id="xs-components-links-module-PanelModule-da5e4cb85713eb67b9b2ba27c0f15081"' }>
                                            <li class="link">
                                                <a href="components/PanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PanelComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SignUpModule.html" data-type="entity-link">SignUpModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SignUpModule-e65f2f5e095820a7eb109b0fca5d642f"' : 'data-target="#xs-injectables-links-module-SignUpModule-e65f2f5e095820a7eb109b0fca5d642f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SignUpModule-e65f2f5e095820a7eb109b0fca5d642f"' :
                                        'id="xs-injectables-links-module-SignUpModule-e65f2f5e095820a7eb109b0fca5d642f"' }>
                                        <li class="link">
                                            <a href="injectables/SignUpService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SignUpService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ToolbarModule.html" data-type="entity-link">ToolbarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ToolbarModule-5eeb6e05126abdb8bc23112a8c485d39"' : 'data-target="#xs-components-links-module-ToolbarModule-5eeb6e05126abdb8bc23112a8c485d39"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ToolbarModule-5eeb6e05126abdb8bc23112a8c485d39"' :
                                            'id="xs-components-links-module-ToolbarModule-5eeb6e05126abdb8bc23112a8c485d39"' }>
                                            <li class="link">
                                                <a href="components/ToolbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToolbarComponent</a>
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
                                <a href="classes/AbstractCard.html" data-type="entity-link">AbstractCard</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractLoggerService.html" data-type="entity-link">AbstractLoggerService</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthenticationMethodService.html" data-type="entity-link">AuthenticationMethodService</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfigurationService.html" data-type="entity-link">ConfigurationService</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConsoleLogPublisher.html" data-type="entity-link">ConsoleLogPublisher</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocalStorageLogPublisher.html" data-type="entity-link">LocalStorageLogPublisher</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogEntry.html" data-type="entity-link">LogEntry</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogPublisher.html" data-type="entity-link">LogPublisher</a>
                            </li>
                            <li class="link">
                                <a href="classes/NullStorage.html" data-type="entity-link">NullStorage</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserTransformer.html" data-type="entity-link">UserTransformer</a>
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
                                    <a href="injectables/AuthenticationEffects.html" data-type="entity-link">AuthenticationEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BasicAuthenticationService.html" data-type="entity-link">BasicAuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link">LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogPublisherService.html" data-type="entity-link">LogPublisherService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NullAuthenticationService.html" data-type="entity-link">NullAuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SelectLanguageService.html" data-type="entity-link">SelectLanguageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionService.html" data-type="entity-link">SessionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SignUpService.html" data-type="entity-link">SignUpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserEffects.html" data-type="entity-link">UserEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
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
                                <a href="interceptors/AuthenticationInterceptor.html" data-type="entity-link">AuthenticationInterceptor</a>
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
                                <a href="guards/AuthenticationGuardService.html" data-type="entity-link">AuthenticationGuardService</a>
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
                                <a href="interfaces/Authority.html" data-type="entity-link">Authority</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthState.html" data-type="entity-link">AuthState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Credentials.html" data-type="entity-link">Credentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LogEntryConfiguration.html" data-type="entity-link">LogEntryConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoggerConfiguration.html" data-type="entity-link">LoggerConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProcessRole.html" data-type="entity-link">ProcessRole</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProjectInfo.html" data-type="entity-link">ProjectInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Role.html" data-type="entity-link">Role</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State.html" data-type="entity-link">State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Transformer.html" data-type="entity-link">Transformer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserProcessRole.html" data-type="entity-link">UserProcessRole</a>
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