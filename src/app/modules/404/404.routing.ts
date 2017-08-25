import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './404.component';

const routes: Routes = [
	{ path: '', component: Page404Component }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);