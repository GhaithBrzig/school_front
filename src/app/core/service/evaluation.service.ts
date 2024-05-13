import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Evaluation} from "../model/Evaluation";


@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private baseUrl = 'http://localhost:8080/evaluations';

  constructor(private http: HttpClient) { }

  createEvaluation(evaluation: Evaluation): Observable<any> {
    return this.http.post(`${this.baseUrl}`, evaluation);
  }

  getEvaluationById(id: number): Observable<Evaluation> {
    return this.http.get<Evaluation>(`${this.baseUrl}/${id}`);
  }

  getAllEvaluations(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.baseUrl}`);
  }

  updateEvaluation(id: number, evaluation: Evaluation): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, evaluation);
  }

  deleteEvaluation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
