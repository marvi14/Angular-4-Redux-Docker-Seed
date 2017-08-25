import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XHRBackend, RequestOptions } from '@angular/http';
import { HttpService } from './HttpService';
import { httpServiceFactory } from './http-service.factory';
import { AngularReduxRequestOptions } from './angular-redux-request.options';
import { LoaderService } from './loader/loader.service';
import { LoaderComponent } from './loader/loader.component';
import { FormValidations } from './formValidations';
import { SweetAlertService } from './sweetAlert';
import { PushNotificationsService } from 'angular2-notifications';
import { PushNotifications } from './pushNotifications';
import { HttpNotificationsService } from "./httpNotificationsService";
import { TranslateService } from "@ngx-translate/core";
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './footer/footer.module';
import { NavbarModule } from './navbar/navbar.module';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { Store } from "@ngrx/store";
import { ChartsFactory } from "./chart.factory";
import { WrappedSocket } from "./socket.service";

@NgModule({
    imports: [
        CommonModule,
        SidebarModule,
        NavbarModule,
        FooterModule
    ],
    exports: [
        LoaderComponent,
        SidebarComponent,
        NavbarComponent,
        FooterComponent
    ],
    declarations: [
        LoaderComponent
    ],
    providers: [
        LoaderService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions, LoaderService, HttpNotificationsService, TranslateService, SlimLoadingBarService, Store]
        },
        FormValidations,
        SweetAlertService,
        PushNotificationsService,
        PushNotifications,
        HttpNotificationsService,
        TranslateService,
        ChartsFactory,
        AngularReduxRequestOptions,
        WrappedSocket
    ]
})

export class CommonCustomModule { }
