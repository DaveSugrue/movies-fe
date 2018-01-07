import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ITicker } from './ticker';
import { KrakenService } from './kraken.service';

@Component({
	moduleId: module.id,
	selector: 'kraken-component',
	templateUrl: 'kraken.component.html'
})

export class KrakenComponent implements OnInit{
	pageTitle: string = 'Kraken';
	ticker: ITicker;
	errorMessage: string;
	openPrice: number;
	lastTradeClosed: number;
	value: number;
	profit: number;
	percent: number;

	constructor(private _route: ActivatedRoute, private _router: Router, private _krakenService: KrakenService) {
	}

	ngOnInit(): void{
		this._krakenService.getTicker()
			.subscribe(
					ticker => {
						this.ticker = ticker;
						this.openPrice = this.ticker.XXRPZEUR.o
						this.lastTradeClosed = this.ticker.XXRPZEUR.c[0];
						this.value = this.lastTradeClosed * 125;
						this.profit = this.value - 250;
						this.percent = (this.profit / 250) * 100;
					},
					error => {
						this.errorMessage = <any>error;
						console.log('ERROR !!! ' + this.errorMessage);
					});
		
	}

	onBack(): void {
		this._router.navigate(['/home']);
	}

}