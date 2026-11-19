import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, ElementRef, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {
    AbstractEnumerationStepperFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, EnumerationField
} from '@netgrif/components-core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'nc-enumeration-stepper-field',
    templateUrl: './enumeration-stepper-field.component.html',
    styleUrls: ['./enumeration-stepper-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EnumerationStepperFieldComponent extends AbstractEnumerationStepperFieldComponent {

    /** Phone width (< 600px), the steps are laid out vertically. */
    public readonly handset$: Observable<boolean>;

    constructor(protected ref: ElementRef,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>,
        breakpointObserver: BreakpointObserver
    ) {
        super(ref, dataFieldPortalData);
        this.handset$ = breakpointObserver.observe(Breakpoints.XSmall).pipe(map(state => state.matches));
    }
}
