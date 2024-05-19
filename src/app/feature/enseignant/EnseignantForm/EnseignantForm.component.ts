import { Component, OnInit } from '@angular/core';
import { Classe } from 'src/app/core/model/Classe';
import { Enseignant, Matiere } from 'src/app/core/model/Enseignant';
import { ClasseService } from 'src/app/core/service/classe.service';
import { EnseignantService } from 'src/app/core/service/enseignant.service';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-EnseignantForm',
  templateUrl: './EnseignantForm.component.html',
  styleUrls: ['./EnseignantForm.component.css']
})
export class EnseignantFormComponent implements OnInit {
  newEnseignant: Enseignant = new Enseignant();
  classes: Classe[] = [];
  selectedClasseId!: number;
  matieres = Object.values(Matiere);
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(
    private enseignantService: EnseignantService,
    private classeService: ClasseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.classeService.getAllClasses().subscribe(
      (classes) => {
        this.classes = classes;
      },
      (error) => {
        console.error('Error loading classes:', error);
      }
    );
  }

  onSubmit() {
    if (!this.selectedClasseId) {
      console.error('Please select a class');
      return;
    }

    if (!this.newEnseignant.matiere) {
      console.error('Please select a subject');
      return;
    }

    if (!this.validateStringField(this.newEnseignant.userName)) {
      console.error('Invalid username');
      return;
    }

    if (!this.validateStringField(this.newEnseignant.firstName)) {
      console.error('Invalid first name');
      return;
    }

    if (!this.validateStringField(this.newEnseignant.lastName)) {
      console.error('Invalid last name');
      return;
    }

    if (!this.validateEmail(this.newEnseignant.emailAddress)) {
      console.error('Invalid email address');
      return;
    }

    const roleName = 'enseignant';

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to create a new teacher?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, create it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.enseignantService
          .createEnseignant(
            roleName,
            this.selectedClasseId,
            this.newEnseignant.matiere ? this.newEnseignant.matiere.toString() : '',
            this.newEnseignant
          )
          .subscribe(
            (response) => {
              console.log('New teacher created successfully!', response);
              this.newEnseignant = new Enseignant();
              Swal.fire(
                'Created!',
                'Your new teacher has been created.',
                'success'
              );
            },
            (error) => {
              console.error('Error creating new teacher:', error);
              Swal.fire(
                'Created!',
                'Your new teacher has been created.',
                'success'
              );
            }
          );
        this.router.navigate(['home/enseignant/ListEnseignant']);
      }
    });
  }

  validateStringField(field: string | undefined): boolean {
    return field !== undefined && field.trim().length > 0;
  }

  validateEmail(email: string | undefined): boolean {
    return email !== undefined && this.emailPattern.test(email);
  }

}
