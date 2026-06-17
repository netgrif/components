import {Injectable} from "@angular/core";
import {HistoryService} from "./modeler/services/history/history.service";
import {Case, LoggerService, TaskResourceService, extractFieldValueFromData, TaskEventOutcome} from "@netgrif/components-core";
import {ExportService, PetriNet} from "@netgrif/petriflow";
import {HistoryChange} from "./modeler/services/history/history-change";
import {Observable, of, Subject} from "rxjs";

@Injectable()
export class BuilderIntegrationService {
    protected _isIntegrated: boolean = false;
    protected _processCase: Case;
    protected _editTaskId: string;
    protected _isAssigned: boolean = false;
    private _onlyTaskView: boolean = true;

    protected _reloadCase: Subject<boolean> = new Subject<boolean>();
    protected _reloadModes: Subject<boolean> = new Subject<boolean>();

    constructor(protected _historyService: HistoryService,
                protected _taskResourceService: TaskResourceService,
                protected _exportService: ExportService,
                protected _log: LoggerService) {
        this._historyService.historyChange.subscribe(history => {
            if (this._isIntegrated && this._editTaskId) {
                if (!this._isAssigned) {
                    this._taskResourceService.assignTask(this._editTaskId).subscribe(result => {
                        if (result.success) {
                            this._isAssigned = true;
                        }
                        this.setData(history);
                    });
                } else {
                   this.setData(history);
                }
            }
        });
    }

    get isIntegrated(): boolean {
        return this._isIntegrated;
    }

    set isIntegrated(value: boolean) {
        this._isIntegrated = value;
    }

    get processCase(): Case {
        return this._processCase;
    }

    set processCase(value: Case) {
        this._processCase = value;
    }

    get editTaskId(): string {
        return this._editTaskId;
    }

    set editTaskId(value: string) {
        this._editTaskId = value;
    }

    get onlyTaskView(): boolean {
        return this._onlyTaskView;
    }

    set onlyTaskView(value: boolean) {
        this._onlyTaskView = value;
    }

    get reloadCase(): Observable<boolean> {
        return this._reloadCase.asObservable();
    }

    set reloadCase(value: boolean) {
        this._reloadCase.next(value);
    }

    get reloadModes(): Observable<boolean> {
        return this._reloadModes.asObservable();
    }

    set reloadModes(value: boolean) {
        this._reloadModes.next(value);
    }

    protected setData(history: HistoryChange<PetriNet>) {
        const body = {};
        body[this._editTaskId] = {};
        body[this._editTaskId]['xml_text'] = {
            type: 'text',
            value: this._exportService.exportXml(history.record)
        };
        this._taskResourceService.setData(this._editTaskId, body).subscribe(outcome => {
            if ((outcome.outcome as TaskEventOutcome)?.task?.user?.email !== undefined) {
                this._isAssigned = true;
            }
            this._log.debug('Data set successfully');
        });
    }

    public getXml(taskId = this._editTaskId): Observable<string> {
        if (!taskId) {
            this._log.debug('taskId is undefined, returning empty observable');
            return of('');
        }
        const xml = new Subject<string>();
        this._taskResourceService.getData(taskId).subscribe(dg => {
            const xmlFieldValue = extractFieldValueFromData<string>(dg, 'xml_text');
            xml.next(xmlFieldValue);
            xml.complete();
        })
        return xml.asObservable();
    }
}
