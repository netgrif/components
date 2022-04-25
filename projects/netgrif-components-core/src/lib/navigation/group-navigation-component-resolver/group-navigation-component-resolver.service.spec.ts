import {TestBed} from '@angular/core/testing';
import {GroupNavigationComponentResolverService} from './group-navigation-component-resolver.service';
import {Component, Injectable, Type} from '@angular/core';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {LoggerService} from '../../logger/services/logger.service';
import {TestMockDependenciesModule} from '../../utility/tests/test-mock-dependencies.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GroupNavigationComponentResolverService', () => {
    let service: GroupNavigationComponentResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                HttpClientTestingModule,
                TestMockDependenciesModule
            ],
            providers: [
                {provide: GroupNavigationComponentResolverService, useClass: TestGroupNavigationComponentResolverService}
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
    selector: 'nae-test-portal',
    template: ''
})
class TestPortalComponent {
    constructor() {
    }
}

@Injectable()
export class TestGroupNavigationComponentResolverService extends GroupNavigationComponentResolverService {

    constructor(taskResourceService: TaskResourceService,
                log: LoggerService) {
        super(taskResourceService, log);
    }

    protected resolveViewComponent(navigationItemTaskData: any): Type<any> {
        return TestPortalComponent;
    }
}
