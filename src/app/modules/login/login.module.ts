import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { routing } from './login.routing';
import { LoginService } from './services/login.service';
import { TranslateModule } from '@ngx-translate/core';
import { FooterModule } from '../../common/footer/footer.module';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from "@ngrx/effects";
import { LoginEffects } from "../../modules/login/effects/login";
import { DirectivesModule } from "../../common/directives/directives.module";

@NgModule({
	imports: [
		routing,
		CommonModule,
		TranslateModule,
		FooterModule,
		FormsModule,
		EffectsModule.run(LoginEffects),
		DirectivesModule
	],
	declarations: [
		LoginComponent
	],
	providers: [LoginService]
})
export class LoginModule { }