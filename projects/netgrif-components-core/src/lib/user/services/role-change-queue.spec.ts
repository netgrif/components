import {Observable, of, Subject, throwError} from 'rxjs';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {MessageResource} from '../../resources/interface/message-resource';
import {RoleChangeQueue, RoleChangeTarget} from './role-change-queue';

describe('RoleChangeQueue', () => {

    let progress: LoadingEmitter;
    let queue: RoleChangeQueue;
    let snacks: Array<string>;

    beforeEach(() => {
        progress = new LoadingEmitter();
        snacks = [];
        queue = new RoleChangeQueue(progress,
            {error: () => {}, info: () => {}} as any,
            {openErrorSnackBar: (m: string) => snacks.push('error ' + m), openSuccessSnackBar: (m: string) => snacks.push('ok ' + m)} as any,
            {instant: (key: string) => key} as any);
    });

    const item = (...roles: Array<string>): RoleChangeTarget => ({roles: new Set(roles)});

    it('a failed change reverts only the roles it changed, the roles the item had stay', async () => {
        const user = item('A');
        await new Promise<void>(resolve => queue.change([user], ['A', 'B'], true, () => throwError(() => new Error('500')))
            .subscribe({complete: resolve}));
        expect([...user.roles]).toEqual(['A']);
        expect(progress.value).toBeFalse();
        expect(snacks).toEqual(['error tasks.snackbar.rolesFailAssign']);
    });

    it('a change refused by the engine reverts the changed roles of that item only', async () => {
        const user = item('A');
        await new Promise<void>(resolve => queue.change([user], ['B'], true, () => of({error: 'refused'} as MessageResource))
            .subscribe({complete: resolve}));
        expect([...user.roles]).toEqual(['A']);
    });

    it('a second change sent before the answer of the first one keeps the first role', async () => {
        const user = item();
        const bodies: Array<Array<string>> = [];
        const answers: Array<Subject<MessageResource>> = [];
        const request = (_: RoleChangeTarget, roles: Array<string>): Observable<MessageResource> => {
            bodies.push(roles);
            const answer = new Subject<MessageResource>();
            answers.push(answer);
            return answer;
        };
        const first = new Promise<void>(resolve => queue.change([user], ['A'], true, request).subscribe({complete: resolve}));
        const second = new Promise<void>(resolve => queue.change([user], ['B'], true, request).subscribe({complete: resolve}));
        // the requests go one after another
        await Promise.resolve();
        expect(bodies.length).toBe(1);
        answers[0].next({success: 'ok'} as MessageResource);
        answers[0].complete();
        await first;
        await new Promise(resolve => setTimeout(resolve));
        expect(bodies.length).toBe(2);
        expect(bodies[1].sort()).toEqual(['A', 'B']);
        answers[1].next({success: 'ok'} as MessageResource);
        answers[1].complete();
        await second;
        expect([...user.roles].sort()).toEqual(['A', 'B']);
        expect(progress.value).toBeFalse();
    });

    it('a failed first change is not sent again by a second change queued before its answer', async () => {
        const user = item();
        const bodies: Array<Array<string>> = [];
        const answers: Array<Subject<MessageResource>> = [];
        const request = (_: RoleChangeTarget, roles: Array<string>): Observable<MessageResource> => {
            bodies.push([...roles].sort());
            const answer = new Subject<MessageResource>();
            answers.push(answer);
            return answer;
        };
        const first = new Promise<void>(resolve => queue.change([user], ['A'], true, request).subscribe({complete: resolve}));
        const second = new Promise<void>(resolve => queue.change([user], ['B'], true, request).subscribe({complete: resolve}));
        await Promise.resolve();
        answers[0].error(new Error('500'));
        await first;
        await new Promise(resolve => setTimeout(resolve));
        // the second request: the confirmed roles (none) with B, without the failed A
        expect(bodies[1]).toEqual(['B']);
        answers[1].next({success: 'ok'} as MessageResource);
        answers[1].complete();
        await second;
        expect([...user.roles]).toEqual(['B']);
    });

    it('a failed item reverts only itself, the other items keep the saved change', async () => {
        const users = [item(), item(), item()];
        let call = 0;
        await new Promise<void>(resolve => queue.change(users, ['A'], true,
            () => ++call === 3 ? throwError(() => new Error('500')) : of({success: 'ok'} as MessageResource))
            .subscribe({complete: resolve}));
        expect(users.map(u => [...u.roles])).toEqual([['A'], ['A'], []]);
        expect(progress.value).toBeFalse();
    });
});
