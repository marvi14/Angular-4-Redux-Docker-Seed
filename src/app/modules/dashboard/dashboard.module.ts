import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { routing } from './dashboard.routing';
import { TranslateModule } from '@ngx-translate/core';
import { FooterModule } from '../../common/footer/footer.module';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from "../../common/directives/directives.module";

@NgModule({
	imports: [
		routing,
		CommonModule,
		TranslateModule,
		FooterModule,
		FormsModule,
		DirectivesModule
	],
	declarations: [
		DashboardComponent
	],
	providers: []
})
export class DashboardModule { }