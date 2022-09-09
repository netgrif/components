import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskRefDashboardTileComponent} from './task-ref-dashboard-tile.component';

describe('TaskRefDashboardTileComponent', () => {
    let component: TaskRefDashboardTileComponent;
    let fixture: ComponentFixture<TaskRefDashboardTileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskRefDashboardTileComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskRefDashboardTileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
