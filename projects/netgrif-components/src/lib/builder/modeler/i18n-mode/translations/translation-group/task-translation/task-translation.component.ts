import {Component, Input} from '@angular/core';
import {I18nTranslations, PetriNet} from '@netgrif/petriflow';
import {ModelService} from '../../../../services/model/model.service';

@Component({
    selector: 'nc-builder-task-translation',
    templateUrl: './task-translation.component.html',
    styleUrls: ['./task-translation.component.scss']
})
export class TaskTranslationComponent {

    constructor(
        private modelService: ModelService
    ) {
    }

    get model(): PetriNet {
        return this.modelService.model;
    }

    get translation(): I18nTranslations {
        return this._translation;
    }

    @Input()
    set translation(value: I18nTranslations) {
        this._translation = value;
    }

    private _translation: I18nTranslations;

    notLast(i: number) {
        return i !== this.model.getTransitions().length - 1;
    }
}
