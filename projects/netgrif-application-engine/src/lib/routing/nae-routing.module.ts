import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutingComponent} from './routing-component/routing.component';


@NgModule({
    declarations: [
        RoutingComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        RoutingComponent
    ]
})
export class NaeRoutingModule {
}
