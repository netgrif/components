import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Locale} from '../../classes/locale';
import {I18nControlService} from '../../i18n-control.service';

@Component({
    selector: 'nc-builder-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

    @Input() locale: Locale;
    @Output() deleteLocale = new EventEmitter<Locale>();
    @Output() selectLocale = new EventEmitter<Locale>();

    constructor(private i18nControlService: I18nControlService) {
    }

    removeLocale() {
        this.i18nControlService.removeLocale(this.locale.languageCode);
        this.deleteLocale.emit(this.locale);
    }

    emitSelectLocale() {
        this.selectLocale.emit(this.locale);
    }
}
