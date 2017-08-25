import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CanActivateViaAuthGuard } from "./app.guards";
import { AdminLayoutComponent } from './common/admin/admin-layout.component';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
	{ path: '404', loadChildren: './modules/404/404.module#NotFoundModule' },
	{
		path: 'app',
		component: AdminLayoutComponent,
		canActivate: [CanActivateViaAuthGuard],
		children: [
			{ path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
		]
	},
	{ path: '**', redirectTo: '404' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);