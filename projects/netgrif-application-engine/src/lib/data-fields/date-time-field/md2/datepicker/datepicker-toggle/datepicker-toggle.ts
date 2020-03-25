import {ChangeDetectionStrategy, Component, HostBinding, HostListener, Input, ViewEncapsulation} from '@angular/core';
import {Md2DatepickerComponent} from '../datepicker/datepicker';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'button[md2DatepickerToggle]',
    template: '',
    styleUrls: ['datepicker-toggle.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2DatepickerToggleComponent<D> {
    /** Datepicker instance that the button will toggle. */ // tslint:disable-next-line:no-input-rename
    @Input('md2DatepickerToggle') datepicker: Md2DatepickerComponent;

    @HostBinding('attr.type') type = 'button';
    @HostBinding('attr.class') hostClass = 'md2-datepicker-toggle';
    @HostBinding('attr.aria-label') ariaLabel = 'Open calendar';

    @HostListener('click', ['$event']) _open(event: Event): void {
        if (this.datepicker) {
            this.datepicker.open();
            event.stopPropagation();
        }
    }
}
