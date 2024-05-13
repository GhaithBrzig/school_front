import { Component, OnInit } from '@angular/core';
import { Classe } from 'src/app/core/model/Classe';
import { ClasseService } from 'src/app/core/service/classe.service';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss']
})
export class ClassesListComponent implements OnInit {
  classes!: Classe[];

  constructor(private classeService: ClasseService) { }

  ngOnInit(): void {
    this.getAllClasses();
  }


  getAllClasses(): void {
    this.classeService.getAllClasses().subscribe(
      data => {
        this.classes = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
