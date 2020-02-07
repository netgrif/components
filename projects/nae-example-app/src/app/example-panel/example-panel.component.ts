import {Component, Input, OnInit} from '@angular/core';

export interface PeriodicElement {
    name: string;
    description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {name: '@Input() featuredFields: Array<string>', description: 'Featured headlines for panel. '},
    {name: '@Input() panelIcon: string', description: 'Identifier for the icon to be placed at the beginning of the panel. It\'s necessary to select the identifier for logo from the material design'},
    {name: '@Input() expansionDisabled: boolean', description: 'Panels can be disabled using the expansionDisabled attribute. A disabled expansion panel can\'t be toggled by the user, but can still be manipulated programmatically.'}
];

@Component({
    selector: 'nae-app-example-panel',
    templateUrl: './example-panel.component.html',
    styleUrls: ['./example-panel.component.scss']
})
export class ExamplePanelComponent implements OnInit {
    displayedColumns: string[] = ['name', 'description'];
    dataSource = ELEMENT_DATA;
    codeSnippet = `
        <mat-accordion>
            <mat-expansion-panel [disabled]="expansionDisabled" hideToggle (afterExpand)="showSpinner=false"
                                 (afterCollapse)="showSpinner=false"
                                 (click)="showSpinner=true">
                <mat-expansion-panel-header>
                    <mat-panel-description fxLayout="row" fxLayoutAlign=" center">
                        <mat-icon fxLayout="row">{{panelIcon}}</mat-icon>
                        <span fxLayout="row" fxLayoutAlign="center" class="panel-heading" *ngFor="let field of featuredFields;"
                              fxFlex>{{field}}</span>
                        <div fxLayout="row" fxLayoutAlign="end center" fxFlex="10">
                            <button mat-button (click)="show($event)" *ngIf="!showSpinner">
                                <mat-icon>more_vert</mat-icon>
                            </button>
                            <mat-spinner *ngIf="showSpinner" [diameter]="30"></mat-spinner>
                        </div>
                    </mat-panel-description>
                </mat-expansion-panel-header>
                <div class="panel-main-content">
                    <ng-content></ng-content>
                </div>
            </mat-expansion-panel>
        </mat-accordion>
        `;

    constructor() {
    }

    ngOnInit() {
    }

}
