import {LetDirective} from './let.directive';
import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";

describe('NoOpDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    })

    it('should create an instance', () => {
        const directive = new LetDirective();
        expect(directive).toBeTruthy();
    });

    it('should set', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'ncc-test-component',
    template: '<div *nccLet="this.nmr"></div>'
})
class TestComponent {
    nmr: number;
    constructor() {
        this.nmr = 0;
    }
}
