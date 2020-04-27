import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Category} from '../models/category/category';
import {Observable} from 'rxjs';
import {CategoryFactoryService} from '../category-factory/category-factory.service';
import {CaseTitle} from '../models/category/case/case-title';
import {map, startWith} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {SelectLanguageService} from '../../toolbar/select-language.service';

@Component({
    selector: 'nae-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {

    public formControl = new FormControl();
    private readonly _options: Array<Category>;
    public filteredOptions: Observable<Array<Category>>;
    public renderSelection = (category: Category) => this._renderSelection(category);

    constructor(private _categoryFactory: CategoryFactoryService, private _translate: TranslateService, private _: SelectLanguageService) {
        this._options = [this._categoryFactory.get(CaseTitle)];
        this.filteredOptions = this.formControl.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : this.categoryName(value)),
            map(categoryName => categoryName ? this._filterOptions(categoryName) : this._options.slice())
        );
    }

    private _filterOptions(userInput: string): Array<Category> {
        const value = userInput.toLocaleLowerCase();
        return this._options.filter(category => this.categoryName(category).toLocaleLowerCase().startsWith(value));
    }

    private categoryName(category: Category): string {
        return this._translate.instant(category.translationPath) as string;
    }

    private _renderSelection(category: Category): string {
        return category ? this.categoryName(category) : '';
    }
}
