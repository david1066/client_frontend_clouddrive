import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from '../services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';


  constructor(private authenticationService: AuthenticationService) {
    
  } 

  ngOnInit(): void {
  }

  // Método para iniciar sesión
  login(): void {
  this.authenticationService.login(this.email, this.password).subscribe(
      (response) => {
      // Si la respuesta es exitosa, hace la validacion en app.component
      },
      // Si ocurre un error, muestra un mensaje de error
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
        });
      }
    ); 
  }
// Devolvemos si el usuario está logueado
  get isLoggedIn() {
    return false;
    return this.authenticationService.isLoggedIn.asObservable();
  }

}
