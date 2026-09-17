import {TranslateService} from "@ngx-translate/core";

export class ContextMenuInterruptionError implements Error {
    private _stack?: string;

    constructor(protected _translateService: TranslateService) {
    }

    get name(): string {
        return 'ContextMenuInterruptionError';
    }

    get message(): string {
        return this._translateService.instant('builder.modeler.services.contextMenuClosed');
    }

    get stack(): string {
        return this._stack;
    }

    set stack(value: string) {
        this._stack = value;
    }
}
