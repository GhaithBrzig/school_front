import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comptable } from 'src/app/core/model/Comptable';
import { ComptableService } from 'src/app/core/service/comptables.service';

@Component({
  selector: 'app-comptableList',
  templateUrl: './comptableList.component.html',
  styleUrls: ['./comptableList.component.css']
})
export class ComptableListComponent implements OnInit {
  comptables: Comptable[] = [];

  constructor(private comptableService: ComptableService,private router:Router) { }

  ngOnInit(): void {
    this.getComptables();
  }

  getComptables(): void {
    this.comptableService.getAllComptables()
      .subscribe(
        (comptables: Comptable[]) => {
          this.comptables = comptables;
        },
        (error) => {
          console.error('Error fetching comptables:', error);
        }
      );
  }

  validateDocument(comptableid?: number): void {
    if (!comptableid) {
      console.error('Invalid class ID');
      return;
    }
    this.router.navigate(['/home/comptable/validerDoc', comptableid]);
  }
}
