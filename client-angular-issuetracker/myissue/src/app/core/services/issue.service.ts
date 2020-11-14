import { Injectable } from '@angular/core';

import { Issue } from '@core/interfaces/issue.interface';

@Injectable({
	providedIn: 'root'
})
export class IssueService {
    issues: Issue[] = [
        { iid: 1, uid: -1, type: 'SW', details: 'Ide jön az első issue részletes leírásaasdad  asd a ds asd a sd as da sd a sdf sdf ds ', timestamp: 1601024188, status: 'ADDED' },
        { iid: 2, uid: -1, type: 'HW', details: 'Ide jön a második issue részletes leírása...', timestamp: 1601024188, status: 'ADDED' }
    ];

    constructor() {}

    public getIssues(): Issue [] {
        return this.issues;
    }

}
