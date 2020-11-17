import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

 @Input() test: string;

  constructor() { }

  ngOnInit(): void {
  }

}
