import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import {Classe} from "../model/Classe";
import { Evaluation } from '../model/Evaluation';


@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private baseUrl = 'http://localhost:8082/classes';

  constructor(private http: HttpClient) { }

  createClasse(classe: Classe): Observable<any> {
    return this.http.post(`${this.baseUrl}`, classe);
  }

  getClasseById(id: number): Observable<Classe> {
    return this.http.get<Classe>(`${this.baseUrl}/${id}`);
  }

  getAllClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${this.baseUrl}`);
  }

  updateClasse(id: number, classe: Classe): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, classe);
  }

  deleteClasse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  assignEvaluationToClasse(classeId: number, evaluationId: number): Observable<void> {
    const url = `${this.baseUrl}/${classeId}/evaluations/${evaluationId}`;
    return this.http.post<void>(url, null).pipe(
      catchError(error => {
        console.error('Error assigning evaluation to classe:', error);
        return throwError(error);
      })
    );
  }

  getEvaluationsByClasseId(classeId: number): Observable<Evaluation[]> {
    const url = `${this.baseUrl}/${classeId}/evaluations`;
    return this.http.get<Evaluation[]>(url);
  }
}
