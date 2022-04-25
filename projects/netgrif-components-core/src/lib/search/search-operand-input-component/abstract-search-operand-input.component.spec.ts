import {AbstractSearchOperandInputComponent} from './abstract-search-operand-input.component';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormControl} from '@angular/forms';
import {SearchInputType} from '../models/category/search-input-type';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AbstractSearchOperandInputComponent', () => {
    let component: TestSearchOperandInputComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule],
            declarations: [
                TestSearchOperandInputComponent,
                TestWrapperComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
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

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-search-operand-input [inputFormControl]="formControl" [inputType]="searchInputType.TEXT" [first]="true">' +
        '</nae-search-operand-input>'
})
class TestWrapperComponent {

    formControl = new FormControl();
    searchInputType = SearchInputType;
}
