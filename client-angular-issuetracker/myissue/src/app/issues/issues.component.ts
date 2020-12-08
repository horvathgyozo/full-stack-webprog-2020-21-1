import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { IssueService } from '@core/services/issue.service';
import { AddEditIssueComponent } from './add-edit-issue/add-edit-issue.component';

import { Issue } from '@core/interfaces/issue.interface';

@Component({
	selector: 'app-issues',
	templateUrl: './issues.component.html',
	styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

	constructor(
		public dialog: MatDialog,
		public is: IssueService
	) { }

	ngOnInit(): void {
		this.is.getIssues();
	}

	openAddIssueDialog(): void {
		const dialogRef = this.dialog.open(AddEditIssueComponent, {
			width: '1000px'
		})
	}

}
