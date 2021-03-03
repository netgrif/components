import {FormControl} from '@angular/forms';
import {debounceTime, filter} from 'rxjs/operators';
import {SearchService} from '../search-service/search.service';

export class AbstractFulltextSearchComponent {

    public fullTextFormControl: FormControl;

    protected constructor(protected _searchService: SearchService) {
        this.fullTextFormControl = new FormControl();

        this.fullTextFormControl.valueChanges.pipe(
            debounceTime(600),
            filter(newValue => !!newValue)
        ).subscribe(fulltext => {
            this._searchService.setFullTextFilter(fulltext);
        });
    }

}
