import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { StoreModule } from "@ngrx/store";
//import the reducer
import { reducer } from "./reducers.index";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app.routing';
import { CommonCustomModule } from './common/common.module';
import { CanActivateViaAuthGuard } from "./app.guards";
import { FacebookService, FacebookModule } from "ngx-facebook";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminLayoutComponent } from './common/admin/admin-layout.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

//this loader is in charge of determine the pattern of path to the translation files
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule,
    //provideStore accepts an object with reducers.
    StoreModule.provideStore(reducer),
    routing,
    CommonCustomModule,
    FacebookModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ],
  providers: [
    CanActivateViaAuthGuard,
    FacebookService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() { }
}