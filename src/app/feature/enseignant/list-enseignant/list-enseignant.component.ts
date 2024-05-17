import { Component, OnInit } from '@angular/core';
import {EnseignantService} from "../../../core/service/enseignant.service";
import {Enseignant} from "../../../core/model/Enseignant";

@Component({
  selector: 'app-list-enseignant',
  templateUrl: './list-enseignant.component.html',
  styleUrls: ['./list-enseignant.component.scss']
})
export class ListEnseignantComponent implements OnInit {
   enseignants!: Enseignant[];

  constructor(private enseignantService: EnseignantService) { }

  ngOnInit(): void {
    this.loadEnseignants();
  }
  loadEnseignants(): void {
    this.enseignantService.getAllEnseignants().subscribe(data => {
      this.enseignants = data;
      console.log(this.enseignants)
    });
  }
}
