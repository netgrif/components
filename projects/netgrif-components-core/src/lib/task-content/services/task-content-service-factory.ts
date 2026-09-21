import {Injectable, Injector} from "@angular/core";
import {LoggerService} from "../../logger/services/logger.service";
import {FieldConverterService} from "./field-converter.service";
import {SnackBarService} from "../../snack-bar/services/snack-bar.service";
import {TranslateService} from "@ngx-translate/core";
import {SingleTaskContentService} from "./single-task-content.service";
import {UnlimitedTaskContentService} from "./unlimited-task-content.service";

@Injectable({
    providedIn: 'root'
})
export class TaskContentServiceFactory {

    constructor(protected _fieldConverterService: FieldConverterService,
                protected _snackBarService: SnackBarService,
                protected _translate: TranslateService,
                protected _log: LoggerService,
                protected _injector: Injector) {
    }

    public createSingleTaskContentService(): SingleTaskContentService {
        return new SingleTaskContentService(this._fieldConverterService, this._snackBarService, this._translate, this._log, this._injector);
    }

    public createUnlimitedTaskContentService(): UnlimitedTaskContentService {
        return new UnlimitedTaskContentService(this._fieldConverterService, this._snackBarService, this._translate, this._log, this._injector);
    }
}
