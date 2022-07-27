import {BehaviorSubject, ReplaySubject} from 'rxjs';

export class TabLabelStream {

    public icon$?: BehaviorSubject<string | undefined>;

    public text$?: ReplaySubject<string>;

    constructor(icon?: string, text?: string) {
        this.text$ = new ReplaySubject<string>(1);
        this.icon$ = new BehaviorSubject<string>(icon);
        if (!!text) {
            this.text$.next(text);
        }
    }


}
