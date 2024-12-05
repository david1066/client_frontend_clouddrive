import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = environment.apiUrl + '/api/file';

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getAllFile(): Observable<any> {
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authenticationService.getToken()}`).set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl, { headers });
  }
  getDownloadFile(filename:string): Observable<any> {
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authenticationService.getToken()}`).set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl+'/'+filename, { headers,responseType: 'blob' });
  }
  postFile(formData:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authenticationService.getToken()}`);

    return this.http.post(this.apiUrl, formData,{headers});
  }

  
  deleteFile(filename:string): Observable<any> {
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authenticationService.getToken()}`).set('Content-Type', 'application/json');
    return this.http.delete(this.apiUrl+'/'+filename, { headers });
  }

  
}
