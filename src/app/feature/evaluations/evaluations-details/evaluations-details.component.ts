import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evaluation } from '../../../core/model/Evaluation';
import { EvaluationService } from '../../../core/service/evaluation.service';

@Component({
  selector: 'app-evaluations-details',
  templateUrl: './evaluations-details.component.html',
  styleUrls: ['./evaluations-details.component.scss']
})
export class EvaluationsDetailsComponent implements OnInit {
  evaluation: Evaluation | undefined;

  constructor(private route: ActivatedRoute, private evaluationService: EvaluationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.evaluationService.getEvaluationById(id).subscribe(
        (evaluation) => {
          this.evaluation = evaluation;
          console.log('Evaluation Details:', this.evaluation);
        },
        (error) => {
          console.error('Error fetching evaluation details:', error);
        }
      );
    });
  }
}
