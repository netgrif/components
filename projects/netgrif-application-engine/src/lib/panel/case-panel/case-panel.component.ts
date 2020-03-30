import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Case} from '../../resources/interface/case';

@Component({
    selector: 'nae-case-panel',
    templateUrl: './case-panel.component.html',
    styleUrls: ['./case-panel.component.scss']
})
export class CasePanelComponent implements OnInit {

    @Input() public case_: Case;
    @Input() public featuredFields$: Observable<Array<string>>;
    public panelIcon: string;
    public panelIconField: string;

    private _featuredFieldsValues: Array<string> = [];

    constructor() {
    }

    ngOnInit() {
        this.featuredFields$.subscribe(newFeaturedFields => this.resolveFeaturedFieldsValues(newFeaturedFields));
    }

    public show(event: MouseEvent): boolean {
        event.stopPropagation();
        return false;
    }

    private resolveFeaturedFieldsValues(immediateDataIds: Array<string>): void {
        this._featuredFieldsValues.splice(0, this._featuredFieldsValues.length);
        immediateDataIds.forEach(id => {
            const immediate = this.case_.immediateData.find(it => it.stringId === id);
            if (immediate && immediate.value !== undefined) {
                // TODO rendering of non string values
                this._featuredFieldsValues.push(immediate.value);
            } else {
                this._featuredFieldsValues.push('');
            }
        });
    }

}
