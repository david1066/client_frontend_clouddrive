import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../services/files.service';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload-modal',
  standalone: true,

  imports: [ ReactiveFormsModule, MatDialogModule],
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.css']
})
export class FileUploadModalComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;

  constructor(  private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<FileUploadModalComponent>,
    private fileService:FileService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.uploadForm = this.fb.group({
  
      file: [null]
    });
  }
  

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(form:any): void {
    if (this.uploadForm.valid && this.selectedFile) {
      const formData = new FormData();
      console.log(this.selectedFile)
      formData.append('file', this.selectedFile);
      console.log(this.selectedFile)

     this.fileService.postFile(formData).subscribe(response => {
        
        this.dialogRef.close(response);
              // Recargar la página actual
        location.reload();

        Swal.fire('Archivo', 'El archivo ha sido cargado con exito', 'success');
      }, error => {
        if(error.error.message=="validation.max.file"){
          Swal.fire('Error', 'El tamaño del archivo supera las 2MB', 'error');
        }else if(error.error.message=="validation.mimes"){
          Swal.fire('Error', 'Debe ser un archivo con formato: .jpeg, .png, .jpg, .gif,. svg, .pdf', 'error');
        }else{
          Swal.fire('Error', 'Error en el servidor por favor comunicarse con soporte', 'error');
        }

       
        
      });
    }
  }
}



