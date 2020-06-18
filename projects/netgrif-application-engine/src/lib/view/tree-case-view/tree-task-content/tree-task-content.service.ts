import {Injectable} from '@angular/core';
import {TaskContentService} from '../../../task-content/services/task-content.service';
import {FieldConverterService} from '../../../task-content/services/field-converter.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from '../../../logger/services/logger.service';
import {Task} from '../../../resources/interface/task';

@Injectable()
export class TreeTaskContentService extends TaskContentService {

    constructor(protected _fieldConverterService: FieldConverterService,
                protected _snackBarService: SnackBarService,
                protected _translate: TranslateService,
                protected _logger: LoggerService) {
        super(_fieldConverterService, _snackBarService, _translate, _logger);
    }

    public set task(task: Task) {
        this._task = task;
        this._task$.next(task);
    }

    public get task(): Task | undefined {
        return this._task;
    }
}
