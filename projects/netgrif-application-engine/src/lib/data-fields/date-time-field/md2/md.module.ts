import {NgModule} from '@angular/core';

import {
    RtlModule,
    PortalModule,
    OverlayModule,
    A11yModule,
    MdNativeDateModule,
} from './core';

import {Md2DatepickerModule} from './datepicker';
import {PlatformModule} from './core/platform';
import {StyleModule} from './core/style';

const MD2_MODULES = [
    Md2DatepickerModule,
    OverlayModule,
    PortalModule,
    RtlModule,
    StyleModule,
    A11yModule,
    PlatformModule,
    MdNativeDateModule,
];

@NgModule({
    imports: MD2_MODULES,
    exports: MD2_MODULES,
})
export class Md2Module {
}
