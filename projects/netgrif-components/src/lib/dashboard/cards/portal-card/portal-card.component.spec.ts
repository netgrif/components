import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PortalCardComponent} from './portal-card.component';
import {CommonModule} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from 'netgrif-application-engine';

// describe('CustomCardComponent', () => {
//     let component: PortalCardComponent;
//     let fixture: ComponentFixture<PortalCardComponent>;
//
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [CommonModule, NoopAnimationsModule, NgxChartsModule, HttpClientTestingModule, MaterialModule],
//             declarations: [PortalCardComponent]
//         })
//             .compileComponents();
//     }));
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(PortalCardComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });