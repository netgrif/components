import {Component, Inject} from '@angular/core';
import {DataVariable, Role, Transition} from '@netgrif/petriflow';
import {AbstractMasterDetailService} from '../../../components/master-detail/abstract-master-detail.service';
import {MASTER_ITEM, MASTER_SERVICE} from '../../../components/master-detail/main-master-item/master-injection-tokens';

@Component({
  selector: 'nc-builder-action-master-item',
  templateUrl: './action-master-item.component.html',
  styleUrl: './action-master-item.component.scss'
})
export class ActionMasterItemComponent {

    constructor(@Inject(MASTER_ITEM) public item: DataVariable | Transition | Role,
                @Inject(MASTER_SERVICE) protected _service: AbstractMasterDetailService<any>) {
    }

    getItemTitle(item: DataVariable | Transition | Role): string {
        return (item instanceof Transition ? item.label : item.title)?.value ?? '';
    }

    select(): void {
        this._service.select(this.item);
    }

    get selected(): DataVariable | Transition | Role {
        return this._service.getSelected();
    }
}
