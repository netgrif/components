import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserCardComponent} from './user-card.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material/material.module';

describe('UserCardComponent', () => {
    let component: UserCardComponent;
    let fixture: ComponentFixture<UserCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserCardComponent],
            imports: [
                CommonModule,
                RouterModule,
                MaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
