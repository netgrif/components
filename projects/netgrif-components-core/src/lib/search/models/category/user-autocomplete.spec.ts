import {UserAutocomplete} from './user-autocomplete';
import {createMockDependencies} from '../../../utility/tests/search-category-mock-dependencies';
import {Observable, of} from 'rxjs';
import {Page} from '../../../resources/interface/page';
import {UserResource} from '../../../resources/interface/user-resource';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {IUser} from '../../../user/models/iuser';
import {createMockPage} from '../../../utility/tests/utility/create-mock-page';
import {OptionalDependencies} from '../../category-factory/optional-dependencies';
import {FormControl} from '@angular/forms';
import {TestBed} from '@angular/core/testing';

describe('UserAutocomplete', () => {
    let userResourceService: MockUserResourceService;
    let deps: OptionalDependencies;

    beforeEach(() => {
        userResourceService = new MockUserResourceService();
        deps = createMockDependencies(
            undefined,
            undefined,
            userResourceService as unknown as UserResourceService
        );
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create an instance', () => {
        expect(new UserAutocomplete(deps)).toBeTruthy();
    });

    it('should append ME user if enabled', (done) => {
        const userAutocomplete = new UserAutocomplete(deps, true);
        expect(userAutocomplete).toBeTruthy();

        userResourceService.setResponse([{
            name: 'aaa',
            surname: 'aaa',
            id: '1',
            email: ''
        }]);

        userAutocomplete.filterOptions(of('')).subscribe(options => {
            expect(options.length).toEqual(2);
            expect(options[0].value).toEqual([UserAutocomplete.USER_ME_TEMPLATE]);
            expect(options[1].value).toEqual(['1']);
            done();
        });
    });

    it('should not append ME user if disabled', (done) => {
        const userAutocomplete = new UserAutocomplete(deps, false);
        expect(userAutocomplete).toBeTruthy();

        userResourceService.setResponse([{
            name: 'aaa',
            surname: 'aaa',
            id: '1',
            email: ''
        }]);

        userAutocomplete.filterOptions(of('')).subscribe(options => {
            expect(options.length).toEqual(1);
            expect(options[0].value).toEqual(['1']);
            done();
        });
    });

    it('should serialize value', () => {
        const userAutocomplete = new UserAutocomplete(deps);
        expect(userAutocomplete).toBeTruthy();

        const fc = new FormControl();
        fc.setValue({
            text: 'text',
            value: ['id']
        });

        const serialised = userAutocomplete.serializeOperandValue(fc);
        expect(serialised).toBeTruthy();
        expect(typeof serialised).toBe('object');
        expect(serialised.text).toEqual('text');
        expect(serialised.value).toEqual(['id']);
    });

    it('should deserialize user', (done) => {
        const userAutocomplete = new UserAutocomplete(deps);
        expect(userAutocomplete).toBeTruthy();

        const fc = new FormControl();
        fc.setValue({
            text: 'text',
            value: ['id']
        });

        const serialisedUser = userAutocomplete.serializeOperandValue(fc);

        userAutocomplete.deserializeOperandValue(serialisedUser).subscribe( deserialised => {
            expect(deserialised).toBeTruthy();
            expect(deserialised.text).toBe('text');
            expect(deserialised.value).toEqual(['id']);
            expect(deserialised.icon).toBe(UserAutocomplete.USER_ICON);
            done();
        });

    });

    it('should deserialize user', (done) => {
        const userAutocomplete = new UserAutocomplete(deps);
        expect(userAutocomplete).toBeTruthy();

        const fc = new FormControl();
        fc.setValue({
            text: 'text',
            value: [UserAutocomplete.USER_ME_TEMPLATE]
        });

        const serialisedMe = userAutocomplete.serializeOperandValue(fc);

        userAutocomplete.deserializeOperandValue(serialisedMe).subscribe(deserialised => {
            expect(deserialised).toBeTruthy();
            expect(deserialised.text).toBe('text');
            expect(deserialised.value).toEqual([UserAutocomplete.USER_ME_TEMPLATE]);
            expect(deserialised.icon).toBe(UserAutocomplete.USER_ME_ICON);
            done();
        });

    });
});

class MockUserResourceService {

    private _response: Array<IUser>;

    public setResponse(response: Array<IUser>) {
        this._response = response;
    }

    public search(): Observable<Page<UserResource>> {
        return of(createMockPage(this._response.map( user => ({
            ...user,
            fullName: `${user.name} ${user.surname}`,
            groups: [],
            authorities: [],
            nextGroups: [],
            processRoles: []
        }))));
    }
}
