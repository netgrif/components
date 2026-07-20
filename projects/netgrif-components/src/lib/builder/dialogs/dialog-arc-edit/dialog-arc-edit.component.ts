import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Arc, DataType, TransitionPlaceArc, XmlArcType} from '@netgrif/petriflow';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ModelService} from '../../modeler/services/model/model.service';
import {ChangedArc} from './changed-arc';
import {CanvasToolContext} from "../../modeler/edit-mode/services/modes/canvas-tool-context";

export interface ArcEditData {
    context: CanvasToolContext
    arcId: string;
}

export interface Reference {
    id: string;
    label: string;
}

export interface ReferenceGroup {
    name: string;
    references: Array<Reference>;
}

@Component({
    selector: 'nc-builder-dialog-arc-edit',
    templateUrl: './dialog-arc-edit.component.html',
    styleUrls: ['./dialog-arc-edit.component.scss']
})
export class DialogArcEditComponent implements OnInit {

    public arc: ChangedArc;
    public arcType: XmlArcType;
    public arcTypes: Array<XmlArcType>;
    public references: Array<ReferenceGroup>;
    public multiplicityCtrl: FormControl;
    formControlRef: FormControl;
    filteredReferences: Observable<Array<ReferenceGroup>>;

    public arcTypeMapping = Arc.arcTypeMapping;

    public arcTypeIcons: Map<XmlArcType, string> = new Map([
        [XmlArcType.REGULAR, 'play_arrow'],
        [XmlArcType.READ, 'circle'],
        [XmlArcType.RESET, 'fast_forward'],
        [XmlArcType.INHIBITOR, 'radio_button_unchecked'],
    ]);
    private modelService: ModelService;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ArcEditData
    ) {
        this.modelService = data.context.modelService;
        this.arc = new ChangedArc(undefined, this.modelService.model.getArc(data.arcId).clone());
        this.formControlRef = new FormControl('');
        this.multiplicityCtrl = new FormControl('', [
            Validators.required,
            this.validMultiplicity()
        ]);
    }

    ngOnInit(): void {
        this.arcTypes = Object.values(XmlArcType);
        this.arcType = this.arcTypeMapping.get(this.arc.arcType);
        this.references = [];
        this.addReferences('Data fields', this.modelService.model.getDataSet()
            .filter(data => data.type === DataType.NUMBER)
            .map(data => {
                return {id: data.id, label: data.title?.value} as Reference;
            })
            .sort((a, b) => a.label?.localeCompare(b.label)));
        this.addReferences('Places', this.modelService.model.getPlaces()
            .map(place => {
                return {id: place.id, label: place.label?.value} as Reference;
            })
            .sort((a, b) => a.label?.localeCompare(b.label)));
        this.filteredReferences = this.formControlRef.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
        );
    }

    private addReferences(name: string, references: Array<Reference>): void {
        if (references.length === 0) {
            return;
        }
        this.references.push({name, references});
    }

    isTPArc(): boolean {
        return this.arc.arc instanceof TransitionPlaceArc;
    }

    onTypeChange(newValue: XmlArcType): void {
        this.arc.arcType = this.modelService.toArcType(newValue);
    }

    private _filter(value: string): Array<ReferenceGroup> {
        const filterValue = value.toLowerCase();
        const groups = new Array<ReferenceGroup>();
        this.references.forEach(group => {
            const startsWith = new Array<Reference>();
            const includes = new Array<Reference>();
            group.references.forEach(reference => {
                if (reference.id?.includes(filterValue)) {
                    if (reference.id?.startsWith(filterValue)) {
                        startsWith.push(reference);
                    } else {
                        includes.push(reference);
                    }
                } else if (reference.label?.includes(filterValue)) {
                    if (reference.label?.startsWith(filterValue)) {
                        startsWith.push(reference);
                    } else {
                        includes.push(reference);
                    }
                }
            });
            groups.push({
                name: group.name,
                references: startsWith.concat(includes)
            });
        })
        return groups;
    }

    private validMultiplicity(): ValidatorFn {
        return (fc: FormControl): { [key: string]: any } | null => {
            const multiplicity = Math.floor(fc.value as number);
            if (multiplicity !== Infinity && multiplicity === fc.value as number && multiplicity > 0) {
                return null;
            }
            return ({validMultiplicity: true})
        };
    }
}
