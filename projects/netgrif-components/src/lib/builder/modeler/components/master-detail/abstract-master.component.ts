import {ComponentType} from '@angular/cdk/overlay';
import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {AbstractMasterDetailService} from './abstract-master-detail.service';

@Component({
    selector: 'nc-builder-abstract-master-component',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractMasterComponent {
    protected _allData: Array<any>;
    @Input() masterService: AbstractMasterDetailService<any>;
    @Input() masterItemComponent: ComponentType<any>;

    @Input() firstColName: string;
    @Input() secondColName: string;
    @Input() buttonTooltip: string;
    @Input() showAddButton: boolean = true;
    /** sort menu above the list (by the name / by the id) */
    @Input() sortable: boolean = true;

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
