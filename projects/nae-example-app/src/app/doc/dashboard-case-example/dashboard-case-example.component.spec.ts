import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardCaseExampleComponent} from './dashboard-case-example.component';

describe('DashboardCaseExampleComponent', () => {
    let component: DashboardCaseExampleComponent;
    let fixture: ComponentFixture<DashboardCaseExampleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardCaseExampleComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardCaseExampleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
