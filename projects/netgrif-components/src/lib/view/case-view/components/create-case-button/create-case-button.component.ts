import {Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {
    Case,
    CaseViewService,
    NewCaseCreationConfigurationData,
    NewCaseButtonConfiguration,
    LoadingEmitter,
    PetriNetReferenceWithPermissions
} from '@netgrif/components-core';
import {map, shareReplay, switchMap, take} from "rxjs/operators";

@Component({
    selector: 'nc-create-case-button',
    templateUrl: './create-case-button.component.html',
    styleUrls: ['./create-case-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CreateCaseButtonComponent implements OnInit {

    @Output() public caseCreatedEvent = new EventEmitter<Case>();
    @Input() public newCaseCreationConfig: NewCaseCreationConfigurationData;
    @Input() public disabled: boolean;

    protected _resolvedCaseButtonTitle: string;
    protected _resolvedCaseButtonIcon: string;
    protected _loading: LoadingEmitter;
    /** the button is shown when a process allows creating a case (created once, the template binds it) */
    protected _showCreateButton$: Observable<boolean>;
    /** the blocked processes the visibility was created for: other ones (a new configuration) create it again */
    protected _showCreateButtonKey: string;

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

    /**
     * The same observable on every call: a new one for every change detection made the `async` pipe of the template
     * subscribe again and load the processes again.
     */
    public shouldShowCreateButton(): Observable<boolean> {
        const blockNets = this.newCaseCreationConfig?.blockNets || [];
        const key = blockNets.join(',');
        if (!this._showCreateButton$ || this._showCreateButtonKey !== key) {
            this._showCreateButtonKey = key;
            this._showCreateButton$ = this._caseViewService.getNewCaseAllowedNets(blockNets).pipe(
                map(allowedNets => allowedNets.length > 0),
                shareReplay({bufferSize: 1, refCount: true})
            );
        }
        return this._showCreateButton$;
    }

    /**
     * Creates a case: right away when there is nothing to fill in (one allowed process, and the title is turned off by the
     * configuration or the process names the case itself), otherwise in the new case dialog.
     */
    public createNewCase(): Observable<Case> {
        this._loading.on();
        const myCase = new ReplaySubject<Case>(1);
        this._caseViewService.getNewCaseAllowedNets(this.newCaseCreationConfig?.blockNets).pipe(
            take(1),
            switchMap(nets => this.createsWithoutDialog(nets)
                ? this._caseViewService.createDefaultNewCase(this.newCaseCreationConfig, nets)
                : this._caseViewService.createNewCase(this.newCaseCreationConfig, nets)),
        ).subscribe({
            next: kaze => {
                if (this._caseViewService.viewEnabled(kaze)) {
                    this.caseCreatedEvent.next(kaze);
                }
                myCase.next(kaze);
            },
            error: error => {
                this._loading.off();
                myCase.error(error);
            },
            complete: () => {
                this._loading.off();
                myCase.complete();
            }
        });
        return myCase.asObservable();
    }

    /** nothing to fill in the new case dialog: one allowed process, the title turned off or the default case name of the process */
    protected createsWithoutDialog(nets: Array<PetriNetReferenceWithPermissions>): boolean {
        if (nets?.length !== 1) {
            return false;
        }
        return this.newCaseCreationConfig?.enableCaseTitle === false || !!nets[0].defaultCaseName?.trim();
    }

}
