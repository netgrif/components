import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchPredicateComponent} from './search-predicate.component';

describe('SearchPredicateComponent', () => {
    let component: SearchPredicateComponent;
    let fixture: ComponentFixture<SearchPredicateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchPredicateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchPredicateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
