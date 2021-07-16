import {Subject} from 'rxjs';

export class AfterAction extends Subject<boolean> {

    /**
     * Emits the `resolution` and completes.
     * @param resolution
     */
    public resolve(resolution: boolean) {
        this.next(resolution);
        this.complete();
    }
}
