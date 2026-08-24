import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractEditModeComponent, LoggerService} from '@netgrif/components-core';
import {MediaObserver} from '@ngbracket/ngx-layout';

@Component({
    selector: 'nc-edit-mode',
    templateUrl: './edit-mode.component.html',
    styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent extends AbstractEditModeComponent implements OnInit {
    constructor(protected _translate: TranslateService,
                protected loggerService: LoggerService,
                protected mediaObserver: MediaObserver) {
        super(_translate, loggerService);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        if (this.headerService.responsiveHeaders && !this.headerService.overflowMode) {
            this.removeHiddenSorts(this.visibleHeaderCount());
        }
    }

    public setValue() {
        this.approvalFormControl.setValue(true);
    }

    private visibleHeaderCount(): number {
        if (this.mediaObserver.isActive('lt-sm')) {
            return 1;
        }
        if (this.mediaObserver.isActive('lt-md')) {
            return 2;
        }
        if (this.mediaObserver.isActive('lt-lg')) {
            return 3;
        }
        if (this.mediaObserver.isActive('lt-xl')) {
            return 4;
        }
        return this.headerService.headerState.selectedHeaders.length;
    }
}
