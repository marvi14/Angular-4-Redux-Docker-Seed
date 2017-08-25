import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { LoginService } from './services/login.service';
import { SweetAlertService } from '../../common/sweetAlert';
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../reducers.index';
import * as loginActions from './actions/login';
declare var $: any;

@Component({
	templateUrl: './login.component.html'

})
export class LoginComponent implements OnInit {

	public credentials: any = {
		email: null,
		name: null,
		password: null
	};

	constructor(private _loginService: LoginService, private _alert: SweetAlertService, private translate: TranslateService, private _store: Store<fromRoot.State>) {
		setTimeout(() => {
			$('#login-form').keypress((e) => {
				if (e.keyCode == 13) {
					this.pmLogin();
					return false;
				}
			});
		});
	}

	checkFullPageBackgroundImage() {
		var $page = $('.full-page');
		var image_src = $page.data('image');

		if (image_src !== undefined) {
			var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
			$page.append(image_container);
		}
	}

	ngOnInit() {
		this.checkFullPageBackgroundImage();
		setTimeout(function () {
			// after 1000 ms we add the class animated to the login/register card
			$('.card').removeClass('card-hidden');
		}, 1000)
	}

	pmLogin() {
		if ($('#login-form').valid()) {
			this._store.dispatch(new loginActions.LoginAction(this.credentials));
		}
	}
}