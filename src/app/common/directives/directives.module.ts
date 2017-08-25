import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SmartValidateFormDirective } from './smartForm';
import { NgxPaginationModule } from 'ngx-pagination';
import { MinDateDirective, MaxDateDirective, SmartDatepickerDirective } from './smartDatePicker';
import { SmartSelectDirective } from './smartSelect';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
	imports: [
		CommonModule,
		TranslateModule,
		FormsModule,
		NgxPaginationModule
	],
	declarations: [
		SmartValidateFormDirective,
		MinDateDirective,
		MaxDateDirective,
		TimeAgoPipe,
		SmartDatepickerDirective,
		SmartSelectDirective
	],
	exports: [
		SmartValidateFormDirective,
		MinDateDirective,
		MaxDateDirective,
		TimeAgoPipe,
		SmartDatepickerDirective,
		SmartSelectDirective
	],
	providers: []
})
export class DirectivesModule { }