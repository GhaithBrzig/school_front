import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enseignant } from '../model/Enseignant';
import { Classe } from '../model/Classe';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  private baseUrl = 'http://localhost:8082/enseignants';

  constructor(private http: HttpClient) { }

  createEnseignant(roleName: string, classeId: number, matiere: string, enseignant: Enseignant): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}?roleName=${roleName}&classeId=${classeId}&matiere=${matiere}`, enseignant);
  }

  getClassesByEnseignantId(enseignantId: number): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${this.baseUrl}/${enseignantId}/classes`);
  }

  getEnseignantById(id: number): Observable<Enseignant> {
    return this.http.get<Enseignant>(`${this.baseUrl}/${id}`);
  }

  getAllEnseignants(): Observable<Enseignant[]> {
    return this.http.get<Enseignant[]>(this.baseUrl);
  }

  updateEnseignant(id: number, enseignant: Enseignant): Observable<Enseignant> {
    return this.http.put<Enseignant>(`${this.baseUrl}/${id}`, enseignant);
  }

  deleteEnseignant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
