import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RelatedNewsComponent } from './related-news/related-news.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'relatednews', component: RelatedNewsComponent },
];
