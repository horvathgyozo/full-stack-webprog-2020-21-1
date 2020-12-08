import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from '@core/guards/auth.guard';
import { AnonymGuard } from '@core/guards/anonym.guard';

import { NameFormatDirective } from '@core/directives/nameformat.directive';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
	import { SigninComponent } from './auth/signin/signin.component';
	import { SignupComponent } from './auth/signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { IssuesComponent } from './issues/issues.component';
	import { IssueComponent } from './issues/issue/issue.component';
		import { AddEditIssueComponent } from './issues/add-edit-issue/add-edit-issue.component';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

//import { IssueDialogComponent } from './issues/issue/issue.component';

@NgModule({
	declarations: [
		NameFormatDirective,
		AppComponent,
		AuthComponent,
			SigninComponent,
			SignupComponent,
		MenuComponent,
		SettingsComponent,
		ProfileComponent,
		IssuesComponent,
			IssueComponent,
				AddEditIssueComponent,
			//IssueDialogComponent
		PagenotfoundComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		FlexLayoutModule,
		MatToolbarModule,
		MatSidenavModule,
		MatCardModule,
		MatTabsModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatChipsModule,
		MatTooltipModule,
		MatDialogModule,
		MatIconModule,
		MatListModule,
		MatRippleModule,
		MatExpansionModule,
		MatSnackBarModule,
		MatAutocompleteModule,
		MatPasswordStrengthModule,
		AppRoutingModule
	],
	providers: [
		AuthGuard,
		AnonymGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
