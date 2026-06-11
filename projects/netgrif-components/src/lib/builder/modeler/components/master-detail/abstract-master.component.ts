import {ComponentType} from '@angular/cdk/overlay';
import {Component, Input} from '@angular/core';
import {AbstractMasterDetailService} from './abstract-master-detail.service';

@Component({
    selector: 'nc-builder-abstract-master-component',
    template: ''
})
export abstract class AbstractMasterComponent {
    protected _allData: Array<any>;
    @Input() masterService: AbstractMasterDetailService<any>;
    @Input() masterItemComponent: ComponentType<any>;

    @Input() firstColName: string;
    @Input() secondColName: string;
    @Input() buttonTooltip: string;
    @Input() showAddButton: boolean = true;

    public select(item: any): void {
        this.masterService.select(item);
    }

    get selected(): any {
        return this.masterService.getSelected();
    }

    get service(): AbstractMasterDetailService<any> {
        return this.masterService;
    }


}
