import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {User} from '../../user';
import {UserAssignItemComponent} from './user-assign-item.component';
import {Component} from '@angular/core';

describe('UserAssignItemComponent', () => {
    let component: UserAssignItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-user-assign-item [user]="user"></nae-user-assign-item>'
})
class TestWrapperComponent {
    user = new User('', '', '');
}
