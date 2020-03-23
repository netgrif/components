import { NgModule } from '@angular/core';

import {
  MdRippleModule,
  RtlModule,
  PortalModule,
  OverlayModule,
  A11yModule,
  CompatibilityModule,
  MdNativeDateModule,
} from './core';

import { Md2DatepickerModule } from './datepicker';
import { PlatformModule } from './core/platform';
import { StyleModule } from './core/style';

const MD2_MODULES = [
  Md2DatepickerModule,
  MdRippleModule,
  OverlayModule,
  PortalModule,
  RtlModule,
  StyleModule,
  A11yModule,
  PlatformModule,
  CompatibilityModule,
  MdNativeDateModule,
];

@NgModule({
  imports: MD2_MODULES,
  exports: MD2_MODULES,
})
export class Md2Module { }
