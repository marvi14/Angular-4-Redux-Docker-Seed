import { XHRBackend } from '@angular/http';
import { AngularReduxRequestOptions } from './angular-redux-request.options';
import { HttpService } from './HttpService';
import { LoaderService } from './loader/loader.service';
import { HttpNotificationsService } from "./httpNotificationsService";
import { TranslateService } from "@ngx-translate/core";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { Store } from "@ngrx/store";
import * as fromRoot from '../reducers.index';
import { Location } from '@angular/common';

function httpServiceFactory(backend: XHRBackend, options: AngularReduxRequestOptions, loaderService: LoaderService, _httpNotifications: HttpNotificationsService, translate: TranslateService, slimLoadingBarService: SlimLoadingBarService, _store: Store<fromRoot.State>) {
	return new HttpService(backend, options, loaderService, _httpNotifications, translate, slimLoadingBarService, _store);
}

export { httpServiceFactory };