import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import * as fromRoot from './reducers.index';
import { State, Store } from "@ngrx/store";

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

	constructor(private _store: Store<fromRoot.State>, private router: Router) { }

	//this is the guard that protects the /main path...we can have as many as we want with any business logic rule
	canActivate() {
		return this._store.let(fromRoot.getUser).map((user) => {
			if (user !== null)
				return true;
			else {
				this.router.navigate(['/login']);
				return false;
			}
		}).first();
	}
}