import {AbstractSearchOperandInputComponent} from './abstract-search-operand-input.component';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormControl} from '@angular/forms';
import {SearchInputType} from '../models/category/search-input-type';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractSearchOperandInputComponent', () => {
    let component: TestSearchOperandInputComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestSearchOperandInputComponent,
                TestWrapperComponent
            ],
            imports: [],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
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
    selector: 'ncc-search-operand-input',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestSearchOperandInputComponent extends AbstractSearchOperandInputComponent {
    constructor() {
        super();
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-search-operand-input [inputFormControl]="formControl" [inputType]="searchInputType.TEXT" [first]="true">' +
        '</ncc-search-operand-input>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {

    formControl = new FormControl();
    searchInputType = SearchInputType;
}
