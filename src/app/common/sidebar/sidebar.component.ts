import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { RouteInfo } from './sidebar.model';
import { Store } from "@ngrx/store";
import * as fromRoot from '../../reducers.index';
import { User } from "../../modules/login/models/user";

declare var $: any;

var mda: any = {
    misc: {
        movingTab: '<div class="sidebar-moving-tab"/>',
        isChild: false,
        sidebarMenuActive: ''
    }
};

var sidebarTimer;

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: RouteInfo[];
    public loggedUser: User;

    constructor(private _store: Store<fromRoot.State>) {
        this._store.let(fromRoot.getUser).subscribe((user) => {
            this.loggedUser = user;
        });
    }

    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        if (isWindows) {
            // if we are on windows OS we activate the perfectScrollbar function
            var $sidebar = $('.sidebar-wrapper');
            $sidebar.perfectScrollbar();
        }
        this.menuItems = ROUTES;
        setTimeout(() => {
            $('#side-menu-container ul .active .collapse').addClass('in');
        });
    }
}