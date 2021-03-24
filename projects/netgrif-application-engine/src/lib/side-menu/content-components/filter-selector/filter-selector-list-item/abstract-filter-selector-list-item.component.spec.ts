import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {AbstractFilterSelectorListItemComponent} from './abstract-filter-selector-list-item.component';
import {SimpleFilter} from '../../../../filter/models/simple-filter';
import {FilterType} from '../../../../filter/models/filter-type';

describe('AbstractFilterSelectorListItemComponent', () => {
    let component: TestFilterComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule],
            declarations: [
                TestFilterComponent,
                TestWrapperComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-filter',
    template: ''
})
class TestFilterComponent extends AbstractFilterSelectorListItemComponent {
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-filter [filter]="filter"></nae-test-filter>'
})
class TestWrapperComponent {
    filter = new SimpleFilter('', FilterType.CASE, {});
}
