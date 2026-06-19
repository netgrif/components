import {Component, Input} from '@angular/core';
import {I18nTranslations, PetriNet} from '@netgrif/petriflow';
import {ModelService} from '../../../../services/model/model.service';

@Component({
    selector: 'nc-builder-model-translation',
    templateUrl: './model-translation.component.html',
    styleUrls: ['./model-translation.component.scss']
})
export class ModelTranslationComponent {

    private _translation: I18nTranslations;

    constructor(
        private modelService: ModelService,
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
}
