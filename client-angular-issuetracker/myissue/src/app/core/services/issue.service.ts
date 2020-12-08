import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { NotificationService } from '@core/services/notification.service';

import { Issue } from '@core/interfaces/issue.interface';
import { Label } from '@core/interfaces/label.interface';

import { baseUrl } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class IssueService {
    issues$ = new BehaviorSubject<Issue[]>([]);
    labels: Label[] = [];

    constructor(
        private http: HttpClient,
        private ns: NotificationService
    ) {}

    getIssues(): void {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.get<Issue[]>(`${baseUrl}/issues`, {headers: header})
            .subscribe(i => {
                this.issues$.next(i);
            });
    }

    addIssue(issue: Issue) {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        this.http.post<Issue>(`${baseUrl}/issues`, issue, {headers: header})
        .subscribe(
            ni => {
                this.issues$.next(this.issues$.getValue().concat([ni]));
                this.ns.show('Hibabejelentés hozzáadva!');
            },
            error => {
                this.ns.show('HIBA! Hibabejelentés hozzáadása sikertelen!');
                console.error(error);
            }
        );
    }

    async getLabels(): Promise<Label[]> {
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );
        const labels: Label[] = await this.http.get<Label[]>(`${baseUrl}/labels`, {headers: header}).toPromise();
        return labels;
    }

    async addLabel(label: string) {        
        const header = new HttpHeaders().set(
            'Authorization', `Bearer ${localStorage.getItem('token')}`
        );        
        const id = await this.http.post<number>(`${baseUrl}/labels`, {'text': label}, {headers: header}).toPromise()
        .then(
            l => {
                this.ns.show('Új cimke hozzáadva!');
                return l['id'];
            })
            .catch(error => {
                this.ns.show('HIBA! Új cimke hozzáadása sikertelen!');
                console.error(error);
            }
        );
        return id;
    }

}
