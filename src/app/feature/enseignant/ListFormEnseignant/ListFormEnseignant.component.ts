import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Classe } from 'src/app/core/model/Classe';
import { Enseignant } from 'src/app/core/model/Enseignant';
import { EnseignantService } from 'src/app/core/service/enseignant.service';

@Component({
  selector: 'app-ListFormEnseignant',
  templateUrl: './ListFormEnseignant.component.html',
  styleUrls: ['./ListFormEnseignant.component.css']
})
export class ListFormEnseignantComponent implements OnInit {
  enseignants!: Enseignant[];
  classes: Classe[] = [];
  selectedClasse!: Classe;

  constructor(private enseignantService: EnseignantService,    private router: Router
  ) { }

  ngOnInit() {
    this.getAllEnseignants();

  }

  
  getAllEnseignants(): void {
    this.enseignantService.getAllEnseignants()
      .subscribe(enseignants => {
        this.enseignants = enseignants;
        this.getClassesForEnseignants();
      });
  }

  getClassesForEnseignants(): void {
    this.enseignants.forEach(enseignant => {
      if (enseignant.userId) { // add null check
        this.enseignantService.getClassesByEnseignantId(enseignant.userId)
          .subscribe(classes => {
            this.classes = [...this.classes, ...classes];
            enseignant.classes = classes;
          });
      }
    });
  }

  navigateToAssignClasses(enseignantId: number | undefined): void {
    if (enseignantId !== undefined) {
      this.router.navigate(['home/enseignant/assignEnseignant', enseignantId]);
    }
  }

  

}
