import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { AddEditIssueComponent } from '.././add-edit-issue/add-edit-issue.component';

import { Issue } from '@core/interfaces/issue.interface';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent {

 @Input() issue: Issue = null;

  constructor(private dialog: MatDialog) { }

  openEditIssueDialog(issue: Issue): void {
		const dialogRef = this.dialog.open(AddEditIssueComponent, {
      width: '1000px',
      data: issue
		})
	}

}
