import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchOperandInputComponent} from './search-operand-input.component';
import {Component} from '@angular/core';
import {MaterialModule, SearchInputType} from '@netgrif/application-engine';
import {FormControl} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AdvancedSearchComponentModule} from '../advanced-search.module';

describe('SearchOperandInputComponent', () => {
    let component: SearchOperandInputComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                AdvancedSearchComponentModule,
                MaterialModule,
                NoopAnimationsModule
            ],
            declarations: [
                TestWrapperComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-search-operand-input [inputType]="searchInputType.TEXT" [inputFormControl]="fc" [first]="true">' +
        '</nc-search-operand-input>'
})
class TestWrapperComponent {

    public searchInputType = SearchInputType;
    public fc = new FormControl();

}
