import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive  } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { HttpsRedirectService } from './services/https-redirect.service';
import { AuthenticationService } from './services/authentication.service';
import { FileUploadModalComponent } from './file-upload-modal/file-upload-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FileService } from './services/files.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, MatIconModule, LoginComponent,MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoggedIn: boolean = false;
  title = 'client_cloud_drive';
  name ='';
  last_name='';
 
  
   openFileUploadModal() {
     const dialogRef = this.dialog.open(FileUploadModalComponent, {
       width: '500px',
       data: { 
        
       }
     });
   
     dialogRef.afterClosed().subscribe(result => {
       if (result) {
       
     
       }
     });
   }
  constructor(private dialog: MatDialog,private httpsRedirectService: HttpsRedirectService, private router: Router, private authenticationService: AuthenticationService) {

    // Verifica si el usuario está logueado
    if (this.authenticationService.checkLogin()) {
      this.isLoggedIn = true;
      // Obtiene la información del usuario
      this.authenticationService.getUser().subscribe((user) => {
        this.name = user.name;
        this.last_name = user.last_name;
       
      });
    } else {
      // Redirige al usuario a la página de inicio de sesión si no está logueado
      this.logout;
    }

    //verificamos si fue exitoso el inicio de sesion
    this.authenticationService.loginSuccess.subscribe(() => {
      this.isLoggedIn = true;
      //obtenemos nombre y rol del usuario
      this.authenticationService.getUser().subscribe((user) => {
        this.name = user.name;
        this.last_name = user.last_name;
      
      });
      //definimos organizacione como lo primero que ve el usuario
      this.router.navigate(['/home']);
    });
  
  }


  
  ngOnInit(): void {
    this.httpsRedirectService.redirect();
  }


   // Método para cerrar sesión
   logout(): void {
    this.authenticationService.logout();
    this.last_name = '';
    this.name = '';
  }
  resetTimer(event: any) {
    if (this.isLoggedIn) {
      this.authenticationService.resetInactivityTimer();
    }
  }
}
