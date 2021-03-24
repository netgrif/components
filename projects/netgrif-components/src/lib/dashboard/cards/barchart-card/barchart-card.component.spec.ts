import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {BarchartCardComponent} from './barchart-card.component';
import {CommonModule} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {HttpClientTestingModule} from '@angular/common/http/testing';

// describe('BarchartCardComponent', () => {
//     let component: BarchartCardComponent;
//     let fixture: ComponentFixture<BarchartCardComponent>;
//
//     beforeEach(waitForAsync(() => {
//         TestBed.configureTestingModule({
//             imports: [CommonModule, NoopAnimationsModule, NgxChartsModule, HttpClientTestingModule, MaterialModule],
//             declarations: [BarchartCardComponent]
//         })
//             .compileComponents();
//     }));
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(BarchartCardComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
