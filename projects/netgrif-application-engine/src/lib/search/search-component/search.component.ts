import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Category} from '../models/category/category';
import {Observable} from 'rxjs';

@Component({
    selector: 'nae-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    public formControl = new FormControl();
    private _options: Array<Category>;
    public filteredOptions: Observable<Array<Category>>;

    constructor() {
    }

    ngOnInit(): void {
    }

}
