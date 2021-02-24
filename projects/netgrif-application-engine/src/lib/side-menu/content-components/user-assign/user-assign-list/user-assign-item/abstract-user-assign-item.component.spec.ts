import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {AbstractUserAssignItemComponent} from './abstract-user-assign-item.component';
import {UserValue} from '../../../../../data-fields/user-field/models/user-value';
import {TranslateLibModule} from '../../../../../translate/translate-lib.module';
import {MaterialModule} from '../../../../../material/material.module';

describe('AbstractUserAssignItemComponent', () => {
    let component: TestUserComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule
            ],
            declarations: [
                TestUserComponent,
                TestWrapperComponent
            ]
        }).compileComponents();
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
    selector: 'nae-test-user',
    template: ''
})
class TestUserComponent extends AbstractUserAssignItemComponent {
    constructor() {
        super();
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-user [user]="user"></nae-test-user>'
})
class TestWrapperComponent {
    user = new UserValue('0', '', '', '');
}
