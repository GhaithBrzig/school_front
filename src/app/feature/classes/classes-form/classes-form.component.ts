import { Component, OnInit } from '@angular/core';
import { Classe } from 'src/app/core/model/Classe';
import { ClasseService } from 'src/app/core/service/classe.service';

@Component({
  selector: 'app-classes-form',
  templateUrl: './classes-form.component.html',
  styleUrls: ['./classes-form.component.scss']
})
export class ClassesFormComponent implements OnInit {

  constructor(private classeService: ClasseService) { }

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
          // Reset the form or perform any other actions
        },
        error => {
          console.error('Error creating class:', error);
          // Handle the error
        }
      );
  }
  

}