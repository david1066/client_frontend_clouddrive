import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from '../services/authentication.service';
import Swal from 'sweetalert2';
import { RouterModule} from '@angular/router';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule,FormsModule,RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  two_factor_code = null;
  two_factor_codev:boolean = false;
  register=false;  
  user: User = { name: '', last_name: '', email: '', username: '', password: '', password_confirmation: '', two_factor: 1};
  registerForm: FormGroup;
  constructor(private authenticationService: AuthenticationService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password:  ['', [Validators.required]],
      password_confirmation:  ['', [Validators.required]],
      two_factor:  [1, [Validators.required]],
  
    });
  } 
  registerF(register:boolean){
    this.register=true;
  }
 registerSubmit(form:any){
  console.log(form);
    this.authenticationService.register(form).subscribe(
      (response) => {
      // Si la respuesta es exitosa, hace la validacion en app.component
      Swal.fire({
        title: 'success',
        text: 'Registrado con exito',
        icon: 'success',
      });
      this.register=false;
      },
      // Si ocurre un error, muestra un mensaje de error
      (error) => {

        if(error.error.message.includes('validation.email')){
          Swal.fire({
            title: 'Error',
            text: 'Revise el formato del correo',
            icon: 'error',
          });
        }else if(error.error.message.includes('validation.password_confirmed')){
          Swal.fire({
            title: 'Error',
            text: 'Verifique la contraseña',
            icon: 'error',
          });
        
        }else{
          Swal.fire({
            title: 'Error',
            text: 'Verifique la información suministrada y recuerde que todos los datos son obligatorios',
            icon: 'error',
          });
        }
      
        
      }
    ); 

 } 
  ngOnInit(): void {
  }

  // Método para iniciar sesión
  login(): void {
  this.authenticationService.login(this.email, this.password,this.two_factor_code).subscribe(
      (response) => {
      // Si la respuesta es exitosa, hace la validacion en app.component
          if(response.code=='201'){
            this.two_factor_codev=true;
          }
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
