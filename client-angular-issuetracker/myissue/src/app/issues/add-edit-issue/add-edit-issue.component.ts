import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { IssueService } from '@core/services/issue.service';
import { NotificationService } from '@core/services/notification.service';

import { Issue } from '@core/interfaces/issue.interface';
import { Label } from '@core/interfaces/label.interface';

@Component({
  selector: 'app-add-edit-issue',
  templateUrl: './add-edit-issue.component.html',
  styleUrls: ['./add-edit-issue.component.scss']
})
export class AddEditIssueComponent implements OnInit {
  issueForm: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  labelCtrl = new FormControl();
  filteredLabels: Observable<string[]>;
  labels: string[] = [];
  lids: number[] = [];
  allLabels: string[] = [];
  allLabelObjects: Label[] = [];

  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditIssueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Issue,
    public is: IssueService,
    private ns: NotificationService
  ) {
    this.issueForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      place: null,
      labels: []
    });

    this.filteredLabels = this.labelCtrl.valueChanges.pipe(
      startWith(null),
      map((label: string | null) => label ? this._filter(label) : this.allLabels.slice()));
  }

  ngOnInit(): void {
    this.is.getLabels().then((ls: Label[]) => {
      this.allLabelObjects = ls;
      ls.forEach((value, key) => {
        this.allLabels.push(value['text']);
      });
      if (this.data) {
        this.issueForm.disable();
        this.labelCtrl.disable();
        this.issueForm.patchValue(this.data);
        this.data.labels.map(l => {
          this.labels.push(l.text);
        });
      }
    });
  }

  addIssue(form: FormGroup) {
    if (form.valid) {
      form.patchValue({'labels': this.lids})
      console.log(form.value);
      this.is.addIssue(<Issue>form.value);
      this.issueForm.reset();
    }
    else {
      this.ns.show('HIBA! Adatok nem megfelelőek!');
    }
  }

  labelAdd(event: MatChipInputEvent): void {    
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.labels.push(value.trim());
    }
    if (input) {
      input.value = '';
    }    
    this.is.addLabel(value).then(lid => {
      this.lids.push(lid);
    });
    this.labelCtrl.setValue(null);
  }

  labelSelected(event: MatAutocompleteSelectedEvent): void {    
    this.labels.push(event.option.viewValue);
    this.labelInput.nativeElement.value = '';
    this.labelCtrl.setValue(null);
    this.lids.push(this.allLabelObjects.find(l => l.text === event.option.viewValue).id);    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allLabels.filter(label => label.toLowerCase().indexOf(filterValue) === 0);
  }

}
