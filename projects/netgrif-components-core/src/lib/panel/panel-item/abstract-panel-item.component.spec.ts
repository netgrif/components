import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component} from '@angular/core';
import { AbstractPanelItemComponent } from './abstract-panel-item.component';
import { FeaturedValue } from '../abstract/featured-value';

describe('AbstractPanelItemComponent', () => {
    let component: TestPanelItemComponent;
    let fixture: ComponentFixture<TestPanelItemComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule, HttpClientTestingModule
            ],
            declarations: [TestPanelItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPanelItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should have featuredValue', () => {
       expect(component.featuredValue.value).toEqual('text');
    });

    it('should have label icon as leading', () => {
        expect(component.leadingIcon).toEqual('label');
    });
});

@Component({
    selector: 'nae-test-immediate-filter-text',
    template: ''
})
class TestPanelItemComponent extends AbstractPanelItemComponent {
    constructor() {
        super();
        this.leadingIcon = 'label';
        this.index = 0;
        this.textEllipsis = true;
        this.featuredValue = {
            type: 'text',
            icon: 'label',
            value: 'text'
        } as FeaturedValue;
    }
}
