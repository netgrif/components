import {Component, Input} from '@angular/core';
import {DataType, DataVariable, I18nTranslations, PetriNet} from '@netgrif/petriflow';
import {ModelService} from '../../../../services/model/model.service';

@Component({
    selector: 'nc-builder-data-translation',
    templateUrl: './data-translation.component.html',
    styleUrls: ['./data-translation.component.scss']
})
export class DataTranslationComponent {

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

    notLast(i: any) {
        return i !== this.model.getDataSet().length - 1;
    }

    isI18nField(dataVariable: DataVariable): boolean {
        return dataVariable.type === DataType.I18N;
    }
}
