import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evaluation } from 'src/app/core/model/Evaluation';
import { AccountService } from 'src/app/core/service/account.service';
import { ClasseService } from 'src/app/core/service/classe.service';
import { EvaluationService } from 'src/app/core/service/evaluation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assignEva',
  templateUrl: './assignEva.component.html',
  styleUrls: ['./assignEva.component.css']
})
export class AssignEvaComponent implements OnInit {
  classeId!: number;
  evaluations: Evaluation[] = [];
  selectedEvaluationId: number | undefined;

  private baseUrl = 'http://localhost:8082/classes';

  constructor(    private route: ActivatedRoute,
    private classeService: ClasseService,
    private evaluationService: EvaluationService,
    private router: Router,
    private http: HttpClient
) { }

ngOnInit(): void {
  const urlParts = this.route.snapshot.url.map(segment => segment.path);
  const lastPart = urlParts[urlParts.length - 1];
  this.classeId = parseInt(lastPart, 10);
  this.getAvailableEvaluations();
}

getAvailableEvaluations(): void {
  // Call the service method to fetch available evaluations
  this.evaluationService.getAllEvaluations().subscribe(
    (evaluations) => {
      this.evaluations = evaluations;

      console.log(evaluations)
    },
    (error) => {
      console.error('Error fetching evaluations:', error);
    }
  );
}
onSelectEvaluation(event: any): void {
  this.selectedEvaluationId = event.target.value;
}
assignEvaluationToClasse(): void {
  if (this.classeId && this.selectedEvaluationId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will assign the selected evaluation to the class.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, assign it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.value) {
        const url = `${this.baseUrl}/${this.classeId}/evaluations/${this.selectedEvaluationId}`;
        this.http.post(url, null, { responseType: 'text' }).subscribe(
          () => {
            console.log('Evaluation assigned successfully');
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Evaluation has been assigned to the class.'
            });
            this.router.navigate(['/home/classes/claaseslist']);
          },
          (error) => {
            console.error('Error assigning evaluation:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong while assigning the evaluation to the class.'
            });
          }
        );
      }
    });
  }

}



}