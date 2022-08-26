import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material/material.module';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {Component, Injectable} from '@angular/core';
import {AbstractNavigationTreeComponent} from './abstract-navigation-tree.component';
import {Router} from '@angular/router';
import {LoggerService} from '../../logger/services/logger.service';
import {UserService} from '../../user/services/user.service';
import {RoleGuardService} from '../../authorization/role/role-guard.service';
import {AuthorityGuardService} from '../../authorization/authority/authority-guard.service';
import {AuthenticationModule} from '../../authentication/authentication.module';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {Views} from '../../../commons/schema';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {UserTransformer} from '../../authentication/models/user.transformer';
import {SessionService} from '../../authentication/session/services/session.service';
import {User} from '../../user/models/user';
import {AnonymousService} from '../../authentication/anonymous/anonymous.service';
import {GroupGuardService} from '../../authorization/group/group-guard.service';
import {ActiveGroupService} from '../../groups/services/active-group.service';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {LanguageService} from '../../translate/language.service';
import {
    DynamicNavigationRouteProviderService
} from '../../routing/dynamic-navigation-route-provider/dynamic-navigation-route-provider.service';
import {AccessService} from "../../authorization/permission/access.service";

describe('AbstractNavigationTreeComponent', () => {
    let component: TestTreeComponent;
    let fixture: ComponentFixture<TestTreeComponent>;
    let configService: ConfigurableTestConfigurationService;
    let userService: TestUserService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestTreeComponent],
            providers: [
                ConfigurableTestConfigurationService,
                TestUserService,
                {provide: ConfigurationService, useExisting: ConfigurableTestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: UserService, useExisting: TestUserService}
            ],
            imports: [
                CommonModule,
                MaterialModule,
                FlexModule,
                FlexLayoutModule,
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule,
                TranslateLibModule,
                NoopAnimationsModule,
                AuthenticationModule,
            ]
        }).compileComponents();
        configService = TestBed.inject(ConfigurableTestConfigurationService);
        userService = TestBed.inject(TestUserService);
    }));

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    function initializeComponent() {
        fixture = TestBed.createComponent(TestTreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    it('should create', () => {
        initializeComponent();
        expect(component).toBeTruthy();
    });

    it('should create navigation nodes', () => {
        configService.setViews({
            one: {
                access: 'public',
                navigation: true,
                routing: {
                    path: 'one'
                }
            },
            two: {
                access: 'public',
                navigation: true,
                routing: {
                    path: ''
                },
                children: {
                    two_one: {
                        access: 'public',
                        navigation: true,
                        routing: {
                            path: 'two'
                        }
                    },
                    two_two: {
                        access: 'public',
                        navigation: true,
                        routing: {
                            path: 'two_two'
                        }
                    }
                }
            }
        });
        initializeComponent();

        expect(component).toBeTruthy();
        expect(component.dataSource).toBeTruthy();
        expect(component.dataSource.data).toBeTruthy();
        expect(Array.isArray(component.dataSource.data)).toBeTrue();
        expect(component.dataSource.data.length === 2).toBeTrue();

        expect(component.dataSource.data[0].name).toEqual('One');
        expect(component.dataSource.data[0].url).toEqual('/one');
        expect(component.dataSource.data[0].children).toBeFalsy();

        expect(component.dataSource.data[1].name).toEqual('');
        expect(component.dataSource.data[1].url).toEqual('');
        expect(component.dataSource.data[1].children).toBeTruthy();
        expect(Array.isArray(component.dataSource.data[1].children)).toBeTrue();
        expect(component.dataSource.data[1].children.length === 2).toBeTrue();

        expect(component.dataSource.data[1].children[0].name).toEqual('Two');
        expect(component.dataSource.data[1].children[0].url).toEqual('/two');
        expect(component.dataSource.data[1].children[0].children).toBeFalsy();

        expect(component.dataSource.data[1].children[1].name).toEqual('Two two');
        expect(component.dataSource.data[1].children[1].url).toEqual('/two_two');
        expect(component.dataSource.data[1].children[1].children).toBeFalsy();
    });

    it('empty user should see only public navigation', () => {
        configService.setViews({
            one: {
                access: 'public',
                navigation: true,
                routing: {
                    path: 'one'
                }
            },
            two: {
                access: 'private',
                navigation: true,
                routing: {
                    path: 'two'
                }
            }
        });
        userService.setUser(new User('', '', '', '', [], []));
        initializeComponent();

        expect(component).toBeTruthy();
        expect(component.dataSource).toBeTruthy();
        expect(component.dataSource.data).toBeTruthy();
        expect(Array.isArray(component.dataSource.data)).toBeTrue();
        expect(component.dataSource.data.length === 1).toBeTrue();

        expect(component.dataSource.data[0].name).toEqual('One');
        expect(component.dataSource.data[0].url).toEqual('/one');
        expect(component.dataSource.data[0].children).toBeFalsy();
    });

    it('navigation should be filtered by role', () => {
        configService.setViews({
            deprecated: {
                access: {
                    role: 'net.name'
                },
                navigation: true,
                routing: {
                    path: 'deprecated'
                }
            },
            object: {
                access: {
                    role: {
                        processId: 'net',
                        roleId: 'id'
                    }
                },
                navigation: true,
                routing: {
                    path: 'object'
                }
            },
            forbidden: {
                access: {
                    role: {
                        processId: 'net2',
                        roleId: 'id'
                    }
                },
                navigation: true,
                routing: {
                    path: 'forbidden'
                }
            },
        });
        userService.setUser(new User('user', '', '', '', [], [{
            stringId: '',
            name: 'name',
            importId: 'id',
            netImportId: 'net'
        }]));
        initializeComponent();

        expect(component).toBeTruthy();
        expect(component.dataSource).toBeTruthy();
        expect(component.dataSource.data).toBeTruthy();
        expect(Array.isArray(component.dataSource.data)).toBeTrue();
        expect(component.dataSource.data.length === 2).toBeTrue();

        expect(component.dataSource.data[0].name).toEqual('Deprecated');
        expect(component.dataSource.data[0].url).toEqual('/deprecated');
        expect(component.dataSource.data[0].children).toBeFalsy();

        expect(component.dataSource.data[1].name).toEqual('Object');
        expect(component.dataSource.data[1].url).toEqual('/object');
        expect(component.dataSource.data[1].children).toBeFalsy();
    });

    it('navigation should be filtered by authority', () => {
        configService.setViews({
            allowed: {
                access: {
                    authority: 'AUTHORITY'
                },
                navigation: true,
                routing: {
                    path: 'allowed'
                }
            },
            forbidden: {
                access: {
                    authority: 'AUTHORITY2'
                },
                navigation: true,
                routing: {
                    path: 'forbidden'
                }
            },
        });
        userService.setUser(new User('user', '', '', '', ['AUTHORITY'], []));
        initializeComponent();

        expect(component).toBeTruthy();
        expect(component.dataSource).toBeTruthy();
        expect(component.dataSource.data).toBeTruthy();
        expect(Array.isArray(component.dataSource.data)).toBeTrue();
        expect(component.dataSource.data.length === 1).toBeTrue();

        expect(component.dataSource.data[0].name).toEqual('Allowed');
        expect(component.dataSource.data[0].url).toEqual('/allowed');
        expect(component.dataSource.data[0].children).toBeFalsy();
    });

    it('complex access navigation should resolve only for non empty user', () => {
        configService.setViews({
            forbidden: {
                access: {
                    authority: 'AUTHORITY'
                },
                navigation: true,
                routing: {
                    path: 'forbidden'
                }
            },
        });
        userService.setUser(new User('', '', '', '', [], []));
        initializeComponent();

        expect(component).toBeTruthy();
        expect(component.dataSource).toBeTruthy();
        expect(component.dataSource.data).toBeTruthy();
        expect(Array.isArray(component.dataSource.data)).toBeTrue();
        expect(component.dataSource.data.length === 0).toBeTrue();
    });

    it('complex access navigation should resolve correctly', () => {
        configService.setViews({
            allowed: {
                access: {
                    role: {
                        processId: 'net',
                        roleId: 'id'
                    },
                    authority: 'AUTHORITY'
                },
                navigation: true,
                routing: {
                    path: 'allowed'
                }
            },
            forbidden1: {
                access: {
                    role: {
                        processId: 'net',
                        roleId: 'id2'
                    },
                    authority: 'AUTHORITY'
                },
                navigation: true,
                routing: {
                    path: 'forbidden1'
                }
            },
            forbidden2: {
                access: {
                    role: {
                        processId: 'net',
                        roleId: 'id'
                    },
                    authority: 'AUTHORITY2'
                },
                navigation: true,
                routing: {
                    path: 'forbidden2'
                }
            }
        });
        userService.setUser(new User('user', '', '', '', ['AUTHORITY'], [{
            stringId: '',
            name: 'name',
            importId: 'id',
            netImportId: 'net'
        }]));
        initializeComponent();

        expect(component).toBeTruthy();
        expect(component.dataSource).toBeTruthy();
        expect(component.dataSource.data).toBeTruthy();
        expect(Array.isArray(component.dataSource.data)).toBeTrue();
        expect(component.dataSource.data.length === 1).toBeTrue();

        expect(component.dataSource.data[0].name).toEqual('Allowed');
        expect(component.dataSource.data[0].url).toEqual('/allowed');
        expect(component.dataSource.data[0].children).toBeFalsy();
    });
});

@Component({
    selector: 'ncc-test-nav-tree',
    template: ''
})
class TestTreeComponent extends AbstractNavigationTreeComponent {
    constructor(config: ConfigurationService,
                router: Router,
                log: LoggerService,
                userService: UserService,
                accessService: AccessService,
                activeGroupService: ActiveGroupService,
                taskResourceService: TaskResourceService,
                languageService: LanguageService,
                navigationRouteProvider: DynamicNavigationRouteProviderService) {
        super(
            config,
            router,
            log,
            userService,
            accessService,
            activeGroupService,
            taskResourceService,
            languageService,
            navigationRouteProvider
        );
    }
}

@Injectable()
class ConfigurableTestConfigurationService extends TestConfigurationService {

    constructor() {
        super();
        this.configuration.views = {};
    }

    setViews(views: Views): void {
        this.configuration.views = views;
    }

}

@Injectable()
class TestUserService extends UserService {

    constructor(authService: AuthenticationService,
                userResource: UserResourceService,
                userTransform: UserTransformer,
                log: LoggerService,
                session: SessionService,
                anonymousService: AnonymousService) {
        super(authService, userResource, userTransform, log, session, anonymousService);
    }

    public setUser(user: User) {
        this._user = user;
        this.publishUserChange();
    }
}
