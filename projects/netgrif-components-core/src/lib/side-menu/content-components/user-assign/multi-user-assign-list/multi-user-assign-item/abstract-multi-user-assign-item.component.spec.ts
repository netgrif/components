import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {AbstractMultiUserAssignItemComponent} from './abstract-multi-user-assign-item.component';
import {UserValue} from '../../../../../data-fields/user-field/models/user-value';
import {TranslateLibModule} from '../../../../../translate/translate-lib.module';
import {MaterialModule} from '../../../../../material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AbstractMultiUserAssignItemComponent', () => {
    let component: TestUserComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule,
                HttpClientTestingModule
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
    selector: 'ncc-test-user',
    template: ''
})
class TestUserComponent extends AbstractMultiUserAssignItemComponent {
    constructor() {
        super();
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-user [user]="user"></ncc-test-user>'
})
class TestWrapperComponent {
    user = new UserValue('0', '', '', '');
}
