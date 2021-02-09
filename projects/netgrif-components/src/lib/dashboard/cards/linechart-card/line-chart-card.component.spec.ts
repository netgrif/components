import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {LineChartCardComponent} from './line-chart-card.component';
import {CommonModule} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {HttpClientTestingModule} from '@angular/common/http/testing';

// describe('LinechartCardComponent', () => {
//     let component: LineChartCardComponent;
//     let fixture: ComponentFixture<LineChartCardComponent>;
//
//     beforeEach(waitForAsync(() => {
//         TestBed.configureTestingModule({
//             imports: [CommonModule, NoopAnimationsModule, NgxChartsModule, HttpClientTestingModule, MaterialModule],
//             declarations: [LineChartCardComponent]
//         })
//             .compileComponents();
//     }));
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(LineChartCardComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
