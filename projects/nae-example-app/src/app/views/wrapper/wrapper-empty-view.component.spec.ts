import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { WrapperEmptyViewComponent } from './wrapper-empty-view.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('WrapperEmptyViewComponent', () => {
   let component: WrapperEmptyViewComponent;
   let fixture: ComponentFixture<WrapperEmptyViewComponent>;

   beforeEach(waitForAsync(() => {
       TestBed.configureTestingModule({
           declarations: [WrapperEmptyViewComponent],
           schemas: [CUSTOM_ELEMENTS_SCHEMA]
       }).compileComponents();
   }));

   beforeEach(() => {
       fixture = TestBed.createComponent(WrapperEmptyViewComponent);
       component = fixture.componentInstance;
       fixture.detectChanges();
   });

   it('should create', () => {
       expect(component).toBeTruthy();
   });
});
