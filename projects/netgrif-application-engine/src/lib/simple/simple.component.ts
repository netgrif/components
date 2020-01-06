import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'nae-simple',
	templateUrl: './simple.component.html',
	styleUrls: ['./simple.component.scss']
})
export class SimpleComponent implements OnInit {

	names = ['milan', 'martin', 'tomáš', 'juraj'];
	chosen: string;

	constructor() {
	}

	ngOnInit() {
	}

	onSubmit() {
		console.log('Submited name ' + this.chosen);
	}

}
