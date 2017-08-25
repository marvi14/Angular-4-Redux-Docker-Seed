import { HttpService } from '../../../common/HttpService';
import * as fromRoot from '../../../reducers.index';
import { Injectable } from '@angular/core';
import { State, Store } from "@ngrx/store";
import { User } from '../models/user';
import * as loginActions from '../actions/login';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import auth0 from 'auth0-js';
import { HttpNotificationsService } from "../../../common/httpNotificationsService";


@Injectable()
export class LoginService {

	constructor(private http: HttpService, private _store: Store<fromRoot.State>, private translate: TranslateService, private router: Router, private _httpNotifications: HttpNotificationsService) { }

	public login(credentials) {
		return this.http.get('').map((fake) => {
			var loggedUser = new User(credentials.email, credentials.name);
			localStorage.setItem('user', JSON.stringify(loggedUser));
			this.router.navigate(['/app/dashboard']);
			return loggedUser;
		});
	}

	public logout() {
		// Remove tokens and expiry time from localStorage
		localStorage.removeItem('user');
		this.router.navigate(['/login']);
		//we wait for subscribers to unsubscribe from redux store observable
		setTimeout(() => {
			this._store.dispatch(new loginActions.LogoutUserAction());
		}, 1000);
	}

}