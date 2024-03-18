import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = 'https://d7d9-82-215-125-246.ngrok-free.app/api/books';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private _http: HttpClient) {}
  addBook(data: any): Observable<any> {
    return this._http.post(baseUrl, data);
  }

  getBooksList(): Observable<any> {
    return this._http.get(baseUrl);
  }

  deleteProduct(id: number): Observable<any> {
    return this._http.delete(`${baseUrl}/${id}`);
  }

  updateBook(id: number, data: any): Observable<any> {
    return this._http.put(`${baseUrl}/${id}`, data);
  }
}
