import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LayoutContainerWrapperComponent} from './layout-container-wrapper.component';

describe('LayoutContainerWrapperComponent', () => {
    let component: LayoutContainerWrapperComponent;
    let fixture: ComponentFixture<LayoutContainerWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LayoutContainerWrapperComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LayoutContainerWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
