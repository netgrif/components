import {ComponentType} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {Component, Injector, Input, OnInit} from '@angular/core';
import {AbstractMasterDetailService} from './abstract-master-detail.service';

@Component({
    selector: 'nc-builder-master-detail',
    templateUrl: './master-detail.component.html',
    styleUrl: './master-detail.component.scss'
})
export class MasterDetailComponent implements OnInit {

    @Input() minWidth = 20;
    @Input() maxWidth = 50;
    @Input() defaultWidth = 30;
    @Input() masterComponent: ComponentType<any>;
    @Input() detailComponent: ComponentType<any>;
    @Input() masterItemComponent: ComponentType<any>;
    @Input() masterService: AbstractMasterDetailService<any>;
    @Input() firstColName: string;
    @Input() secondColName: string;
    @Input() buttonTooltip: string;
    @Input() showAddButton: boolean = true;
    masterPortal: ComponentPortal<any>;
    detailPortal: ComponentPortal<any>;

    constructor(private _parentInjector: Injector) {
    }

    ngOnInit(): void {
        this.updatePortal();
    }

    protected updatePortal() {
        const injector = Injector.create({
            providers: [],
            parent: this._parentInjector
        });
        if (this.masterComponent !== undefined) {
            this.masterPortal = new ComponentPortal(this.masterComponent, null, injector);
        }
        this.detailPortal = new ComponentPortal(this.detailComponent, null, injector);
    }
}
