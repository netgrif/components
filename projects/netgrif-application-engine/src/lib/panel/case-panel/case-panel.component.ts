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

    public _featuredFieldsValues: Array<string> = [];

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
            const immediate = this.case_[id];
            if (immediate) {
                if (immediate instanceof Array) {
                    this._featuredFieldsValues.push(
                        new Date(immediate[0], immediate[1] - 1, immediate[2], immediate[3], immediate[4]).toString());
                } else if (id === 'author') {
                    this._featuredFieldsValues.push(immediate.fullName);
                } else {
                    this._featuredFieldsValues.push(immediate);
                }
            } else {
                this._featuredFieldsValues.push('');
            }
        });
    }

}
