import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Parent } from 'src/app/core/model/Parent';
import { ParentService } from 'src/app/core/service/parent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.css']
})
export class ParentFormComponent implements OnInit {
  parentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private parentService: ParentService) { }

  ngOnInit() {
    this.parentForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      emailAddress: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.parentForm.valid) {
      const parent = this.parentForm.value as Parent;
      this.parentService.createParent(parent, 'parent').subscribe(
        result => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Parent added successfully!',
            confirmButtonText: 'OK'
          }).then(() => {
            this.parentForm.reset();
          });
        },
        error => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Parent added successfully!',
            confirmButtonText: 'OK'
          });
          console.error('Error adding parent:', error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill in all required fields correctly.',
        confirmButtonText: 'OK'
      });
    }
  }
}
