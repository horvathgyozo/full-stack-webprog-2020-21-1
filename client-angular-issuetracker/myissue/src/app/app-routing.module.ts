import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssuesComponent } from './issues/issues.component';

const routes: Routes = [
	{ path: '', redirectTo: 'issues/open', pathMatch: 'full' },
	{ path: 'issues/open', component: IssuesComponent },
	{ path: 'issues/closed', component: IssuesComponent },
	{ path: '**', redirectTo: 'issues/open', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
