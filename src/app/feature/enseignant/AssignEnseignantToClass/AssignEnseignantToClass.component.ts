import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from 'src/app/core/model/Classe';
import { Enseignant } from 'src/app/core/model/Enseignant';
import { ClasseService } from 'src/app/core/service/classe.service';
import { EnseignantService } from 'src/app/core/service/enseignant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-AssignEnseignantToClass',
  templateUrl: './AssignEnseignantToClass.component.html',
  styleUrls: ['./AssignEnseignantToClass.component.css']
})
export class AssignEnseignantToClassComponent implements OnInit {
  enseignant!: Enseignant;
  selectedClasse!: Classe;
  classes: Classe[] = []; // Added the classes property

  constructor(    private enseignantService: EnseignantService,
    private route: ActivatedRoute,private router:Router,private classeService : ClasseService) { }

    ngOnInit() {
      const enseignantId = +(this.route.snapshot.paramMap?.get('id') || '0');
      this.enseignantService.getEnseignantById(enseignantId)
        .subscribe(enseignant => {
          this.enseignant = enseignant;
        });

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
    selectClasse(classe: Classe): void {
      this.selectedClasse = classe;
    }


    assignEnseignantToClasse(): void {
      if (this.enseignant.classes?.includes(this.selectedClasse)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'This enseignant is already assigned to this classe'
        });
        return;
      }
    
      const userId = this.enseignant.userId ?? 0;
    
      this.enseignantService.addEnseignantToClasse(this.selectedClasse.id!, userId)
      .subscribe(() => {
          this.enseignant.classes?.push(this.selectedClasse);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Enseignant assigned to classe successfully'
          });
          this.router.navigate(['/enseignants']);
        },
        (error) => {
          if (error.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'This enseignant is already assigned to this classe'
            });
          } else {
            console.error('Error assigning enseignant to classe:', error);
          }
        }
      );
    }
    

}
