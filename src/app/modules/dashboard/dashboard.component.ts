import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../reducers.index';
import { User } from "../login/models/user";
declare var $: any;

@Component({
    templateUrl: './dashboard.component.html'

})
export class DashboardComponent {

    public loggedUser: User;

    constructor(private translate: TranslateService, private _store: Store<fromRoot.State>) {
        this._store.let(fromRoot.getUser).subscribe((user) => {
            if (user)
                this.loggedUser = user;
        });
    }
}