import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskRefListFieldComponent} from './task-ref-list-field.component';
import {Component} from '@angular/core';
import {TaskRefField} from '@netgrif/components-core';

describe('TaskRefListFieldComponent', () => {
    let component: TaskRefListFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskRefListFieldComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});


@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-task-ref-list-field [dataField]="field"></nc-task-ref-list-field>'
})
class TestWrapperComponent {
    field = new TaskRefField('', '', ['633c6187bb12a90925e0a17e'], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, []);
}
