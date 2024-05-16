import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Classe } from 'src/app/core/model/Classe';
import { ClasseService } from 'src/app/core/service/classe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss']
})
export class ClassesListComponent implements OnInit {
  classes: Classe[] = [];

  constructor(private classeService: ClasseService,private router: Router) { }

  ngOnInit(): void {    
    this.getAllClasses();
  }

  getAllClasses() {
    this.classeService.getAllClasses().subscribe(
      (classes) => {
        this.classes = classes;
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  deleteClasse(id?: number) {
    if (!id) {
      console.error('Invalid class ID');
      return;
    }
      Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this class!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.classeService.deleteClasse(id).subscribe(
          (response) => {
            console.log('Class deleted successfully:', response);
            // Remove the deleted class from the list
            this.classes = this.classes.filter(c => c.id !== id);
            Swal.fire(
              'Deleted!',
              'The class has been deleted.',
              'success'
            );
          },
          (error) => {
            console.error('Error deleting class:', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the class.',
              'error'
            );
          }
        );
      }
    });
  }

  assignEvaluation(classeId?: number): void {
    if (!classeId) {
      console.error('Invalid class ID');
      return;
    }
    this.router.navigate(['/home/evaluations/form', classeId]);
  }

  editClasse(classe: Classe) {
    this.router.navigate(['/home/classes/edit', classe.id]);
  }


}
