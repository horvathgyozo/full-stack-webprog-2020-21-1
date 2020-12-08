import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@core/guards/auth.guard';
import { AnonymGuard } from '@core/guards/anonym.guard';

import { AuthComponent } from './auth/auth.component';
import { IssuesComponent } from './issues/issues.component';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
	{ path: '', component: AuthComponent, /*canActivate: [AnonymGuard]*/ },
	{ path: 'issues/active', component: IssuesComponent, canActivate: [AuthGuard] },
	{ path: 'issues/closed', component: IssuesComponent, canActivate: [AuthGuard] },
	{ path: '404', component: PagenotfoundComponent },
		{ path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
