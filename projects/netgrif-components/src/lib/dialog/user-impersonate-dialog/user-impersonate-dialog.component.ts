import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    AbstractCaseViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    BaseFilter,
    Case,
    CaseViewService,
    NAE_BASE_FILTER,
    NAE_DEFAULT_HEADERS,
    SearchService,
    UserImpersonateConfigMetadata,
    UserImpersonateInjectionData,
    UserImpersonationConstants
} from '@netgrif/components-core';
import {HeaderComponent} from '../../header/header.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

function baseFilterFactory(dialogControl: UserImpersonateInjectionData): BaseFilter {
    if (!dialogControl) {
        throw new Error('NewFilterCaseId was not provided in the side menu injection data');
    }

    return {filter: dialogControl.filter};
}

function localAllowedNetsFactory(factory: AllowedNetsServiceFactory): AllowedNetsService {
    return factory.createFromArray([UserImpersonationConstants.IMPERSONATION_CONFIG_NET_IDENTIFIER]);
}

@Component({
    selector: 'nc-user-impersonate-dialog',
    templateUrl: './user-impersonate-dialog.component.html',
    styleUrls: ['./user-impersonate-dialog.component.scss'],
    providers: [
        CaseViewService,
        SearchService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [MAT_DIALOG_DATA]
        },
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]
        },
        {
            provide: NAE_DEFAULT_HEADERS,
            useValue: [
                `${UserImpersonationConstants.IMPERSONATION_CONFIG_NET_IDENTIFIER}-${UserImpersonationConstants.IMPERSONATION_CONFIG_FIELD_IMPERSONATED}`,
                `${UserImpersonationConstants.IMPERSONATION_CONFIG_NET_IDENTIFIER}-${UserImpersonationConstants.IMPERSONATION_CONFIG_FIELD_ROLES}`,
                `${UserImpersonationConstants.IMPERSONATION_CONFIG_NET_IDENTIFIER}-${UserImpersonationConstants.IMPERSONATION_CONFIG_FIELD_AUTHS}`,
            ]
        }
    ],
    standalone: false
})
export class UserImpersonateDialogComponent extends AbstractCaseViewComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;
    protected _injectedData: UserImpersonateInjectionData;

    constructor(protected _dialogRef: MatDialogRef<UserImpersonateDialogComponent>,
                          @Inject(MAT_DIALOG_DATA) protected _data: UserImpersonateInjectionData,
                          caseViewService: CaseViewService) {
        super(caseViewService);
        if (this._data) {
            this._injectedData = this._data as UserImpersonateInjectionData;
        }
    }

    handleCaseClick(clickedCase: Case) {
        this._dialogRef.close({
            opened: false,
            message: 'User selected',
            data: {
                stringId: clickedCase.stringId
            } as UserImpersonateConfigMetadata
        });
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }

}
