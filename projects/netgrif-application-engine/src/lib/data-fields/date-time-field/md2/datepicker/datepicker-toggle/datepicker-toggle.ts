import {ChangeDetectionStrategy, Component, HostListener, Input, ViewEncapsulation} from '@angular/core';
import {Md2DatepickerComponent} from '../datepicker/datepicker';


@Component({
    selector: 'button[md2DatepickerToggle]',
    template: '',
    styleUrls: ['datepicker-toggle.scss'],
    host: {
        type: 'button',
        class: 'md2-datepicker-toggle',
        'aria-label': 'Open calendar',
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2DatepickerToggleComponent<D> {
    /** Datepicker instance that the button will toggle. */
    @Input('md2DatepickerToggle') datepicker: Md2DatepickerComponent;

    @HostListener('click', ['$event']) _open(event: Event): void {
        if (this.datepicker) {
            this.datepicker.open();
            event.stopPropagation();
        }
    }
}
