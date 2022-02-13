import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {ErrorSnackBarComponent} from './error-snack-bar.component';
import {MaterialModule} from '../../../material/material.module';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

// describe('ErrorSnackBarComponent', () => {
//     let component: ErrorSnackBarComponent;
//     let fixture: ComponentFixture<ErrorSnackBarComponent>;
//
//     beforeEach(waitForAsync(() => {
//         TestBed.configureTestingModule({
//             imports: [MaterialModule],
//             declarations: [ErrorSnackBarComponent]
//         }).overrideModule(BrowserDynamicTestingModule, {
//                 set: {
//                     entryComponents: [
//                         ErrorSnackBarComponent
//                     ]
//                 }
//             }).compileComponents();
//     }));
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(ErrorSnackBarComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
