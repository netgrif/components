import {TestBed, waitForAsync} from '@angular/core/testing';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@ngbracket/ngx-layout';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PermissionService} from './permission.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MockUserService} from '../../utility/tests/mocks/mock-user.service';
import {UserService} from '../../user/services/user.service';
import {User} from '../../user/models/user';
import {AssignPolicy, DataFocusPolicy, FinishPolicy} from '../../task-content/model/policy';
import {PermissionType} from '../../process/permissions';
import {Net} from '../../process/net';

describe('PermissionService', () => {
    let permissionService: PermissionService;
    let userService: UserService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                CommonModule,
                FlexModule,
                NoopAnimationsModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            providers: [
                PermissionService,
                {provide: UserService, useClass: MockUserService},
            ],
            declarations: [],
            schemas: [NO_ERRORS_SCHEMA]
        });
        permissionService = TestBed.inject(PermissionService);
        userService = TestBed.inject(UserService);
    }));

    it('should canAssign be true with role', () => {
        (userService as unknown as MockUserService).user =
            new User('', '', '', '', [], [{stringId: 'assignRole', name: '', importId: ''}]);
        const task = {
            caseId: 'string',
            transitionId: 'string',
            title: 'string',
            caseColor: 'string',
            caseTitle: 'string',
            user: undefined,
            roles: {
                assignRole: {
                    assign: true
                }
            },
            startDate: undefined,
            finishDate: undefined,
            assignPolicy: AssignPolicy.manual,
            dataFocusPolicy: DataFocusPolicy.manual,
            finishPolicy: FinishPolicy.manual,
            stringId: 'string',
            layout: {
                offset: 0,
                cols: undefined,
                rows: undefined
            },
            dataGroups: [],
            _links: {},
            users: {},
            userRefs: {}
        };
        expect(permissionService.canAssign(task)).toBeTrue();
    });

    it('should canAssign be false with role', () => {
        (userService as unknown as MockUserService).user =
            new User('', '', '', '', [], [{stringId: 'assignRole', name: '', importId: ''}]);
        const task = {
            caseId: 'string',
            transitionId: 'string',
            title: 'string',
            caseColor: 'string',
            caseTitle: 'string',
            user: undefined,
            roles: {
                assignRole: {
                    assign: false
                }
            },
            startDate: undefined,
            finishDate: undefined,
            assignPolicy: AssignPolicy.manual,
            dataFocusPolicy: DataFocusPolicy.manual,
            finishPolicy: FinishPolicy.manual,
            stringId: 'string',
            layout: {
                offset: 0,
                cols: undefined,
                rows: undefined
            },
            dataGroups: [],
            _links: {},
            users: {},
            userRefs: {}
        };
        expect(permissionService.canAssign(task)).toBeFalse();
    });

    it('should canAssign be true with userRef', () => {
        (userService as unknown as MockUserService).user =
            new User('user123', '', '', '', [], [{stringId: 'assignRole', name: '', importId: ''}]);
        const task = {
            caseId: 'string',
            transitionId: 'string',
            title: 'string',
            caseColor: 'string',
            caseTitle: 'string',
            user: undefined,
            roles: {},
            startDate: undefined,
            finishDate: undefined,
            assignPolicy: AssignPolicy.manual,
            dataFocusPolicy: DataFocusPolicy.manual,
            finishPolicy: FinishPolicy.manual,
            stringId: 'string',
            layout: {
                offset: 0,
                cols: undefined,
                rows: undefined
            },
            dataGroups: [],
            _links: {},
            users: {
                user123: {
                    assign: true
                }
            },
            userRefs: {
                userList1: {
                    assign: true
                }
            }
        };
        expect(permissionService.canAssign(task)).toBeTrue();
    });

    it('should canAssign be false with userRef', () => {
        (userService as unknown as MockUserService).user =
            new User('', '', '', '', [], [{stringId: 'assignRole', name: '', importId: ''}]);
        const task = {
            caseId: 'string',
            transitionId: 'string',
            title: 'string',
            caseColor: 'string',
            caseTitle: 'string',
            user: undefined,
            roles: {},
            startDate: undefined,
            finishDate: undefined,
            assignPolicy: AssignPolicy.manual,
            dataFocusPolicy: DataFocusPolicy.manual,
            finishPolicy: FinishPolicy.manual,
            stringId: 'string',
            layout: {
                offset: 0,
                cols: undefined,
                rows: undefined
            },
            dataGroups: [],
            _links: {},
            users: {},
            userRefs: {
                userList1: {
                    assign: true
                }
            }
        };
        expect(permissionService.canAssign(task)).toBeFalse();
    });

    it('should canDelete', () => {
        (userService as unknown as MockUserService).user =
            new User('', '', '', '', [], [{stringId: 'deleteRole', name: '', importId: ''}]);
        const case_ = {
            stringId: 'string',
            title: 'string',
            author: {email: 'email', fullName: 'fullName'},
            permissions: {
                deleteRole: {
                    delete: true
                }
            },
            users: {},
            color: 'color',
            creationDate: [],
            lastModified: [],
            visualId: '',
            resetArcTokens: {},
            processIdentifier: '',
            petriNetId: '',
            petriNetObjectId: {
                counter: 0,
                date: 0,
                machineIdentifier: 0,
                processIdentifier: 0,
                time: 0,
                timeSecond: 0,
                timestamp: 0
            },
            immediateData: [
                {stringId: 'date', title: 'string', type: 'date', value: [2020, 1, 1, 10, 10]},
                {stringId: 'string', title: 'string', type: 'string', value: 'dasdsadsad'},
                {stringId: 'dateTime', title: 'string', type: 'dateTime', value: [2020, 1, 1, 10, 10]},
                {stringId: 'enum', title: 'string', type: 'enumeration', value: {defaultValue: 'dasd'}},
            ]
        };
        expect(permissionService.hasCasePermission(case_, PermissionType.DELETE)).toBeTrue();
    });

    it('should canDelete be false', () => {
        (userService as unknown as MockUserService).user =
            new User('', '', '', '', [], [{stringId: 'deleteRole', name: '', importId: ''}]);
        const case_ = {
            stringId: 'string',
            title: 'string',
            author: {email: 'email', fullName: 'fullName'},
            permissions: {
                deleteRole: {
                    delete: false
                }
            },
            users: {},
            color: 'color',
            creationDate: [],
            lastModified: [],
            visualId: '',
            resetArcTokens: {},
            processIdentifier: '',
            petriNetId: '',
            petriNetObjectId: {
                counter: 0,
                date: 0,
                machineIdentifier: 0,
                processIdentifier: 0,
                time: 0,
                timeSecond: 0,
                timestamp: 0
            },
            immediateData: [
                {stringId: 'date', title: 'string', type: 'date', value: [2020, 1, 1, 10, 10]},
                {stringId: 'string', title: 'string', type: 'string', value: 'dasdsadsad'},
                {stringId: 'dateTime', title: 'string', type: 'dateTime', value: [2020, 1, 1, 10, 10]},
                {stringId: 'enum', title: 'string', type: 'enumeration', value: {defaultValue: 'dasd'}},
            ]
        };
        expect(permissionService.hasCasePermission(case_, PermissionType.DELEGATE)).toBeFalse();
    });

    it('should test hasNetPermission', () => {
        const net = new Net({
            identifier: '',
            uriNodeId: '',
            stringId: '',
            immediateData: [],
            author: {email: '', fullName: ''},
            createdDate: [],
            defaultCaseName: '',
            initials: '',
            version: '',
            title: ''
        });
        net.permissions = {};
        expect(permissionService.hasNetPermission(PermissionType.CREATE, net)).toBeFalse();

        (userService as unknown as MockUserService).user =
            new User('', '', '', '', [], [{stringId: 'role1', name: '', importId: ''}]);
        net.permissions = {role1: {create: true}};
        expect(permissionService.hasNetPermission(PermissionType.CREATE, net)).toBeTrue();

        net.permissions = {role1: {create: false}};
        expect(permissionService.hasNetPermission(PermissionType.CREATE, net)).toBeFalse();

        net.permissions = {role1: {view: true}};
        expect(permissionService.hasNetPermission(PermissionType.CREATE, net)).toBeFalse();

        (userService as unknown as MockUserService).user =
            new User('', '', '', '', [],
                [{stringId: 'role1', name: '', importId: ''}, {stringId: 'role2', name: '', importId: ''}]);
        net.permissions = {role1: {create: false}, role2: {create: true}};
        expect(permissionService.hasNetPermission(PermissionType.CREATE, net)).toBeFalse();
    });


    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
