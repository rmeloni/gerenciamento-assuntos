import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from './subject.model';

@Injectable({
    providedIn: 'root',
})
export class SubjectService {
    private apiUrl = 'http://localhost:3000/subjects';

    constructor(private http: HttpClient) { }

    getSubjects(): Observable<Subject[]> {
        return this.http.get<Subject[]>(this.apiUrl);
    }

    createSubject(subject: Subject): Observable<Subject> {
        return this.http.post<Subject>(this.apiUrl, subject);
    }

    updateSubject(subject: Subject): Observable<Subject> {
        return this.http.put<Subject>(`${this.apiUrl}/${subject.id}`, subject);
    }

    deleteSubject(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}