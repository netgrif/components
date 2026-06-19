import {ComponentType} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {Component, Injector, Input, OnInit} from '@angular/core';
import {AbstractMasterDetailService} from '../abstract-master-detail.service';
import {MASTER_ITEM, MASTER_SERVICE} from './master-injection-tokens';

@Component({
    selector: 'nc-builder-main-master-item',
    template: '<ng-template [cdkPortalOutlet]="masterItemPortal"></ng-template>'
})
export class MainMasterItemComponent implements OnInit {

    @Input() masterItemComponent: ComponentType<any>;
    @Input() item: any;
    @Input() masterService: AbstractMasterDetailService<any>;
    masterItemPortal: ComponentPortal<any>;

    constructor(private _parentInjector: Injector) {
    }

    ngOnInit(): void {
        const injector = Injector.create({
            providers: [
                {provide: MASTER_ITEM, useValue: this.item},
                {provide: MASTER_SERVICE, useValue: this.masterService}
            ],
            parent: this._parentInjector
        });
        this.masterItemPortal = new ComponentPortal(this.masterItemComponent, null, injector);

    }
}
