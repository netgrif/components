import {Component, OnInit} from '@angular/core';
import {Case, CaseResourceService, Count, MessageResource, UserService} from 'netgrif-application-engine';

@Component({
    selector: 'nae-app-case-resource-example',
    templateUrl: './case-resource-example.component.html',
    styleUrls: ['./case-resource-example.component.scss']
})
export class CaseResourceExampleComponent implements OnInit {

    constructor(private caseJsonResourceService: CaseResourceService) {
    }

    countvalue: Count = undefined;
    getAllCaseData: Array<Case> = undefined;
    getCaseData: Array<Case> = undefined;
    deleteCaseData: MessageResource = undefined;


    ngOnInit(): void {
    }

    count() {
        this.caseJsonResourceService.countCase({}).subscribe(count => {
            console.log(count);
            this.countvalue = count;
        });
    }

    getAllCase() {
        this.caseJsonResourceService.getAllCase().subscribe(cazes => {
            console.log(cazes);
            this.getAllCaseData = cazes;
        });
    }

    getCase() {
        this.caseJsonResourceService.searchCases({}).subscribe(cazes => {
            console.log(cazes);
            this.getCaseData = cazes;
        });
    }

    deleteCase() {
        this.caseJsonResourceService.deleteCase('5e781608750960460db29ddc').subscribe(caze => {
            console.log(caze);
            this.deleteCaseData = caze;
        });
    }

}
