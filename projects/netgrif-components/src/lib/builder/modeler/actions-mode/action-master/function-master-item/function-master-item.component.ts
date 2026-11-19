import {Component, Inject, ChangeDetectionStrategy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PetriflowFunction} from '@netgrif/petriflow';
import {DialogDeleteComponent} from '../../../../dialogs/dialog-delete/dialog-delete.component';
import {AbstractMasterDetailService} from '../../../components/master-detail/abstract-master-detail.service';
import {MASTER_ITEM, MASTER_SERVICE} from '../../../components/master-detail/main-master-item/master-injection-tokens';
import {BuilderModeService} from '../../../../services/builder-mode.service';

@Component({
  selector: 'nc-builder-function-master-item',
  templateUrl: './function-master-item.component.html',
  styleUrl: './function-master-item.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FunctionMasterItemComponent {
    public showIcons: boolean;

    constructor(@Inject(MASTER_ITEM) public item: PetriflowFunction,
                @Inject(MASTER_SERVICE) protected _service: AbstractMasterDetailService<any>,
                protected _dialog: MatDialog,
        protected _builderModeService: BuilderModeService) {
    }

    onDelete(event: MouseEvent, item: PetriflowFunction): void {
        event.stopPropagation();
        const dialogRef = this._dialog.open(DialogDeleteComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this._service.delete(item);
            }
        });
    }

    select(): void {
        this._service.select(this.item);
    }

    get selected(): PetriflowFunction {
        return this._service.getSelected();
    }
}
