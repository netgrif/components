import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search-component/search.component';
import {MaterialModule} from '../material/material.module';
import {TranslateLibModule} from '../translate/translate-lib.module';


@NgModule({
    declarations: [
        SearchComponent
    ],
    exports: [
        SearchComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
    ]
})
export class SearchModule { }
