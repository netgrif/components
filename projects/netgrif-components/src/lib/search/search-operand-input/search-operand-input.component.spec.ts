import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchOperandInputComponent} from './search-operand-input.component';

describe('SearchOperandInputComponent', () => {
    let component: SearchOperandInputComponent;
    let fixture: ComponentFixture<SearchOperandInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchOperandInputComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchOperandInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
