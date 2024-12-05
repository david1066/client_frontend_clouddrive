import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpsRedirectService {
  redirect() {
    if (environment.forceHttps && location.protocol === 'http:' && location.hostname !== 'localhost') {
      window.location.href = location.href.replace('http:', 'https:');
    }
  }
}
