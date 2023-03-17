import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IsEmptyPipe} from './is-empty.pipe';
import { IsNonEmptyPipe } from './is-non-empty.pipe';
import {LetDirective} from "./directives/let.directive";

@NgModule({
    declarations: [
        IsEmptyPipe,
        IsNonEmptyPipe,
        LetDirective
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        IsEmptyPipe,
        IsNonEmptyPipe,
        LetDirective
    ],
})
export class UtilityModule {
}
