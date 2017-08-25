import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Http, RequestOptions, RequestOptionsArgs, Response, Request, Headers, XHRBackend } from '@angular/http';
import * as fromRoot from '../reducers.index';
import { AngularReduxRequestOptions } from './angular-redux-request.options';
import { LoaderService } from './loader/loader.service';
import { HttpNotificationsService } from "./httpNotificationsService";
import { TranslateService } from "@ngx-translate/core";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { Store } from "@ngrx/store";
import * as loginActions from '../modules/login/actions/login';
import { User } from "../modules/login/models/user";
import { Configs } from "assets/configs";
import { Router } from "@angular/router";

@Injectable()
export class HttpService extends Http {

    //public apiUrl = 'https://app.4iiz.com';
    public apiUrl = Configs.api_url;
    public loggedUser: User;
    private _httpBuffer: Array<any> = [];

    //We have a stack of HTTP requsets. While we have unresolved requests, we keep on showing the loader, once all are done, we hide it
    private pendingRequests: number = 0;

    constructor(backend: XHRBackend, defaultOptions: AngularReduxRequestOptions, private loaderService: LoaderService, private _httpNotifications: HttpNotificationsService, private translate: TranslateService, private slimLoadingBarService: SlimLoadingBarService, private _store: Store<fromRoot.State>) {
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();
        this.pendingRequests++;
        return super.get(url, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }

    post(url: string, body?: any, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();
        this.pendingRequests++;
        return super.post(url, body, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }

    put(url: string, body?: any, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();
        this.pendingRequests++;
        return super.put(url, body, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();
        this.pendingRequests++;
        return super.delete(url, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }

    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {

        if (options == null) {
            options = new AngularReduxRequestOptions(this._store);
        }

        if (options.headers == null) {
            options.headers = new Headers();
        }

        return options;
    }

    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw({ error, caught });
    }

    private onSuccess(res: Response): void {
        //console.log('Request successful');
    }

    private onError(res: any): void {
        if (res.error.status == 401) {
            this._httpBuffer.push(res.caught);
        } else {
            let body = res.error.json();
            this._httpNotifications.showErrorNotification(body.error ? body.error.message : this.translate.instant('GENERIC_HTTP_ERROR'));
        }
    }

    private onEnd(): void {
        this.pendingRequests--;
        if (this.pendingRequests === 0) {
            setTimeout(() => {
                this.hideLoader();
            });
        }
    }

    private showLoader(): void {
        if (window.location.href.indexOf('app') === -1)
            this.loaderService.show();
        else {
            this.slimLoadingBarService.progress = 30;
            this.slimLoadingBarService.start();
        }
    }

    private hideLoader(): void {
        this.loaderService.hide();
        this.slimLoadingBarService.complete();
    }
}