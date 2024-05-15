import { Component, OnInit } from '@angular/core';
import { Eleve } from 'src/app/core/model/Eleve';
import { Classe } from 'src/app/core/model/Classe';
import { EleveService } from 'src/app/core/service/eleve.service';
import { ClasseService } from 'src/app/core/service/classe.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-listEleve',
  templateUrl: './listEleve.component.html',
  styleUrls: ['./listEleve.component.css']
})
export class ListEleveComponent implements OnInit {
  eleves: Eleve[] = [];

  constructor(private eleveService: EleveService, private classeService: ClasseService) { }

  ngOnInit() {
    this.fetchEleves();
  }

  fetchEleves(): void {
    this.eleveService.getAllEleves().subscribe(
      (data) => {
        this.eleves = data;
        this.populateClasseNames();
      },
      (error) => {
        console.error('Error fetching eleves:', error);
      }
    );
  }
  populateClasseNames(): void {
    const classeObservables = this.eleves
      .filter(eleve => eleve.classeId !== undefined)
      .map(eleve => this.classeService.getClasseById(eleve.classeId!));
  
    forkJoin(classeObservables).subscribe(classes => {
      this.eleves = this.eleves.map((eleve, i) => {
        if (eleve.classeId) {
          return { ...eleve, classeName: classes[i].nom };
        } else {
          return eleve;
        }
      });
    });
  }
}
