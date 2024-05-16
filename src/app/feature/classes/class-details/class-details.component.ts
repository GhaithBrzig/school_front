import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from 'src/app/core/model/Classe';
import { ClasseService } from 'src/app/core/service/classe.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassesDetailsComponent implements OnInit {
  classForm!: FormGroup;
  classe!: Classe;
  constructor(    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private classeService: ClasseService
) { }

  ngOnInit() {
    this.classForm = this.fb.group({
      nom: ['', Validators.required],
      niveau: ['', Validators.required],
      nbrEleves: ['', Validators.required]

    });

    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getClasseById(id);
    });
  }

  getClasseById(id: number) {
    this.classeService.getClasseById(id).subscribe(
      classe => {
        this.classe = classe;
        this.classForm.patchValue({
          nom: classe.nom,
          niveau: classe.niveau,
          nbrEleves: classe.nbrEleves

        });
      },
      error => console.error(error)
    );
  }

  onSubmit() {
    if (this.classForm.valid && this.classe.id) {
  
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this class?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedClasse: Classe = {
            id: this.classe.id,
            nom: this.classForm.value.nom,
            niveau: this.classForm.value.niveau,
            nbrEleves: this.classForm.value.nbrEleves
          };
  
          this.classeService.updateClasse(this.classe.id as number, updatedClasse).subscribe(
            () => {
              console.log('Class updated successfully');
              Swal.fire(
                'Updated!',
                'Your class has been updated.',
                'success'
              );
              this.router.navigate(['/home/classes/claaseslist']);
            },
            error => {
              console.error(error);
              Swal.fire(
                'Error!',
                'There was an error updating the class.',
                'error'
              );
            }
          );
        }
      });
    }
  }
}