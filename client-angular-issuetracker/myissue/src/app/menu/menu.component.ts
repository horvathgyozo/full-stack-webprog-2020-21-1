import { Component } from '@angular/core';

import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
	isLoggedIn$: Observable<boolean>;

	constructor(protected as: AuthService) {
		this.isLoggedIn$ = as.isLoggedIn();
	}

	logout(): void {
		this.as.logout();
	}
}
