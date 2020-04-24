import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskListComponent} from './task-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {PanelModule} from '../panel.module';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TaskListComponent', () => {
    let component: TaskListComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatExpansionModule,
                PanelModule,
                MaterialModule,
                NoopAnimationsModule,
                CommonModule,
                HttpClientTestingModule
            ],
            declarations: [TestWrapperComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-task-list [taskPanels]="taskPanels"></nae-task-list>'
})
class TestWrapperComponent {
    taskPanels = [];
}
