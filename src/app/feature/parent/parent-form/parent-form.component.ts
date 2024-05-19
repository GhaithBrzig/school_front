import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder, private parentService: ParentService,private router:Router) { }

  ngOnInit(): void {
    this.parentForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]]
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
            this.router.navigate(['/home/parent/listParent']);

          });
        },
        error => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Parent added successfully!',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/home/parent/listParent']);
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
