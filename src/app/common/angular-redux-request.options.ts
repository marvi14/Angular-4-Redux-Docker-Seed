import { BaseRequestOptions } from '@angular/http';
import { Store } from "@ngrx/store";
import * as fromRoot from '../reducers.index';
import { Injectable } from "@angular/core";

@Injectable()
export class AngularReduxRequestOptions extends BaseRequestOptions {

    constructor(private _store: Store<fromRoot.State>) {
        super();
        this.headers.append('Content-type', 'application/json; charset=utf-8');
        // In case we need a token to our HTTP requests against our BE API
        // this._store.let(fromRoot.getUser).subscribe((user) => {
        //     if (user && user.access_token)
        //         this.headers.append('Authorization', 'Bearer ' + user.access_token);
        // });
    }
}