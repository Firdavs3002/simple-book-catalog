import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = 'https://d7d9-82-215-125-246.ngrok-free.app/api/books';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private _http: HttpClient) {}

  addFeedback(bookId: any, feedback: any): Observable<any> {
    return this._http.post<any>(`${baseUrl}/${bookId}/comments`, feedback);
  }

  getFeedbackList(bookId: any): Observable<any> {
    return this._http.get(`${baseUrl}/${bookId}/comments`);
  }

  deleteFeedback(bookId: any, feedbackId: any): Observable<any> {
    return this._http.delete(`${baseUrl}/${bookId}/comments/${feedbackId}`);
  }
}
