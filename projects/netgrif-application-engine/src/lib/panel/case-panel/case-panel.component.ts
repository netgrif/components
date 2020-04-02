import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Case} from '../../resources/interface/case';
import {SelectedHeaderField} from '../../header/models/selected-header-field';
import {toMoment} from '../../resources/types/nae-date-type';

@Component({
    selector: 'nae-case-panel',
    templateUrl: './case-panel.component.html',
    styleUrls: ['./case-panel.component.scss']
})
export class CasePanelComponent implements OnInit {

    @Input() public case_: Case;
    @Input() public featuredFields$: Observable<Array<SelectedHeaderField>>;
    public panelIcon: string;
    public panelIconField: string;

    public _firstFeaturedValue: string;
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

    private resolveFeaturedFieldsValues(selectedHeaderFields: Array<SelectedHeaderField>): void {
        this._featuredFieldsValues.splice(0, this._featuredFieldsValues.length);
        this._firstFeaturedValue = this.getFeaturedValue(selectedHeaderFields[0]);
        for (let i = 1; i < selectedHeaderFields.length; i++) {
            this._featuredFieldsValues.push(this.getFeaturedValue(selectedHeaderFields[i]));
        }
        console.log(this._featuredFieldsValues);
    }

    private getFeaturedValue(selectedHeader: SelectedHeaderField): string {
        if (!selectedHeader) {
           return '';
        }
        if (selectedHeader.workflowId === 'meta') {
            switch (selectedHeader.fieldId) {
                case 'visualId':
                    return this.case_.visualId;
                case 'title':
                    return this.case_.title;
                case 'author':
                    return this.case_.author.fullName;
                case 'creationDate':
                    return toMoment(this.case_.creationDate).format();
                    // return moment.unix(this.case_.creationDate[this.case_.creationDate.length - 1]).format();
            }
        }
        if (selectedHeader.workflowId === this.case_.processIdentifier) {
            const immediate = this.case_.immediateData.find(it => it.stringId === selectedHeader.fieldId);
            if (immediate && immediate.value !== undefined) {
                // TODO rendering of non string values
                return immediate.value;
            }
        }
        return '';
    }

}
