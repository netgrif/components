import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UserAssignItemComponent} from './user-assign-item.component';
import {Component} from '@angular/core';
import {TranslateLibModule, MaterialModule, UserValue} from '@netgrif/application-engine';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('UserAssignItemComponent', () => {
    let component: UserAssignItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
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

    afterAll(() => {
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
