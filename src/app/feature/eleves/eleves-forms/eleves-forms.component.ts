import { Component, OnInit } from '@angular/core';
import { Classe } from 'src/app/core/model/Classe';
import { Eleve } from 'src/app/core/model/Eleve';
import { ClasseService } from 'src/app/core/service/classe.service';
import { EleveService } from 'src/app/core/service/eleve.service';

@Component({
  selector: 'app-eleves-forms',
  templateUrl: './eleves-forms.component.html',
  styleUrls: ['./eleves-forms.component.css']
})
export class ElevesFormsComponent implements OnInit {
  eleve: Eleve = {
    eleveId: 0, // or undefined, depending on your backend
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    classe: undefined
  };

  selectedClasse!: number;
  classes!: Classe[];

  constructor(    private eleveService: EleveService,
    private classeService: ClasseService) { }

  ngOnInit() {
    this.classeService.getAllClasses().subscribe(classes => {
      this.classes = classes;
    });
  }

  onSubmit() {
    this.eleve.classe = this.classes.find(classe => classe.id === this.selectedClasse);

    this.eleveService.createEleve(this.selectedClasse, this.eleve)
      .subscribe(
        response => {
          console.log('Eleve created successfully:', response);
          // Reset the form or perform any other actions
        },
        error => {
          console.error('Error creating eleve:', error);
          // Handle the error
        }
      );
  }

}
