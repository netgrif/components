import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabViewExampleComponent} from './tab-view-example.component';
import {MaterialModule} from '@netgrif/application-engine';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TabViewExampleComponent', () => {
    let component: TabViewExampleComponent;
    let fixture: ComponentFixture<TabViewExampleComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, HttpClientTestingModule],
            declarations: [TabViewExampleComponent],
            providers: []
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TabViewExampleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
