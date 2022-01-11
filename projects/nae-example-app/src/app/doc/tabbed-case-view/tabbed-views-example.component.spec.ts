import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabbedViewsExampleComponent} from './tabbed-views-example.component';
import {MaterialModule} from '@netgrif/application-engine';
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
});
