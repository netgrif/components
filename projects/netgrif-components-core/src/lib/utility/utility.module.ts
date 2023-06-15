import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IsEmptyPipe} from './is-empty.pipe';
import { IsNonEmptyPipe } from './is-non-empty.pipe';
import {ContainsPipe} from "./contains.pipe";
import {LetDirective} from "./directives/let.directive";

@NgModule({
    declarations: [
        IsEmptyPipe,
        IsNonEmptyPipe,
        ContainsPipe,
        LetDirective
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        IsEmptyPipe,
        IsNonEmptyPipe,
        ContainsPipe,
        LetDirective
    ],
})
export class UtilityModule {
}
