import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IsEmptyPipe} from './is-empty.pipe';
import { IsNonEmptyPipe } from './is-non-empty.pipe';
import {ContainsPipe} from "./contains.pipe";

@NgModule({
    declarations: [
        IsEmptyPipe,
        IsNonEmptyPipe,
        ContainsPipe
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        IsEmptyPipe,
        IsNonEmptyPipe,
        ContainsPipe
    ],
})
export class UtilityModule {
}
