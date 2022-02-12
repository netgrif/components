import {BehaviorSubject} from 'rxjs';

export class LoadingEmitter extends BehaviorSubject<boolean> {

    constructor(initial = false) {
        super(initial);
    }

    public get isActive(): boolean {
        return this.getValue();
    }

    public on() {
        this.next(true);
    }

    public off() {
        this.next(false);
    }

    public toggle() {
        this.next(!this.getValue());
    }
}
