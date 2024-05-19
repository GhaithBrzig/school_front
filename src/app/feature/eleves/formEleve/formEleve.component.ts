import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Classe } from 'src/app/core/model/Classe';
import { Eleve } from 'src/app/core/model/Eleve';
import { ClasseService } from 'src/app/core/service/classe.service';
import { EleveService } from 'src/app/core/service/eleve.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-formEleve',
  templateUrl: './formEleve.component.html',
  styleUrls: ['./formEleve.component.css']
})
export class FormEleveComponent implements OnInit {
  newEleve: Eleve = new Eleve();
  classes: Classe[] = []; // Array to hold the list of classes
  selectedClasseId!: number; // Variable to hold the selected class ID

  constructor(private eleveService: EleveService,private classeService: ClasseService, private router:Router) { }

  ngOnInit(): void {
    this.classeService.getAllClasses().subscribe(
      classes => {
        this.classes = classes;
      },
      error => {
        console.error('Error loading classes:', error);
      }
    );
  }


  onSubmit() {
    if (!this.selectedClasseId) {
      console.error('Please select a class');
      return;
    }

    const roleName = 'eleve';

    // Assign the selected class to the newEleve object
    this.newEleve.classe = this.classes.find(c => c.id === this.selectedClasseId);

    this.eleveService.createEleve(this.newEleve, roleName, this.selectedClasseId).subscribe(
      response => {
        console.log('New eleve created successfully!', response);
        this.newEleve = new Eleve();
      },
      error => {
        console.error('Error creating new eleve:', error);
        this.route.navigate(['home/eleves/showEleve']);

      }
    );
    this.router.navigate(['/home/eleves/showEleve']); // Navigate to a new route
  }

}
