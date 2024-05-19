import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentService } from 'src/app/core/service/parent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-photoUpload',
  templateUrl: './photoUpload.component.html',
  styleUrls: ['./photoUpload.component.css']
})
export class PhotoUploadComponent implements OnInit {
  photoForm!: FormGroup;
  selectedFile: File | null = null;
  parentId: number | undefined;
  constructor(    private formBuilder: FormBuilder,
    private parentService: ParentService,
    private route: ActivatedRoute,
    private router:Router
)


{

  this.photoForm = this.formBuilder.group({});
}

  ngOnInit() {
    this.parentId = Number(this.route.snapshot.paramMap.get('parentId'));

  }

  initializeForm() {
    this.photoForm = this.formBuilder.group({
      photo: [null, Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.photoForm.get('photo')?.setValue(this.selectedFile);
  }

  uploadPhoto() {
    if (this.parentId && this.selectedFile) {
      Swal.fire({
        title: 'Confirm Upload',
        text: 'Are you sure you want to upload this photo?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Upload',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed && this.parentId && this.selectedFile) {
          this.parentService.uploadPhoto(this.parentId, this.selectedFile)
            .subscribe(
              (response) => {
                console.log(response);
                Swal.fire('Success', 'Photo uploaded successfully', 'success').then(() => {
                });
              },
              (error) => {
                console.error(error);
                Swal.fire('Error', 'Failed to upload photo', 'error');
              }
            );
        }
      });
    }
  }



}
