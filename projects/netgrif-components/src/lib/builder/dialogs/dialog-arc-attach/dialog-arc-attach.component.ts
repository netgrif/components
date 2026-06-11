import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DataVariable, Place} from '@netgrif/petriflow';
import {ReferenceDialogData} from '../../modeler/edit-mode/domain/reference-dialog-data';
import {ModelerConfig} from '../../modeler/modeler-config';
import {ModelService} from '../../modeler/services/model/model.service';

@Component({
    selector: 'nc-builder-dialog-arc-attach',
    templateUrl: './dialog-arc-attach.component.html',
    styleUrls: ['./dialog-arc-attach.component.scss']
})
export class DialogArcAttachComponent {
    dataSource: Array<DataVariable> | Array<Place>;
    length: number;
    pageSize: number;
    pageIndex: number;
    pageSizeOptions: Array<number> = [10, 20, 50];
    selectedItem: DataVariable | Place;

    constructor(
        private modelService: ModelService,
        public dialogRef: MatDialogRef<DialogArcAttachComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ReferenceDialogData
    ) {
        this.pageSize = 20;
        this.pageIndex = 0;
        if (data.dialogType === 'data') {
            this.dataSource = this.modelService.model.getDataSet().filter(dataField => ModelerConfig.VARIABLE_ARC_DATA_TYPES.includes(dataField.type));
        } else {
            this.dataSource = this.modelService.model.getPlaces();
        }
        this.length = this.dataSource.length;
        if (!!this.data.arcReference.reference) {
            this.selectedItem = this.data.dialogType === 'data' ? this.modelService.model.getData(this.data.arcReference.reference)
                : this.modelService.model.getPlace(this.data.arcReference.reference);
        }
        this.dialogRef.beforeClosed().subscribe(() => {
            this.dialogRef.close(this.selectedItem);
        });
    }

    onPageChanged(e) {
        this.pageIndex = e.pageIndex;
        this.pageSize = e.pageSize;
        const firstCut = e.pageIndex * e.pageSize;
        const secondCut = firstCut + e.pageSize;
        this.dataSource = this.modelService.model.getDataSet().slice(firstCut, secondCut);
    }

    setArcVariability(item: DataVariable | Place) {
        if (item instanceof DataVariable && !item.init) {
            alert('Empty init.');
            return;
        }
        const weight = item instanceof DataVariable ? parseInt(item.init.value, 10) : item.marking;
        if (weight < 0) {
            alert('A negative number. Cannot change the value of arc weight.');
            return;
        }
        this.selectedItem = item;
    }

    removeArcVariability() {
        this.selectedItem = undefined;
    }

    isSelected(item: DataVariable): boolean {
        if (this.selectedItem !== undefined) {
            return item.id === this.selectedItem.id;
        } else {
            return false;
        }
    }

    isData(): boolean {
        return this.data.dialogType === 'data';
    }
}
