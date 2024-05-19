import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parent } from '../model/Parent';
import { Eleve } from '../model/Eleve';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private baseUrl = 'http://localhost:8082/parents';

  constructor(private http: HttpClient) { }

  createParent(parent: Parent, roleName: string,): Observable<any> {
    const url = `${this.baseUrl}?roleName=${roleName}`;
    return this.http.post(url, parent);
  }

  getParentById(id: number): Observable<Parent> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Parent>(url);
  }

  getAllParents(): Observable<Parent[]> {
    return this.http.get<Parent[]>(this.baseUrl);
  }

  updateParent(id: number, eleve: Parent): Observable<Parent> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Parent>(url, eleve);
  }

  deleteParent(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }

  assignEnfantToParent(parentId: number, enfantId: number): Observable<any> {
    const url = `${this.baseUrl}/${parentId}/enfants/${enfantId}`;
    return this.http.post(url, null);
  }

  getElevesForParent(parentId: number): Observable<Eleve[]> {
    const url = `${this.baseUrl}/${parentId}/enfants`;
    return this.http.get<Eleve[]>(url);
  }


  uploadPhoto(parentId: number, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', photo);

    const url = `${this.baseUrl}/${parentId}/photo`;
    return this.http.post(url, formData, { responseType: 'text' });
  }


}
