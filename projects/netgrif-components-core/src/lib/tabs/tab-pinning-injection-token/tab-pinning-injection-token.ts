import {InjectionToken} from '@angular/core';

export const NAE_TAB_PINNING_ENABLED = new InjectionToken<boolean>('NaeTabPinningEnabled', {
    providedIn: 'root',
    factory: () => false
});
