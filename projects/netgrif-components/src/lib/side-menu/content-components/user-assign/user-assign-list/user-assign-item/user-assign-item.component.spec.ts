import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {UserAssignItemComponent} from './user-assign-item.component';
import {Component} from '@angular/core';
import {MaterialModule, TranslateLibModule, UserValue} from '@netgrif/components-core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('UserAssignItemComponent', () => {
    let component: UserAssignItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule],
            declarations: [
                UserAssignItemComponent,
                TestWrapperComponent
            ]
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
