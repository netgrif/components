import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskRefFieldComponent} from './task-ref-field.component';

describe('TaskRefFieldComponent', () => {
    let component: TaskRefFieldComponent;
    let fixture: ComponentFixture<TaskRefFieldComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskRefFieldComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskRefFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
