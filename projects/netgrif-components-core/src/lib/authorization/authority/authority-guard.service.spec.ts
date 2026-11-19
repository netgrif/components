import {fakeAsync, tick} from '@angular/core/testing';
import {Observable, Subject} from 'rxjs';
import {AuthorityGuardService} from './authority-guard.service';

describe('AuthorityGuardService', () => {
    const view = {access: {authority: ['ROLE_ADMIN']}};
    let user$: Subject<any>;
    let userService: any;
    let guard: AuthorityGuardService;
    const loginTree = {login: true};

    beforeEach(() => {
        user$ = new Subject<any>();
        userService = {
            user: undefined,
            user$,
            isUserEmpty: (user: any) => !user || !user.id,
            hasAuthority: (authority: Array<string>) => authority.includes('ROLE_ADMIN')
        };
        guard = new AuthorityGuardService(
            {resolveLoginPath: () => 'login'} as any,
            userService,
            {getViewByUrl: () => view} as any,
            {parseUrl: () => loginTree} as any
        );
    });

    it('decides at once when the user is loaded', () => {
        userService.user = {id: '1'};
        expect(guard.canActivate({} as any, {url: '/processes'} as any)).toBeTrue();
    });

    it('waits for the user loaded after a reload of the page', fakeAsync(() => {
        let result: any;
        (guard.canActivate({} as any, {url: '/processes'} as any) as Observable<any>).subscribe(r => result = r);
        expect(result).toBeUndefined();
        user$.next({id: '1'});
        expect(result).toBeTrue();
    }));

    it('leads to the login when the user cannot be loaded', fakeAsync(() => {
        let result: any;
        (guard.canActivate({} as any, {url: '/processes'} as any) as Observable<any>).subscribe(r => result = r);
        tick(AuthorityGuardService.USER_LOAD_TIMEOUT + 1);
        expect(result).toBe(loginTree);
    }));
});
