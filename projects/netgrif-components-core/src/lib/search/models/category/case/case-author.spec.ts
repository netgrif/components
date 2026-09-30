import {CaseAuthor} from './case-author';
import {OperatorService} from '../../../operator-service/operator.service';
import {OperatorResolverService} from '../../../operator-service/operator-resolver.service';
import {Equals} from '../../operator/equals';
import {configureCategory} from '../../../../utility/tests/utility/configure-category';
import {createMockDependencies} from '../../../../utility/tests/search-category-mock-dependencies';
import {mockUserAutocompleteValue} from '../../../../utility/tests/mocks/mock-user-autocomplete-value';
import {TestBed} from '@angular/core/testing';
import {SimpleExpression} from "../../../../pfql/model/simple-expression";
import {Observable, of} from "rxjs";
import {Page} from "../../../../resources/interface/page";
import {UserResource} from "../../../../resources/interface/user-resource";
import {createMockPage} from "../../../../utility/tests/utility/create-mock-page";
import {UserResourceService} from "../../../../resources/engine-endpoint/user-resource.service";

describe('CaseAuthor', () => {
    let category: CaseAuthor;
    let operatorService: OperatorService;
    let userResourceService: MockUserResourceService;

    beforeEach(() => {
        operatorService = new OperatorService(new OperatorResolverService());
        userResourceService = new MockUserResourceService();
        category = new CaseAuthor(operatorService, null, createMockDependencies(undefined, operatorService,
            userResourceService as unknown as UserResourceService));
    });

    afterEach(() => {
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

        const loadedCategory = new CaseAuthor(operatorService, null, createMockDependencies(undefined,
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
        const predicate = category.generatePredicate([['userId']]);
        expect(predicate.query.value).toEqual(`cases: author eq 'userId'`);
    });
});


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
