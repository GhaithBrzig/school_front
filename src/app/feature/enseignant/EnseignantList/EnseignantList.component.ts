import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Classe } from 'src/app/core/model/Classe';
import { Enseignant } from 'src/app/core/model/Enseignant';
import { EnseignantService } from 'src/app/core/service/enseignant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-EnseignantList',
  templateUrl: './EnseignantList.component.html',
  styleUrls: ['./EnseignantList.component.css']
})
export class EnseignantListComponent implements OnInit {
  enseignants: Enseignant[] = [];
  classes: Classe[] = [];

  constructor(private enseignantService: EnseignantService,
    private router: Router) { }

  ngOnInit() {
    this.getAllEnseignants();
  }

  getAllEnseignants(): void {
    this.enseignantService.getAllEnseignants().subscribe(
      (enseignants) => {
        this.enseignants = enseignants;
        this.getClassesForEnseignants();

      },
      (error) => {
        console.error('Error fetching enseignants:', error);
      }
    );
  }

  deleteEnseignant(userId: number| undefined): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this enseignant!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (userId !== undefined) {

        this.enseignantService.deleteEnseignant(userId).subscribe(
          () => {
            console.log('Enseignant deleted successfully');
            this.getAllEnseignants();
            Swal.fire(
              'Deleted!',
              'Your enseignant has been deleted.',
              'success'
            );
          },
          (error) => {
            console.error('Error deleting enseignant:', error);
            Swal.fire(
              'Error!',
              'There was an error while deleting the enseignant.',
              'error'
            );
          }
        );
      }}
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
