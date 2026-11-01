import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environment';

@Injectable({ providedIn: 'root' })
export class APIService {
  private readonly http = inject(HttpClient);

  formatErrors(error: any) {
    alert(`Unable to process request. Error-[${error.status}]`);
    return throwError(() => error.error);
  }

  post<T>(path: string, body: object): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<T>(`${environment.serverUrl}${path}`, JSON.stringify(body), { headers })
      .pipe(catchError(this.formatErrors));
  }

  put<T>(path: string, body: object): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<T>(`${environment.serverUrl}${path}`, JSON.stringify(body), { headers })
      .pipe(catchError(this.formatErrors));
  }

  get<T>(path: string): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<T>(`${environment.serverUrl}${path}`, { headers })
      .pipe(catchError(this.formatErrors));
  }

  getParams<T>(path: string, params = new HttpParams()): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<T>(`${environment.serverUrl}${path}`, { headers, params })
      .pipe(catchError(this.formatErrors));
  }

  postParams<T>(path: string, params: HttpParams): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<T>(`${environment.serverUrl}${path}`, {}, { headers, params })
      .pipe(catchError(this.formatErrors));
  }

  putParams<T>(path: string, params: HttpParams): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<T>(`${environment.serverUrl}${path}`, {}, { headers, params })
      .pipe(catchError(this.formatErrors));
  }

  deleteParams<T>(path: string, params: HttpParams): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<T>(`${environment.serverUrl}${path}`, { headers, params })
      .pipe(catchError(this.formatErrors));
  }

//   postFile<T>(path: string, data: FormData): Observable<T> {
//     return this.http.put<T>(`${environment.serverUrl}${path}`, data)
//       .pipe(catchError(this.formatErrors));
//   }

//   postDataAndFile<T>(path: string, data: FormData): Observable<T> {
//     return this.http.post<T>(`${environment.serverUrl}${path}`, data)
//       .pipe(catchError(this.formatErrors));
//   }

  delete<T>(path: string, body: object): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<T>(`${environment.serverUrl}${path}`, { headers, body })
      .pipe(catchError(this.formatErrors));
  }

  patch<T>(path: string, body: object): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<T>(`${environment.serverUrl}${path}`, JSON.stringify(body), { headers })
      .pipe(catchError(this.formatErrors));
  }
}