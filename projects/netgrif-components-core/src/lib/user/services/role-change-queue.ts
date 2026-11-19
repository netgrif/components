import {defer, forkJoin, Observable, of, ReplaySubject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {MessageResource} from '../../resources/interface/message-resource';

/** an item of the role assignment (a user, an LDAP group) with its roles */
export interface RoleChangeTarget {
    roles: Set<string>;
}

/**
 * Changes of the roles of the role assignment (users, LDAP groups). The engine replaces all roles of an item with the
 * sent ones, so:
 * - a change is applied to the roles of the items right away (the next change, e.g. a quick second click, is computed
 *   from them and does not drop the previous one),
 * - the requests are sent one after another in the order of the changes (a later request never overtakes an earlier one),
 * - a change refused by the engine or failed (an HTTP error) is reverted on the items and reported in a snack bar,
 * - the progress indicator is on while any change is being sent.
 */
export class RoleChangeQueue {

    protected _last: Promise<void> = Promise.resolve();
    protected _pending = 0;
    /** the roles of the items confirmed by the engine while changes of them are pending */
    protected _confirmed = new WeakMap<RoleChangeTarget, {roles: Set<string>, pending: number}>();

    constructor(protected _progress: LoadingEmitter,
                protected _log: LoggerService,
                protected _snackbar: SnackBarService,
                protected _translate: TranslateService) {
    }

    /**
     * Adds the roles to / removes them from each of the items, the other roles of the items stay.
     * @param items the items to change
     * @param roleIds the roles to add or remove
     * @param add `true` adds the roles, `false` removes them
     * @param request sends all roles of an item (the roles with the change)
     * @returns the messages of the engine once the change is processed (empty when nothing changed or the request failed);
     * the observable never errors
     */
    public change<T extends RoleChangeTarget>(items: Array<T>, roleIds: Array<string>, add: boolean,
                                              request: (item: T, roles: Array<string>) => Observable<MessageResource>)
        : Observable<Array<MessageResource>> {
        const changes = (items ?? []).map(item => {
            const changed = roleIds.filter(id => add ? !item.roles.has(id) : item.roles.has(id));
            return {item, changed};
        }).filter(change => change.changed.length > 0);
        if (changes.length === 0) {
            return of([]);
        }
        changes.forEach(change => {
            const state = this._confirmed.get(change.item) ?? {roles: new Set<string>(change.item.roles), pending: 0};
            state.pending++;
            this._confirmed.set(change.item, state);
            change.item.roles = this.applyChange(change.item.roles, change.changed, add);
        });
        this._pending++;
        this._progress.on();
        const result = new ReplaySubject<Array<MessageResource>>(1);
        this._last = this._last.then(() => new Promise<void>(resolve => {
            const sends = changes.map(change => ({
                change,
                roles: this.applyChange(this._confirmed.get(change.item).roles, change.changed, add)
            }));
            forkJoin(sends.map(send => defer(() => request(send.change.item, [...send.roles])).pipe(
                catchError(error => {
                    this._log.error('Changing the roles failed', error);
                    return of({error: this._translate.instant('tasks.snackbar.rolesFailAssign')} as MessageResource);
                })
            ))).subscribe(messages => {
                let failed = false;
                messages.forEach((message, idx) => {
                    const send = sends[idx];
                    const state = this._confirmed.get(send.change.item);
                    if (message?.error) {
                        failed = true;
                        this._log.error(message.error, message);
                        this._snackbar.openErrorSnackBar(message.error);
                        send.change.item.roles = this.applyChange(send.change.item.roles, send.change.changed, !add);
                    } else {
                        this._log.info(message?.success);
                        state.roles = send.roles;
                    }
                    state.pending--;
                    if (state.pending === 0) {
                        this._confirmed.delete(send.change.item);
                    }
                });
                if (!failed) {
                    this._snackbar.openSuccessSnackBar(this._translate.instant('tasks.snackbar.rolesSuccessAssign'));
                }
                this._pending--;
                if (this._pending === 0) {
                    this._progress.off();
                }
                result.next(messages);
                result.complete();
                resolve();
            });
        })).catch(error => {
            this._log.error('Changing the roles failed', error);
        });
        return result.asObservable();
    }

    protected applyChange(roles: Set<string>, roleIds: Array<string>, add: boolean): Set<string> {
        const next = new Set<string>(roles);
        roleIds.forEach(id => add ? next.add(id) : next.delete(id));
        return next;
    }
}
