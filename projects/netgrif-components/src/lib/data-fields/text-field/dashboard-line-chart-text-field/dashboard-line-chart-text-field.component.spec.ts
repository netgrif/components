import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardLineChartTextFieldComponent} from './dashboard-line-chart-text-field.component';

describe('DashboardLineChartTextFieldComponent', () => {
    let component: DashboardLineChartTextFieldComponent;
    let fixture: ComponentFixture<DashboardLineChartTextFieldComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardLineChartTextFieldComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardLineChartTextFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
