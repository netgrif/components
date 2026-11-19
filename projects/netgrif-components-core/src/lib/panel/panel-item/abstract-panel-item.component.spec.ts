import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractPanelItemComponent } from './abstract-panel-item.component';
import { FeaturedValue } from '../abstract/featured-value';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';

describe('AbstractPanelItemComponent', () => {
    let component: TestPanelItemComponent;
    let fixture: ComponentFixture<TestPanelItemComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestPanelItemComponent],
            imports: [
            ],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
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
    selector: 'ncc-test-immediate-filter-text',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestPanelItemComponent extends AbstractPanelItemComponent {
    constructor() {
        super();
        this.leadingIcon = 'label';
        this.leadingIconEnabled = true;
        this.textEllipsis = true;
        this.featuredValue = {
            type: 'text',
            icon: 'label',
            value: 'text'
        } as FeaturedValue;
    }
}
