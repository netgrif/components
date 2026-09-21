import {TaskAssignee} from './task-assignee';
import {OperatorService} from '../../../operator-service/operator.service';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {TestBed, waitForAsync} from '@angular/core/testing';
import {Observable, of, ReplaySubject} from 'rxjs';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {Net} from '../../../../process/net';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';
import {Equals} from '../../operator/equals';
import {mockUserAutocompleteValue} from '../../../../utility/tests/mocks/mock-user-autocomplete-value';
import {SimpleExpression} from "../../../../pfql/model/simple-expression";
import {Page} from "../../../../resources/interface/page";
import {UserResource} from "../../../../resources/interface/user-resource";
import {createMockPage} from "../../../../utility/tests/utility/create-mock-page";
import {UserResourceService} from "../../../../resources/engine-endpoint/user-resource.service";

describe('TaskAssignee', () => {
    let operatorService: OperatorService;
    let userResourceService: MockUserResourceService;
    let category: TaskAssignee;
    let allowedNets$: ReplaySubject<Array<Net>>;

    beforeAll(() => {
        operatorService = new OperatorService(new OperatorResolverService());
        userResourceService = new MockUserResourceService();
    });

    beforeEach(waitForAsync(async () => {
        allowedNets$ = new ReplaySubject<Array<Net>>(1);
        allowedNets$.next([]);
        category = await new TaskAssignee(operatorService, null, createMockDependencies(allowedNets$,
            operatorService, userResourceService as unknown as UserResourceService));
    }));

    afterEach(() => {
        allowedNets$.complete();
        category.destroy();
        TestBed.resetTestingModule();
    });

    it('should create an instance', () => {
        expect(category).toBeTruthy();
    });

    it('should select default operator', () => {
        expect(category.isOperatorSelected()).toBeFalse();
        category.selectDefaultOperator();
        expect(category.isOperatorSelected()).toBeTrue();
    });

    it('should load pfql expression', (done) => {
        configureCategory(category, operatorService, Equals, [mockUserAutocompleteValue('Test User', true, 'userId')]);

        const loadedCategory = new TaskAssignee(operatorService, null, createMockDependencies(allowedNets$,
            operatorService, userResourceService as unknown as UserResourceService));
        const expression = new SimpleExpression(new Equals(), mockUserAutocompleteValue('Test User', true, 'userId'), category);
        loadedCategory.loadFromPfqlExpression(expression).subscribe(() => {
            expect(loadedCategory.isOperatorSelected()).toBeTrue();
            expect(loadedCategory.providesPredicate).toBeTrue();

            expect((loadedCategory as any)._operandsFormControls[0].value).toEqual((category as any)._operandsFormControls[0].value);

            done();
        });
    });

    it('should generate pfql query', () => {
        configureCategory(category, operatorService, Equals, [mockUserAutocompleteValue('Test User', true, 'userId')]);
        let predicate = category.generatePredicate(['userId']);
        expect(predicate.query.value.includes(`tasks: userId eq 'userId'`)).toBeTrue();
    });
})

class MockUserResourceService {

    public search(): Observable<Page<UserResource>> {
        return of(createMockPage([{
            name: 'Test',
            surname: 'User',
            id: 'userId',
            email: 'Test User',
            fullName: `Test User`,
            groups: [],
            authorities: [],
            nextGroups: [],
            processRoles: []
        }]));
    }

    public getUser(userId: string): Observable<UserResource> {
        return of({
            name: 'Test',
            surname: 'User',
            id: 'userId',
            email: 'Test User',
            fullName: `Test User`,
            groups: [],
            authorities: [],
            nextGroups: [],
            processRoles: []
        });
    }
}
