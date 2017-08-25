import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { LoginService } from "../services/login.service";
import * as loginActions from "../actions/login";
import { User } from '../models/user';

@Injectable()
export class LoginEffects {
	constructor(private _actions: Actions, private loginService: LoginService) { }

	//The effects for different states are singletons that 'intercept' dispatched actions that are being sent to the reducer, in order to perform an intermediate action,
	//we call this a Middleware
	@Effect() loginUserPM = this._actions.ofType(loginActions.ActionTypes.START_PM_LOGIN).switchMap(
		(action) => this.loginService.login(action.payload)
			.map((user) => new loginActions.LogUserAction(user))
			.catch(() => Observable.of(new loginActions.LogUserAction(null)))
	);

}