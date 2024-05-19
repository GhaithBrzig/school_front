import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comptable } from '../model/Comptable';

@Injectable({
  providedIn: 'root'
})
export class ComptableService {
  private baseUrl = 'http://localhost:8082/comptables';

  constructor(private http: HttpClient) { }

  createComptable(roleName: string, comptable: Comptable): Observable<string> {
    const url = `${this.baseUrl}?roleName=${roleName}`;
    return this.http.post<string>(url, comptable);
  }

  getComptableById(id: number): Observable<Comptable> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Comptable>(url);
  }

  getAllComptables(): Observable<Comptable[]> {
    return this.http.get<Comptable[]>(this.baseUrl);
  }

  updateParentPhotoState(parentId: number, photoState: string): Observable<void> {
    const url = `${this.baseUrl}/parents/${parentId}/photo-state?photoState=${photoState}`;
    return this.http.put<void>(url, {});
  }
}
