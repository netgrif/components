import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Case, CaseViewService, NewCaseCreationConfigurationData, NewCaseButtonConfiguration} from '@netgrif/components-core';

@Component({
    selector: 'nc-create-case-button',
    templateUrl: './create-case-button.component.html',
    styleUrls: ['./create-case-button.component.scss']
})
export class CreateCaseButtonComponent implements OnInit {

    @Output() public caseCreatedEvent = new EventEmitter<Case>();
    @Input() public newCaseCreationConfig: NewCaseCreationConfigurationData;

    protected _resolvedCaseButtonTitle: string;
    protected _resolvedCaseButtonIcon: string;

    constructor(protected _caseViewService: CaseViewService) {
    }

    get resolvedCaseButtonTitle(): string {
        return this._resolvedCaseButtonTitle;
    }

    get resolvedCaseButtonIcon(): string {
        return this._resolvedCaseButtonIcon;
    }

    ngOnInit(): void {
        const config: NewCaseButtonConfiguration = this.newCaseCreationConfig['newCaseButtonConfig'];
        if (!!config) {
            this._resolvedCaseButtonIcon = config.createCaseButtonIcon;
            this._resolvedCaseButtonTitle = config.createCaseButtonTitle;
        }
    }

    public createNewCase(): Observable<Case> {
        let myCase: Observable<Case>;
        if (this.newCaseCreationConfig.enableCaseTitle === false && this._caseViewService.getAllowedNetsCount() === 1) {
            myCase = this._caseViewService.createDefaultNewCase(this.newCaseCreationConfig);
        } else {
            myCase = this._caseViewService.createNewCase(this.newCaseCreationConfig);
        }
        myCase.subscribe(kaze => {
            if (this._caseViewService.viewEnabled(kaze)) {
                this.caseCreatedEvent.next(kaze);
            }
        });
        return myCase;
    }

}
