import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Classe} from "../model/Classe";


@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private baseUrl = 'http://localhost:8080/classes';

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
}
