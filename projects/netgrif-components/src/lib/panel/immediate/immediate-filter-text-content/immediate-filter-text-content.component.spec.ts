import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ImmediateFilterTextContentComponent} from './immediate-filter-text-content.component';

describe('ImmediateFilterTextContentComponent', () => {
    let component: ImmediateFilterTextContentComponent;
    let fixture: ComponentFixture<ImmediateFilterTextContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImmediateFilterTextContentComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImmediateFilterTextContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
