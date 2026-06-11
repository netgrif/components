import {ComponentPortal} from '@angular/cdk/portal';
import {Injectable, Injector} from '@angular/core';
import {Tool} from './tool';
import {ToolComponent} from './tool-component/tool.component';
import {ToolRegistry} from './tool-registry';

@Injectable()
export class GlobalToolRegistry {

    private toolRegistry: ToolRegistry;

    constructor(private _parentInjector: Injector) {
        this.toolRegistry = new ToolRegistry(_parentInjector);
    }

    registerItem(tool: Tool) {
        this.toolRegistry.registerItem(tool);
    }

    getToolPortals(): Array<ComponentPortal<ToolComponent>> {
        return this.toolRegistry.getToolPortals();
    }
}
