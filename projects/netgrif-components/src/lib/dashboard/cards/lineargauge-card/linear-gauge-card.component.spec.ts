import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {LinearGaugeCardComponent} from './linear-gauge-card.component';
import {CommonModule} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {HttpClientTestingModule} from '@angular/common/http/testing';

// describe('LineargaugeCardComponent', () => {
//     let component: LinearGaugeCardComponent;
//     let fixture: ComponentFixture<LinearGaugeCardComponent>;
//
//     beforeEach(waitForAsync(() => {
//         TestBed.configureTestingModule({
//             imports: [CommonModule, NoopAnimationsModule, NgxChartsModule, HttpClientTestingModule, MaterialModule],
//             declarations: [LinearGaugeCardComponent]
//         })
//             .compileComponents();
//     }));
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(LinearGaugeCardComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
