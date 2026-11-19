import {BuilderMode} from './services/builder-mode.service';
import {InjectedTabData, Case} from "@netgrif/components-core";

export interface InjectedTabbedBuilderViewData extends InjectedTabData {
    processCase: Case;
    /** mode the builder opens in (the process mode by default), e.g. `BuilderMode.MODELER` to draw a new process */
    initialMode?: BuilderMode;
}
