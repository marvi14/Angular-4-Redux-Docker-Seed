import { Component } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar-routes.config';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TranslateService } from "@ngx-translate/core";
import { SweetAlertService } from "app/common/sweetAlert";
import { LoginService } from '../../modules/login/services/login.service';

declare var $: any;
@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent {

    private sidebarVisible: boolean;

    constructor(private _loginService: LoginService, private location: Location, private translate: TranslateService, private _alert: SweetAlertService) {
        this.location = location;
        this.sidebarVisible = $('.sidebar-mini').length > 0;
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        } else {
            return true;
        }
    }

    sidebarToggle() {
        if (this.sidebarVisible) {
            $('body').removeClass('sidebar-mini');
            this.sidebarVisible = false;
        }
        else {
            $('body').addClass('sidebar-mini');
            this.sidebarVisible = true;
        }
    }

    getTitle() {
        var route = this.location.prepareExternalUrl(this.location.path());
        var breadcrumbParts = route.split('/').slice(2, route.split('/').length);
        if (breadcrumbParts.length && breadcrumbParts.length > 0) {
            for (var j = 0; j < breadcrumbParts.length; j++) {
                var part = breadcrumbParts[j];
                if (part && part.indexOf('-') !== -1) {
                    var subParts = part.split('-');
                    for (var i = 0; i < subParts.length; i++) {
                        if (i === 0) {
                            part = '';
                            part += this.capitalizeTxt(subParts[i]);
                        } else {
                            part += ' ' + this.capitalizeTxt(subParts[i]);
                        }
                    }
                    breadcrumbParts[j] = part;
                }
            }
        }
        var title = '';
        for (var i = 0; i < breadcrumbParts.length; i++) {
            if (i === 0)
                title += this.capitalizeTxt(breadcrumbParts[i]);
            else
                title += '  ->  ' + this.capitalizeTxt(breadcrumbParts[i]);
        }
        return title;
    }

    capitalizeTxt(txt) {
        return txt.charAt(0).toUpperCase() + txt.slice(1);
    }

    getPath() {
        return this.location.prepareExternalUrl(this.location.path());
    }

    setLanguage(language) {
        this.translate.use(language);
    }

    logout() {
        this._alert.showConfirmationMessage(this.translate.instant('EXIT_TITLE'), this.translate.instant('EXIT_BODY'), (() => setTimeout(() => { this._loginService.logout() })));
    }
}
