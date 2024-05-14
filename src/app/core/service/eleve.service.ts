import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eleve } from '../model/Eleve';

@Injectable({
  providedIn: 'root'
})
export class EleveService {
  private baseUrl = 'http://localhost:8082/eleves';

  constructor(private http: HttpClient) { }

  createEleve(eleve: Eleve, roleName: string, classeId: number): Observable<any> {
    const url = `${this.baseUrl}?roleName=${roleName}&classeId=${classeId}`;
    return this.http.post(url, eleve);
  }

  getEleveById(id: number): Observable<Eleve> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Eleve>(url);
  }

  getAllEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.baseUrl);
  }

  updateEleve(id: number, eleve: Eleve): Observable<Eleve> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Eleve>(url, eleve);
  }

  deleteEleve(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
