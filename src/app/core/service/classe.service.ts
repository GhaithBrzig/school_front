import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classe } from '../model/Classe';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private baseUrl = 'http://localhost:8082/classes';

  constructor(private http: HttpClient) { }

  getAllClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${this.baseUrl}`);
  }

  getClassById(id: number): Observable<Classe> {
    return this.http.get<Classe>(`${this.baseUrl}/${id}`);
  }

  createClasse(classe: Classe): Observable<any> {
    return this.http.post(`${this.baseUrl}`, classe);
  }

  updateClasse(id: number, classe: Classe): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, classe);
  }

  deleteClasse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
