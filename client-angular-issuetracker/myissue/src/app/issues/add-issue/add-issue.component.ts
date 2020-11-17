import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IssueService } from '@core/services/issue.service';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss']
})
export class AddIssueComponent {

  public addIssueForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddIssueComponent>,
    public is: IssueService
  ) {
    this.addIssueForm = this.formBuilder.group({
      type: [null, Validators.required],
      details: [null, Validators.required]
    });
  }

	addIssue(form: FormGroup) { }

}
