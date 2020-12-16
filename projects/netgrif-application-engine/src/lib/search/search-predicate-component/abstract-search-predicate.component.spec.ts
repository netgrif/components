import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AbstractSearchPredicateComponent} from './abstract-search-predicate.component';
import {Component} from '@angular/core';

describe('AbstractSearchPredicateComponent', () => {
    let component: TestSearchPredicateComponent;
    let fixture: ComponentFixture<TestSearchPredicateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestSearchPredicateComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestSearchPredicateComponent);
        component = fixture.componentInstance;
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
    selector: 'nae-search-predicate',
    template: ''
})
class TestSearchPredicateComponent extends AbstractSearchPredicateComponent {
    constructor() {
        super();
    }
}
