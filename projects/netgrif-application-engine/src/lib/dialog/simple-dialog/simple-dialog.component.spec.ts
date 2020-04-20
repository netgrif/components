import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material';
import {SimpleDialogComponent} from './simple-dialog.component';

describe('SimpleDialogComponent', () => {
    let component: SimpleDialogComponent;
    let fixture: ComponentFixture<SimpleDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, DialogTestModule, BrowserAnimationsModule],
            declarations: [],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@NgModule({
    imports: [MatDialogModule, MaterialModule],
    declarations: [SimpleDialogComponent],
    exports: [SimpleDialogComponent],
    entryComponents: [
        SimpleDialogComponent
    ],
})
class DialogTestModule {
}
