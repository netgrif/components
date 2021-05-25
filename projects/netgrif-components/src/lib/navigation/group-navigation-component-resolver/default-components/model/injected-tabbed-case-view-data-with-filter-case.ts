import {Case, InjectedTabbedCaseViewData} from '@netgrif/application-engine';

export interface InjectedTabbedCaseViewDataWithFilterCase extends InjectedTabbedCaseViewData {
    filterCase: Case;
}
