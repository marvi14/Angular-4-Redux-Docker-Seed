import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoginService } from "app/modules/login/services/login.service";

@NgModule({
    imports: [RouterModule, CommonModule, TranslateModule],
    declarations: [NavbarComponent],
    exports: [NavbarComponent],
    providers: [LoginService]
})

export class NavbarModule { }
