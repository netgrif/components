import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleTabbedTaskViewComponent} from './single-tabbed-task-view.component';

describe('SingleTabbedTaskViewComponent', () => {
    let component: SingleTabbedTaskViewComponent;
    let fixture: ComponentFixture<SingleTabbedTaskViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SingleTabbedTaskViewComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleTabbedTaskViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
