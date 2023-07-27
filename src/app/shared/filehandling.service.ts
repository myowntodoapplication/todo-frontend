import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilehandlingService {

  baseURL='http://localhost:2004'
  constructor(private http: HttpClient) { }


  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseURL}/api/filehandling/upload`, formData);
  }


  downloadFile(fileName: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'blob',
    });

    return this.http.get<Blob>(`${this.baseURL}/api/filehandling/download/${fileName}`, { headers: headers });
  }

}
