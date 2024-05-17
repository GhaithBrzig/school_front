import { Component, OnInit } from '@angular/core';
import { Classe } from 'src/app/core/model/Classe';
import { Enseignant, Matiere } from 'src/app/core/model/Enseignant';
import { ClasseService } from 'src/app/core/service/classe.service';
import { EnseignantService } from 'src/app/core/service/enseignant.service';
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
  constructor(    private enseignantService: EnseignantService,
    private classeService: ClasseService,
                  private router:Router
) { }

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

  const roleName = 'enseignant';

  this.enseignantService
    .createEnseignant(
      roleName,
      this.selectedClasseId,
      this.newEnseignant.matiere,
      this.newEnseignant
    )
    .subscribe(
      (response) => {
        console.log('New teacher created successfully!', response);
        this.newEnseignant = new Enseignant();
      },
      (error) => {
        console.error('Error creating new teacher:', error);
      }
    );
  this.router.navigate(['/home/enseignant/list']); // Navigate to a new route
}


}
