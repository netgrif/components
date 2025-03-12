import {Injectable, Injector} from "@angular/core";
import {TaskResourceService} from "../../resources/engine-endpoint/task-resource.service";
import {ValidationRegistryService} from "./validation-registry.service";
import {SimpleFilter} from "../../filter/models/simple-filter";
import {FilterType} from "../../filter/models/filter-type";
import {HttpParams} from "@angular/common/http";
import {PaginationParams} from "../../utility/pagination/pagination-params";
import {map} from "rxjs/operators";
import {ValidationAction, ValidationActionDefinition} from "./model/validation-action-definition";
import {ValidatorFn} from "@angular/forms";
import {Subject} from "rxjs";
import {TaskState} from "../../filter/models/task-search-request-body";
import {ProcessService} from "../../process/process.service";
import {LoggerService} from "../../logger/services/logger.service";

@Injectable({
    providedIn: 'root'
})
export class ValidationLoaderService {

    protected static readonly VALIDATION_NAME = 'name'
    protected static readonly VALIDATION_DEFINITION = 'validation_definition_javascript'
    protected static readonly VALIDATION_TYPE = 'validation_type'
    protected static readonly VALIDATION_TYPE_CLIENT = 'client'

    constructor(protected _taskResource: TaskResourceService,
                protected _validationRegistry: ValidationRegistryService,
                protected _injector: Injector,
                protected _processService: ProcessService,
                protected _logger: LoggerService) {
    }

    public loadValidations() {
        const loaded = new Subject<boolean>();
        this._processService.getNet('validation').subscribe(net => {
            const filter = new SimpleFilter('', FilterType.TASK, {process: {identifier: net.stringId}, transitionId: 'active_detail', state: TaskState.ENABLED});
            let params: HttpParams = new HttpParams();
            params.set(PaginationParams.PAGE_SIZE, 100);
            params.set(PaginationParams.PAGE_NUMBER, 0);
            this._taskResource.getTasks(filter, params).pipe(
                map(tasks => Array.isArray(tasks.content) ? tasks.content : [])
            ).subscribe(tasks => {
                tasks.forEach(task => {
                    const type = task.immediateData.find(data => data.stringId === ValidationLoaderService.VALIDATION_TYPE);
                    if (type?.value?.value?.includes(ValidationLoaderService.VALIDATION_TYPE_CLIENT)) {
                        const name = task.immediateData.find(data => data.stringId === ValidationLoaderService.VALIDATION_NAME)
                        const definition = task.immediateData.find(data => data.stringId === ValidationLoaderService.VALIDATION_DEFINITION)
                        if (name.value?.value !== undefined && name.value?.value !== '' && !this._validationRegistry.contains(name.value.value) && definition?.value?.value !== undefined && definition.value?.value !== '' ) {
                            const validFunction: ValidationActionDefinition = {
                                call: (injector: Injector, validAction: ValidationAction) => {
                                    return eval("(formControl) => {" + definition.value.value + "}") as ValidatorFn;
                                }
                            }
                            this._validationRegistry.register(name.value.value, validFunction);
                        }
                    }
                })
                loaded.next(true);
                loaded.complete();
            }, error => {
                this._logger.error(error);
                loaded.next(false);
                loaded.complete();
            });
        }, error => {
            this._logger.error(error);
            loaded.next(false);
            loaded.complete();
        })
        return loaded;
    }
}
