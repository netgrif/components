import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewCaseComponent} from './new-case.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';

describe('NewCaseComponent', () => {
    // let component: NewCaseComponent;
    // let fixture: ComponentFixture<NewCaseComponent>;
    //
    // beforeEach(async(() => {
    //     TestBed.configureTestingModule({
    //         imports: [
    //             CommonModule,
    //             MaterialModule,
    //             BrowserAnimationsModule,
    //             HttpClientTestingModule
    //         ],
    //         declarations: [NewCaseComponent],
    //         providers: [{
    //             provide: NAE_SIDE_MENU_CONTROL, factory: () => {
    //                 return new SideMenuControl(null, null, null);
    //             }
    //         },
    //             {
    //                 provide: ConfigurationService, factory: () => {
    //                     return new (class TempConfig extends ConfigurationService {
    //                         constructor() {
    //                             super({
    //                                 providers: {
    //                                     auth: {
    //                                         address: 'string',
    //                                         authentication: 'string'
    //                                     },
    //                                     resources: {
    //                                         name: 'string',
    //                                         address: 'string',
    //                                         format: 'string'
    //                                     }
    //                                 }, theme: {
    //                                     name: '',
    //                                     pallets: {
    //                                         light: {
    //                                             primary: ''
    //                                         },
    //                                         dark: {}
    //                                     }
    //                                 }, assets: [],
    //                                 views: {
    //                                     layout: 'string'
    //                                 }
    //                             });
    //                         }
    //                     })();
    //                 }
    //             }]
    //     })
    //         .compileComponents();
    // }));
    //
    // beforeEach(() => {
    //     fixture = TestBed.createComponent(NewCaseComponent);
    //     component = fixture.componentInstance;
    //     fixture.detectChanges();
    // });
    //
    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
