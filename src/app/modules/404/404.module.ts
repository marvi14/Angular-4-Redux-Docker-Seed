import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page404Component } from './404.component';
import { routing } from './404.routing';
import { TranslateModule } from '@ngx-translate/core';
import { CommonCustomModule } from '../../common/common.module';
import { FooterModule } from '../../common/footer/footer.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		routing,
		CommonModule,
		TranslateModule,
		CommonCustomModule,
		FooterModule,
		FormsModule
	],
	declarations: [
		Page404Component
	]
})
export class NotFoundModule { }