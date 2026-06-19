import {ComponentPortal} from '@angular/cdk/portal';
import {Injector, StaticProvider} from '@angular/core';
import {AbstractRegistry} from '../../abstract-registry';
import {NAB_CONTROL_PANEL_MODE, NAB_CONTROL_PANEL_TOOL} from '../control-panel-tool-injection-token';
import {ModeService} from '../modes/mode-component/mode.service';
import {Tool} from './tool';
import {ToolComponent} from './tool-component/tool.component';

export class ToolRegistry extends AbstractRegistry<Tool> {

    private toolPortals: Map<string, ComponentPortal<ToolComponent>>;

    constructor(private _parentInjector: Injector) {
        super();
        this.toolPortals = new Map<string, ComponentPortal<ToolComponent>>();
    }

    registerItem(tool: Tool, modeService?: ModeService<Tool>) {
        super.registerItem(tool);
        const providers: Array<StaticProvider> = [
            {provide: NAB_CONTROL_PANEL_TOOL, useValue: tool},
            {provide: NAB_CONTROL_PANEL_MODE, useValue: modeService}
        ];
        const injector = Injector.create({providers, parent: this._parentInjector});
        this.toolPortals.set(tool.id, new ComponentPortal(tool.component, null, injector));
    }

    getToolPortals(): Array<ComponentPortal<ToolComponent>> {
        return Array.from(this.toolPortals.values());
    }
}
