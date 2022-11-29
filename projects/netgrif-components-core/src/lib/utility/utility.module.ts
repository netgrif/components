import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IsEmptyPipe} from './is-empty.pipe';

@NgModule({
    declarations: [
        IsEmptyPipe,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        IsEmptyPipe,
    ],
})
export class UtilityModule {
}
