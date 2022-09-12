import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {UserImpersonateItemComponent} from './user-impersonate-item.component';
import {Component} from '@angular/core';
import {MaterialModule, TranslateLibModule, UserValue} from '@netgrif/components-core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('UserAssignItemComponent', () => {
    let component: UserImpersonateItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule],
            declarations: [
                UserImpersonateItemComponent,
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
    template: '<nc-user-impersonate-item [user]="user"></nc-user-impersonate-item>'
})
class TestWrapperComponent {
    user = new UserValue('0', '', '', '');
}
