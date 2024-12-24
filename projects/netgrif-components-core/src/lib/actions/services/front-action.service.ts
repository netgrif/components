import {Injectable, Injector} from '@angular/core';
import {FrontActionRegistryService} from "../../registry/front-action-registry.service";
import {FrontAction} from "../../data-fields/models/changed-fields";
import {LoggerService} from "../../logger/services/logger.service";

@Injectable()
export class FrontActionService {

    constructor(protected _injector: Injector,
                protected _frontActionRegistry: FrontActionRegistryService,
                protected _log: LoggerService) {

    }

    public run(frontAction: FrontAction): void {
        const fn = this._frontActionRegistry.get(frontAction.id)
        if (!fn) {
            this._log.error("Frontend action is not defined for ID [" + frontAction.id +"]")
        }
        fn.call(this._injector, frontAction)
    }

    public runAll(frontAction: FrontAction[]): void {
        frontAction.forEach(a => this.run(a))
    }

}
