import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IssueService } from '@core/services/issue.service';
import { AddIssueComponent } from './add-issue/add-issue.component';

@Component({
	selector: 'app-issues',
	templateUrl: './issues.component.html',
	styleUrls: ['./issues.component.scss']
})
export class IssuesComponent {

	constructor(
		public dialog: MatDialog,
		public is: IssueService
	) { }

	openAddIssueDialog(): void {
		const dialogRef = this.dialog.open(AddIssueComponent, {
			width: '1000px'
		})
	}

}
