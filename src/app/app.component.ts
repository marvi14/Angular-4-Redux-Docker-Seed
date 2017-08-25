import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from "@angular/router";
import { FormValidations } from './common/formValidations';
import { Location } from '@angular/common';
import { LoginService } from "./modules/login/services/login.service";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { PushNotifications } from "./common/pushNotifications";
import { Store } from "@ngrx/store";
import * as fromRoot from './reducers.index';
declare var $: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
	constructor(private translate: TranslateService, private _pushNotifications: PushNotifications, private _store: Store<fromRoot.State>,
		private router: Router, private formValidations: FormValidations, private location: Location, public auth: LoginService, private slimLoadingBarService: SlimLoadingBarService) {
		//english language set as default, however, it will try to take the browser laguage
		//let browserLang = translate.getBrowserLang();
		//translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
		translate.use('en');

		//initialize forms custom validations
		formValidations.init();

		router.events.subscribe((event: RouterEvent) => {
			this.navigationInterceptor(event);
		});

		if ('serviceWorker' in navigator) {
			this._store.let(fromRoot.getUser).subscribe((user) => {
				if (user)
					this._pushNotifications.subscribe();
				else
					this._pushNotifications.unsubscribe();
			});
		}
	}

	// Shows and hides the loading spinner during RouterEvent changes
	navigationInterceptor(event: RouterEvent): void {
		var route = this.location.prepareExternalUrl(this.location.path());
		if (route.indexOf('app') !== -1) {
			if (event instanceof NavigationStart) {
				if (event.url.indexOf('app') !== -1) {
					this.slimLoadingBarService.progress = 30;
					this.slimLoadingBarService.start();
				}
			}
			else if (event instanceof NavigationEnd) {
				$('.main-panel').animate({
					scrollTop: 0
				}, 500);
				if (event.url.indexOf('app') !== -1)
					setTimeout(() => this.slimLoadingBarService.complete(), 500);
			}
			// Set loading state to false in both of the below events to hide the spinner in case a request fails
			else if (event instanceof NavigationCancel) {
				if (event.url.indexOf('app') !== -1)
					this.slimLoadingBarService.complete();
			}
			else if (event instanceof NavigationError) {
				if (event.url.indexOf('app') !== -1)
					this.slimLoadingBarService.complete();
			} else {
				this.slimLoadingBarService.complete();
			}
		}
	}

	ngOnInit() {
		let body = document.getElementsByTagName('body')[0];
		var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
		if (isWindows) {
			// if we are on windows OS we activate the perfectScrollbar function
			body.classList.add("perfect-scrollbar-on");
		} else {
			body.classList.add("perfect-scrollbar-off");
		}

		//initialize materialize
		$.material.init();
	}
}
