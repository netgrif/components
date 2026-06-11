import {Component, Input} from '@angular/core';
import {I18nTranslations, PetriNet} from '@netgrif/petriflow';
import {ModelService} from '../../../../services/model/model.service';

@Component({
    selector: 'nc-builder-role-translation',
    templateUrl: './role-translation.component.html',
    styleUrls: ['./role-translation.component.scss']
})
export class RoleTranslationComponent {

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
        return i !== this.model.getRoles().length - 1;
    }
}
