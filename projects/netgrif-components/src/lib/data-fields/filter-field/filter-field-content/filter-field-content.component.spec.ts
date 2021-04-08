import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterFieldContentComponent} from './filter-field-content.component';

describe('FilterFieldContentComponent', () => {
    let component: FilterFieldContentComponent;
    let fixture: ComponentFixture<FilterFieldContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FilterFieldContentComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterFieldContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
