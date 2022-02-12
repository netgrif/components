import {Input, OnInit} from '@angular/core';

/**
 * @ignore
 * Class that detects tab content creation and then initializes then calls the provided `initializeTab` function.
 * It is necessary if the tab content is lazy loaded, because the
 * ComponentPortal's outlet must be initialized before the Portal itself is created.
 */
export abstract class AbstractTabCreationDetectorComponent implements OnInit {

    /**
     * function that should be called when the tab content is created
     */
    @Input() initializeTabFunction: (index: number) => void;
    /**
     * index of the tab that the `initializeTabFunction` should be called for
     */
    @Input() tabIndex: number;

    ngOnInit() {
        this.initializeTabFunction(this.tabIndex);
    }

}
