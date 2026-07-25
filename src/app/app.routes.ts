import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./features/home/home').then((m) => m.HomeComponent),
		title: 'Fit Coach Pro | Personal Trainer Marco Vitali'
	},
	{
		path: 'prenota',
		loadComponent: () => import('./features/booking/booking').then((m) => m.BookingComponent),
		title: 'Prenota una consulenza | Fit Coach Pro'
	},
	{
		path: 'privacy-cookie',
		loadComponent: () => import('./features/privacy-cookie/privacy-cookie').then((m) => m.PrivacyCookieComponent),
		title: 'Privacy e Cookie Policy | Fit Coach Pro'
	},
	{
		path: '**',
		redirectTo: ''
	}
];
