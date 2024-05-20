import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MultiUserAssignItemComponent} from './multi-user-assign-item.component';
import {MaterialModule, TranslateLibModule, UserValue} from "@netgrif/components-core";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('MultiUserAssignItemComponent', () => {
    let component: MultiUserAssignItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule
            ],
            declarations: [
                MultiUserAssignItemComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-user-assign-item [user]="user"></nc-user-assign-item>'
})
class TestWrapperComponent {
    user = new UserValue('0', '', '', '');
}
