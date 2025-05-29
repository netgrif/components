import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AbstractLayoutContainerWrapperComponent} from './abstract-layout-container-wrapper.component';
import {Component} from '@angular/core';

describe('AbstractLayoutContainerWrapperComponent', () => {
    let component: TestLayoutContainerWrapperComponent;
    let fixture: ComponentFixture<TestLayoutContainerWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AbstractLayoutContainerWrapperComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestLayoutContainerWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'ncc-test-container-wrapper',
    template: ''
})
class TestLayoutContainerWrapperComponent extends AbstractLayoutContainerWrapperComponent {
    constructor() {
        super();
    }
}

