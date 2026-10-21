import {InjectionToken} from '@angular/core';

export interface CasePanelConfiguration {
    readonly showCasePanelIcon: boolean;
}

export const NAE_CASE_PANEL_CONFIGURATION = new InjectionToken<CasePanelConfiguration>('NaeCasePanelConfiguration', {
    providedIn: 'root',
    factory: () => ({showCasePanelIcon: true})
});
