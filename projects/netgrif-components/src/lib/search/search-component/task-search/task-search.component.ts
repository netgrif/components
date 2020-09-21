import {Component} from '@angular/core';
import {AbstractTaskSearchComponent, CategoryFactory} from '@netgrif/application-engine';

@Component({
    selector: 'nc-task-search',
    templateUrl: './task-search.component.html',
    styleUrls: ['./task-search.component.scss'],
    providers: [
        CategoryFactory
    ]
})
export class TaskSearchComponent extends AbstractTaskSearchComponent {

    constructor(protected _categoryFactory: CategoryFactory) {
        super(_categoryFactory);
    }
}
