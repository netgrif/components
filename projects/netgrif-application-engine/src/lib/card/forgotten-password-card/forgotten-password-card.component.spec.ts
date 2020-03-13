import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ForgottenPasswordCardComponent} from './forgotten-password-panel.component';
import {FormBuilder, FormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatFormFieldModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('ForgottenPasswordPanelComponent', () => {
    let component: ForgottenPasswordCardComponent;
    let fixture: ComponentFixture<ForgottenPasswordCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FlexLayoutModule, MatCardModule, MatButtonModule, MatFormFieldModule, FormsModule],
            declarations: [ForgottenPasswordCardComponent],
            providers: [FormBuilder]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgottenPasswordCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
