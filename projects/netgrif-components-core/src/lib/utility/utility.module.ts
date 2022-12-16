import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IsEmptyPipe} from './is-empty.pipe';
import { IsNonEmptyPipe } from './is-non-empty.pipe';

@NgModule({
    declarations: [
        IsEmptyPipe,
        IsNonEmptyPipe,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        IsEmptyPipe,
        IsNonEmptyPipe
    ],
})
export class UtilityModule {
}
