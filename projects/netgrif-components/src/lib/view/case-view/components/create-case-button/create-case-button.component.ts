import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {
    Case,
    CaseViewService,
    NewCaseCreationConfigurationData,
    NewCaseButtonConfiguration,
    LoadingEmitter
} from '@netgrif/components-core';
import {map} from "rxjs/operators";

@Component({
    selector: 'nc-create-case-button',
    templateUrl: './create-case-button.component.html',
    styleUrls: ['./create-case-button.component.scss']
})
export class CreateCaseButtonComponent implements OnInit {

    @Output() public caseCreatedEvent = new EventEmitter<Case>();
    @Input() public newCaseCreationConfig: NewCaseCreationConfigurationData;
    @Input() public disabled: boolean;

    protected _resolvedCaseButtonTitle: string;
    protected _resolvedCaseButtonIcon: string;
    protected _loading: LoadingEmitter;

    constructor(protected _caseViewService: CaseViewService) {
        this._loading = new LoadingEmitter();
    }

    get resolvedCaseButtonTitle(): string {
        return this._resolvedCaseButtonTitle;
    }

    get resolvedCaseButtonIcon(): string {
        return this._resolvedCaseButtonIcon;
    }

    get loading$(): Observable<boolean> {
        return this._loading;
    }

    ngOnInit(): void {
        const config: NewCaseButtonConfiguration = this.newCaseCreationConfig['newCaseButtonConfig'];
        if (!!config) {
            this._resolvedCaseButtonIcon = config.createCaseButtonIcon;
            this._resolvedCaseButtonTitle = config.createCaseButtonTitle;
        }
    }

    public shouldShowCreateButton(): Observable<boolean> {
        const blockNets = this.newCaseCreationConfig?.blockNets || [];
        return this._caseViewService.getNewCaseAllowedNets(blockNets).pipe(
            map(allowedNets => allowedNets.length > 0)
        );
    }

    public createNewCase(): Observable<Case> {
        let myCase: Observable<Case>;
        this._loading.on();
        if (this.newCaseCreationConfig.enableCaseTitle === false && this._caseViewService.getAllowedNetsCount() === 1) {
            myCase = this._caseViewService.createDefaultNewCase(this.newCaseCreationConfig);
        } else {
            myCase = this._caseViewService.createNewCase(this.newCaseCreationConfig);
        }
        myCase.subscribe(kaze => {
            if (this._caseViewService.viewEnabled(kaze)) {
                this.caseCreatedEvent.next(kaze);
            }
        }, error => {},() => this._loading.off());

        return myCase;
    }

}
