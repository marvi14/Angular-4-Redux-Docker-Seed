import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { Location } from '@angular/common';

declare var $: any;

@Component({
	templateUrl: './404.template.html',
	styleUrls: ['404.component.css']
})
export class Page404Component {

	constructor(private translate: TranslateService, private _location: Location) { }

	handle404Back() {
		this._location.back();
	}
}