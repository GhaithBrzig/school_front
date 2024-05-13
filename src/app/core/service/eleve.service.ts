import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eleve } from '../model/Eleve';

@Injectable({
  providedIn: 'root'
})
export class EleveService {
  private baseUrl = 'http://localhost:8082/eleves';

  constructor(private http: HttpClient) { }

  getAllEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(`${this.baseUrl}`);
  }

  getEleveById(id: number): Observable<Eleve> {
    return this.http.get<Eleve>(`${this.baseUrl}/${id}`);
  }

  createEleve(classeId: number, eleve: Eleve): Observable<any> {
    return this.http.post(`${this.baseUrl}/${classeId}`, eleve);
  }

  updateEleve(id: number, eleve: Eleve): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, eleve);
  }

  deleteEleve(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
