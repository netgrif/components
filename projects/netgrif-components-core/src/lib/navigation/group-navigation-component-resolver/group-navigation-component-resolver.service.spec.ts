import {TestBed} from '@angular/core/testing';
import {GroupNavigationComponentResolverService} from './group-navigation-component-resolver.service';
import {Component, Injectable, Type, ChangeDetectionStrategy} from '@angular/core';
import {LoggerService} from '../../logger/services/logger.service';
import {TestMockDependenciesModule} from '../../utility/tests/test-mock-dependencies.module';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TaskResourceService} from "../../resources/engine-endpoint/task-resource.service";
import {CaseResourceService} from "../../resources/engine-endpoint/case-resource.service";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('GroupNavigationComponentResolverService', () => {
    let service: GroupNavigationComponentResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TestMockDependenciesModule
            ],
            providers: [
                {provide: GroupNavigationComponentResolverService, useClass: TestGroupNavigationComponentResolverService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ]
        });
        service = TestBed.inject(GroupNavigationComponentResolverService);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

@Component({
    selector: 'ncc-test-portal',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestPortalComponent {
    constructor() {
    }
}

@Injectable()
export class TestGroupNavigationComponentResolverService extends GroupNavigationComponentResolverService {

    constructor(
        taskResourceService: TaskResourceService,
        caseResourceService: CaseResourceService,
        log: LoggerService) {
        super(taskResourceService, caseResourceService, log);
    }

    protected resolveViewComponent(navigationItemTaskData: any): Type<any> {
        return TestPortalComponent;
    }
}
