import {InjectionToken} from '@angular/core';
import {Tool} from './tools/tool';

export const NAB_CONTROL_PANEL_TOOL = new InjectionToken<Tool>('Control panel mode tool');
export const NAB_CONTROL_PANEL_MODE = new InjectionToken<Tool>('Control panel mode');
