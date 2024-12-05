import { Component } from '@angular/core';
import { FileService } from '../services/files.service';
import { AuthenticationService } from '../services/authentication.service';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { Console } from 'console';

@Component({
  selector: 'app-home',
  imports: [MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public apiUrl = environment.apiUrl + '/api';
  files: any;
  constructor(private fileService: FileService, private authenticationService: AuthenticationService) {
   this.getAllFile();
  }
  getAllFile(): void {
    this.fileService.getAllFile().subscribe(response => {
      this.files = response.files;
    
    });
  }

  deleteFile(filename:string): void {

    Swal.fire({
      title: 'Eliminar archivo',
      text: '¿Estás seguro de eliminar este archivo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.fileService.deleteFile(filename).subscribe(
          response => {
            Swal.fire('Archivo eliminada', 'El archivo ha sido eliminado correctamente', 'success');
            this.getAllFile();
          },
          error => {
         
            Swal.fire('Error', 'No se pudo eliminar el archivo', 'error');
          }
        );
      }
    });
    
  }

  getDownloadFile(filename:string): void {

    Swal.fire('Descargando archivo', 'El archivo se está descargando espera un momento', 'success');
      this.fileService.getDownloadFile(filename).subscribe(blob=>{
        const a = document.createElement('a'); 
        const objectUrl = URL.createObjectURL(blob); 
        a.href = objectUrl; 
        a.download = filename; 
        a.click(); URL.revokeObjectURL(objectUrl);
       

      }
     
      );
  
  }
    

}
