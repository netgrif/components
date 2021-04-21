import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ImmediateFilterTextComponent} from './immediate-filter-text.component';

describe('ImmediateFilterTextComponent', () => {
    let component: ImmediateFilterTextComponent;
    let fixture: ComponentFixture<ImmediateFilterTextComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImmediateFilterTextComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImmediateFilterTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
