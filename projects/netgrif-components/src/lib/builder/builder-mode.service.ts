import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

export enum BuilderMode {
    MODELER = 'modeler',
    SIMULATION_MODE = 'simulation',
    DATA_MODE = 'data',
    ROLE_MODE = 'roles',
    ACTION_MODE = 'actions',
    I18N_MODE = 'i18n',
    HISTORY_MODE = 'history',
    FORM_BUILDER = 'form-builder'
}

@Injectable()
export class BuilderModeService {

    private _mode: BehaviorSubject<BuilderMode> = new BehaviorSubject(BuilderMode.MODELER);

    public mode$(): Observable<BuilderMode> {
        return this._mode.asObservable();
    }

    get mode(): BuilderMode {
        return this._mode.value;
    }

    set mode(value: BuilderMode) {
        this._mode.next(value);
    }
}
