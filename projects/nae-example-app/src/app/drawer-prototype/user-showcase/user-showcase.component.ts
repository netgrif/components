import {AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User} from '@netgrif/application-engine';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

export type Mode = 'full' | 'horizontal' | 'vertical' | 'icon';

@Component({
    selector: 'nae-app-user-showcase',
    templateUrl: './user-showcase.component.html',
    styleUrls: ['./user-showcase.component.scss']
})
export class UserShowcaseComponent implements OnInit, AfterViewInit {

    @Input() public mode: Mode;
    @Input() public user: User;

    constructor(private _matIconRegistry: MatIconRegistry, private _sanitizer: DomSanitizer) {
        _matIconRegistry.addSvgIcon('default-user-avatar',
            _sanitizer.bypassSecurityTrustResourceUrl('assets/avatar-default.svg'));
    }

    ngOnInit(): void {
        if (!this.mode) {
            this.mode = 'horizontal';
        }
    }

    ngAfterViewInit(): void {
    }
}
