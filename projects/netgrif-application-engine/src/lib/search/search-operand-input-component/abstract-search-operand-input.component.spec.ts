import {AbstractSearchOperandInputComponent} from './abstract-search-operand-input.component';
import {Component} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

describe('AbstractSearchOperandInputComponent', () => {
    let component: TestSearchOperandInputComponent;
    let fixture: ComponentFixture<TestSearchOperandInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestSearchOperandInputComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestSearchOperandInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-search-operand-input',
    template: ''
})
class TestSearchOperandInputComponent extends AbstractSearchOperandInputComponent {
    constructor() {
        super();
    }
}
