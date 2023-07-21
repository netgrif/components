import {Injectable, Injector} from '@angular/core';
import {FrontActionRegistryService} from "../../registry/front-action-registry.service";
import {FrontAction} from "../../data-fields/models/changed-fields";

@Injectable()
export class FrontActionService {

    constructor(protected _injector: Injector,
                protected _frontActionRegistry: FrontActionRegistryService) {

    }

    public run(frontAction: FrontAction): void {
        const fn = this._frontActionRegistry.get(frontAction.id)
        fn.fn(this._injector, frontAction)
    }

    public runAll(frontAction: FrontAction[]): void {
        frontAction.forEach(a => this.run(a))
    }

}
