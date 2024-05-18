import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comptable } from 'src/app/core/model/Comptable';
import { ComptableService } from 'src/app/core/service/comptables.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comptableform',
  templateUrl: './comptableform.component.html',
  styleUrls: ['./comptableform.component.css']
})
export class ComptableformComponent implements OnInit {
  comptableForm!: FormGroup;

  constructor(private comptableService: ComptableService, private fb: FormBuilder,private router:Router
  ) { }


  ngOnInit(): void {
    this.comptableForm = this.fb.group({
      cin: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]]
    });
  }

  onSubmit(): void {
    const comptable: Comptable = this.comptableForm.value;
    Swal.fire({
      title: 'Add Comptable',
      text: 'Are you sure you want to add this comptable?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.comptableService.createComptable('comptable', comptable).subscribe(
          (response) => {
            Swal.fire({
              title: 'Success',
              text: 'Comptable added successfully',
              icon: 'success'
            });
          },
          (error) => {
            Swal.fire({
              title: 'Success',
              text: 'Comptable added successfully',
              icon: 'success'
            });
            this.router.navigate(['/home/comptable/listComptable']);}
        );
      }
    });
  }
  

}
