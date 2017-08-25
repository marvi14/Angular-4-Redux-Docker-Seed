import { Action } from '@ngrx/store';
import { User } from '../models/user';

export const ActionTypes = {
	LOG_USER: 'Log user to app',
	START_PM_LOGIN: 'Log user using PM Login',
	LOGOUT_USER: 'Logout user'
};

export class LogUserAction implements Action {
	type = ActionTypes.LOG_USER;

	constructor(public payload: User) { }
}

export class LoginAction implements Action {
	type = ActionTypes.START_PM_LOGIN;

	constructor(public payload: any) { }
}

export class LogoutUserAction implements Action {
	type = ActionTypes.LOGOUT_USER;

	constructor(public payload?: any) { }
}

export type Actions = LogUserAction | LoginAction | LogoutUserAction