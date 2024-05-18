import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Eleve } from 'src/app/core/model/Eleve';
import { Parent } from 'src/app/core/model/Parent';
import { EleveService } from 'src/app/core/service/eleve.service';
import { ParentService } from 'src/app/core/service/parent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-AssignEnfentToParent',
  templateUrl: './AssignEnfentToParent.component.html',
  styleUrls: ['./AssignEnfentToParent.component.css']
})
export class AssignEnfentToParentComponent implements OnInit {
  parent!: Parent;
  eleves: Eleve[] = [];
  selectedEleve!: Eleve;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eleveService: EleveService,
    private parentService: ParentService
  ) {}

  ngOnInit() {
    const parentID = +(this.route.snapshot.paramMap?.get('id') || '0');
    this.parentService.getParentById(parentID).subscribe(
      (parent) => {
        this.parent = parent;
      },
      (error) => {
        console.error('Error fetching parent:', error);
      }
    );

    this.getAllEleves();
  }

  getAllEleves() {
    this.eleveService.getAllEleves().subscribe(
      (eleves) => {
        this.eleves = eleves;
      },
      (error) => {
        console.error('Error fetching eleves:', error);
      }
    );
  }

  selectEnfent(eleve: Eleve): void {
    this.selectedEleve = eleve;
  }

  assignEnfantToParent() {
    if (this.selectedEleve && this.parent) {
      this.parentService.assignEnfantToParent(this.parent.userId!, this.selectedEleve.userId!).subscribe(
        () => {
          Swal.fire('Success', 'Student assigned to parent successfully', 'success');
          this.router.navigate(['home/parent/listParent']);

        },
        (error) => {
          console.error('Error assigning student to parent:', error);
          Swal.fire('Error', 'Parent is already assigned to the eleve', 'error');
          this.router.navigate(['home/parent/listParent']);

        }
      );
    }
  }
}