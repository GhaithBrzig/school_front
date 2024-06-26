import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Classe } from 'src/app/core/model/Classe';
import { ClasseService } from 'src/app/core/service/classe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classes-form',
  templateUrl: './classes-form.component.html',
  styleUrls: ['./classes-form.component.scss']
})
export class ClassesFormComponent implements OnInit {

  constructor(private classeService: ClasseService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(formData: { niveau: string, nom: string, nbrEleves: number }) {
    const classe: Classe = {
      niveau: formData.niveau,
      nom: formData.nom,
      nbrEleves: formData.nbrEleves,
    };
  
    this.classeService.createClasse(classe)
      .subscribe(
        response => {
          console.log('Class created successfully:', response);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Class created successfully!'
          }).then(() => {
            this.router.navigate(['/home/classes/claaseslist']);
          });
        },
        error => {
          console.error('Error creating class:', error);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Class created successfully!'
          }).then(() => {
            this.router.navigate(['/home/classes/claaseslist']);
          });
        }
      );
  }
  

}