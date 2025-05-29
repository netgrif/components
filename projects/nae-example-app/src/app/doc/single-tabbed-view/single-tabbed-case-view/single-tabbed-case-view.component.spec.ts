import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleTabbedCaseViewComponent} from './single-tabbed-case-view.component';

describe('SingleTabbedCaseViewComponent', () => {
    let component: SingleTabbedCaseViewComponent;
    let fixture: ComponentFixture<SingleTabbedCaseViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SingleTabbedCaseViewComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleTabbedCaseViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
