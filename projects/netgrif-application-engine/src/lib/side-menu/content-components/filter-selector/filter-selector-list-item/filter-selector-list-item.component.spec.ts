import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterSelectorListItemComponent} from './filter-selector-list-item.component';
import {Component} from '@angular/core';
import {SimpleFilter} from '../../../../filter/models/simple-filter';
import {FilterType} from '../../../../filter/models/filter-type';

describe('FilterSelectorListItemComponent', () => {
    let component: FilterSelectorListItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FilterSelectorListItemComponent,
                TestWrapperComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-filter-selector-list-item [filter]="filter"></nae-filter-selector-list-item>'
})
class TestWrapperComponent {
    filter = new SimpleFilter('', FilterType.CASE, {});
}
