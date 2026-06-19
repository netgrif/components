import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {BuilderTabsExampleComponent} from './builder-tabs-example.component';
import {MaterialModule} from '@netgrif/components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TabViewExampleComponent', () => {
    let component: BuilderTabsExampleComponent;
    let fixture: ComponentFixture<BuilderTabsExampleComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, HttpClientTestingModule],
            declarations: [BuilderTabsExampleComponent],
            providers: []
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BuilderTabsExampleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
