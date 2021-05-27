import {FormControl} from '@angular/forms';
import {debounceTime, filter, map} from 'rxjs/operators';
import {SearchService} from '../search-service/search.service';

export class AbstractFulltextSearchComponent {

    public fullTextFormControl: FormControl;

    protected constructor(protected _searchService: SearchService) {
        this.fullTextFormControl = new FormControl();

        this.fullTextFormControl.valueChanges.pipe(
            debounceTime(600),
            filter(newValue => typeof newValue === 'string'),
            map((newValue: string) => newValue.trim())
        ).subscribe((fulltext: string) => {
            if (fulltext.length === 0) {
                this._searchService.clearFullTextFilter();
            } else {
                this._searchService.setFullTextFilter(fulltext);
            }
        });
    }

}
