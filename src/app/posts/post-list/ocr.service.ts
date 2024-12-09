import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OcrService {

    constructor(
       public http: HttpClient,
    ) {
    }

    private apiUrl = 'https://api.ocr.space/parse/image';
  private apiKey = 'YOUR_API_KEY'; // Replace with your OCR.space API key


  recognizeText(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', 'eng');

    const headers = new HttpHeaders().set('apikey', this.apiKey);

    return this.http.post(this.apiUrl, formData, { headers });
  }



}
