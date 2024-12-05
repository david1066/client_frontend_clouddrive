
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = environment.apiUrl + '/api/login';
  private inactivityTimeout: number = 15 * 60 * 1000; 
  private timerSubscription: Subscription | null = null;


  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loginSuccess: Subject<void> = new Subject<void>();



  constructor(private http: HttpClient, private router: Router) {
    
    //Cargar los roles y permisos del usuario y iniciar el temporizador de inactividad cuando el usuario se autentica
    this.isLoggedIn.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.startInactivityTimer();
      }else {
        this.stopInactivityTimer();
      }
    });
  }

  //verificamos el estado de la sesion
  checkLogin(): boolean { 
    const token = this.getToken(); return token != null; 
  }

  verifyToken(): void {
    const token = this.getToken();
    if (token) {
      const expirationDate = sessionStorage.getItem('tokenExpiration');
      if (expirationDate && new Date(expirationDate) < new Date()) {
        // Token ha expirado, cerrar sesión
        this.logout();
      }
    }
  }

  //Autenticación inicio sesion
  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((response: any) => {
        
        const token = response._token;
        const user = response._user;
        const expirationDate = new Date(Date.now() + 3600000);
        

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('tokenExpiration', expirationDate.toISOString());
        sessionStorage.setItem('user', JSON.stringify(user));
        if(token != undefined){
          this.isLoggedIn.next(true);
          this.loginSuccess.next();
          this.verifyToken();
        }

      })
    );
  }

  //cerrar sesion
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    this.isLoggedIn.next(false);
  /*   this.router.navigateByUrl('/login', { skipLocationChange: true }); */
    location.reload();
  }
  
  //Obtiene el token de autenticación almacenado en la sesión

  getToken(): string | null {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem('token');
    } else {
        return null; // o manejarlo de otra manera adecuada para tu caso
    }
  }

  //Obtiene el objeto de usuario almacenado en la sesión
  getUser(): Observable<any> {
    return of(JSON.parse(sessionStorage.getItem('user') ?? '{}'));
  }

  //Iniciar temporizador de inactividad
  private startInactivityTimer() {
    this.timerSubscription = timer(this.inactivityTimeout).subscribe(() => {
      this.logout();
    });
  }
  
  //Cancelando temporizador de inactividad
  private stopInactivityTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  
  //Reseteando temporizador de inactividad
  public resetInactivityTimer() {
    this.stopInactivityTimer();
    this.startInactivityTimer();
  }
}

