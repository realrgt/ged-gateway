import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private http: HttpClient) {}

  downloadFile(fileURL: string): Observable<Blob> {
    return this.http.get(fileURL, { responseType: 'blob' });
  }
}
