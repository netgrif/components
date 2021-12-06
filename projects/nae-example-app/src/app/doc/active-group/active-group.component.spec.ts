import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActiveGroupComponent} from './active-group.component';

describe('ActiveGroupComponent', () => {
    let component: ActiveGroupComponent;
    let fixture: ComponentFixture<ActiveGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ActiveGroupComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ActiveGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
