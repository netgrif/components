import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TreeCaseViewComponent} from './tree-case-view.component';

describe('TreeCaseViewComponent', () => {
    let component: TreeCaseViewComponent;
    let fixture: ComponentFixture<TreeCaseViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TreeCaseViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TreeCaseViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
