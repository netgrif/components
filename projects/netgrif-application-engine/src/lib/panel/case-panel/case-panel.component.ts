import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Case} from '../../resources/interface/case';
import {SelectedHeaderField} from '../../header/models/selected-header-field';

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
        selectedHeaderFields.forEach(selectedHeaderField => {
            if (selectedHeaderField.workflowId === 'meta') {
                switch (selectedHeaderField.fieldId) {
                    case 'visualId':
                        this._featuredFieldsValues.push(this.case_.visualId);
                        return;
                    case 'title':
                        this._featuredFieldsValues.push(this.case_.title);
                        return;
                    case 'author':
                        this._featuredFieldsValues.push(this.case_.author.fullName);
                        return;
                    case 'creationDate':
                        this._featuredFieldsValues.push(this.case_.creationDate.format());
                        return;
                }
            }
            if (selectedHeaderField.workflowId === this.case_.processIdentifier) {
                const immediate = this.case_.immediateData.find(it => it.stringId === selectedHeaderField.fieldId);
                if (immediate && immediate.value !== undefined) {
                    // TODO rendering of non string values
                    this._featuredFieldsValues.push(immediate.value);
                    return;
                }
            }
            this._featuredFieldsValues.push('');
        });
    }

}
