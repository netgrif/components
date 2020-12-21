import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchClauseComponent} from './search-clause.component';

describe('SearchClauseComponent', () => {
    let component: SearchClauseComponent;
    let fixture: ComponentFixture<SearchClauseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchClauseComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchClauseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
