import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoggerService } from '../../logger/services/logger.service';
import { PathService } from '../service/path.service';
import { CaseResourceService } from '../../resources/engine-endpoint/case-resource.service';
import { ActivatedRoute } from '@angular/router';
import { DynamicNavigationRouteProviderService } from '../../routing/dynamic-navigation-route-provider/dynamic-navigation-route-provider.service';
import { TranslateService } from '@ngx-translate/core';
import {AbstractBreadcrumbsComponent} from "./abstract-breadcrumbs.component";

class TestBreadcrumbsComponent extends AbstractBreadcrumbsComponent {
    constructor(
        pathService,
        caseResourceService,
        activatedRoute,
        router,
        dynamicRoutingService,
        translateService,
        logger
    ) {
        super(
            pathService,
            caseResourceService,
            activatedRoute,
            router,
            dynamicRoutingService,
            translateService,
            logger
        );
    }
    public setRedirectUrls(map: Map<string, Array<string>>) {
        (this as any).redirectUrls = map;
    }
}


describe('AbstractBreadcrumbsComponent', () => {
    let component: TestBreadcrumbsComponent;
    let mockRouter: any;
    let mockPathService: any;
    let mockLogger: any;

    beforeEach(() => {
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);
        mockRouter.navigate.and.returnValue(Promise.resolve(true));

        mockPathService = {
            activePath: '/test',
            splitPath: jasmine.createSpy('splitPath').and.returnValue(['', 'test']),
            reset: jasmine.createSpy('reset')
        };
        mockLogger = jasmine.createSpyObj('LoggerService', ['error']);
        const mockCaseResourceService = { searchCases: jasmine.createSpy('searchCases') };
        const mockActivatedRoute = { snapshot: { params: { filterCaseId: 'filter1' } } };
        const mockDynamicRoutingService = { route: '/dummy-route' };
        const mockTranslateService = { currentLang: 'en-US' };

        TestBed.configureTestingModule({
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: PathService, useValue: mockPathService },
                { provide: LoggerService, useValue: mockLogger },
                { provide: CaseResourceService, useValue: mockCaseResourceService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: DynamicNavigationRouteProviderService, useValue: mockDynamicRoutingService },
                { provide: TranslateService, useValue: mockTranslateService },
            ]
        });

        component = new TestBreadcrumbsComponent(
            TestBed.inject(PathService),
            TestBed.inject(CaseResourceService),
            TestBed.inject(ActivatedRoute),
            TestBed.inject(Router),
            TestBed.inject(DynamicNavigationRouteProviderService),
            TestBed.inject(TranslateService),
            TestBed.inject(LoggerService)
        );

        component.setRedirectUrls(new Map());
        component.redirectOnClick = true;
    });


    it('should navigate to target if redirect target exists', () => {
        component.setRedirectUrls(new Map([['/test', ['/somewhere']]]));
        component.redirect();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/somewhere']);
        expect(mockLogger.error).not.toHaveBeenCalled();
    });

    it('should log error if redirect target does not exist', () => {
        component.setRedirectUrls(new Map());
        component.redirect();
        expect(mockRouter.navigate).not.toHaveBeenCalled();
        expect(mockLogger.error).toHaveBeenCalledWith("Missing required data for redirecting breadcrumbs.");
    });

    it('should not navigate if redirectOnClick is false', () => {
        component.redirectOnClick = false;
        component.setRedirectUrls(new Map([['/test', ['/somewhere']]]));
        component.redirect();
        expect(mockRouter.navigate).not.toHaveBeenCalled();
        expect(mockLogger.error).not.toHaveBeenCalled();
    });
});
