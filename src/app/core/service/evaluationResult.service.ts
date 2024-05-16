import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EvaluationResult} from "../model/EvaluationResult";


@Injectable({
  providedIn: 'root'
})
export class EvaluationResultService {
  private baseUrl = 'http://localhost:8082/evaluationResults';

  constructor(private http: HttpClient) { }

  createEvaluationResult(evaluationResult: EvaluationResult): Observable<any> {
    return this.http.post(`${this.baseUrl}`, evaluationResult);
  }

  getEvaluationResultById(id: number): Observable<EvaluationResult> {
    return this.http.get<EvaluationResult>(`${this.baseUrl}/${id}`);
  }

  getAllEvaluationResults(): Observable<EvaluationResult[]> {
    return this.http.get<EvaluationResult[]>(`${this.baseUrl}`);
  }



  deleteEvaluationResult(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getEvaluationResultsByUserId(userId: number | undefined): Observable<EvaluationResult[]> {
    return this.http.get<EvaluationResult[]>(`${this.baseUrl}/user/${userId}`);
  }


}
