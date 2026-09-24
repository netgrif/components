import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabbedViewsExampleComponent} from './tabbed-views-example.component';
import {HeaderSortingMode, MaterialModule} from '@netgrif/components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TabViewExampleComponent', () => {
    let component: TabbedViewsExampleComponent;
    let fixture: ComponentFixture<TabbedViewsExampleComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, HttpClientTestingModule],
            declarations: [TabbedViewsExampleComponent],
            providers: []
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TabbedViewsExampleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should configure single, multi and combined sorting examples', () => {
        expect(component.tabs[0].injectedObject).toEqual(jasmine.objectContaining({
            exampleUseCache: true,
            headerSortingMode: HeaderSortingMode.SINGLE
        }));
        expect(component.tabs[1].injectedObject).toEqual(jasmine.objectContaining({
            exampleUseCache: false,
            headerSortingMode: HeaderSortingMode.MULTI
        }));
        expect(component.tabs[2].injectedObject).toEqual(jasmine.objectContaining({
            exampleUseCache: true,
            headerSortingMode: HeaderSortingMode.COMBINED
        }));
    });
});
