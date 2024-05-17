import { Component, OnInit } from '@angular/core';
import {EvaluationResultService} from "../../../core/service/evaluationResult.service";
import {EvaluationResult} from "../../../core/model/EvaluationResult";
import {Classe} from "../../../core/model/Classe";


@Component({
  selector: 'app-passed-evaluation-results-by-class',
  templateUrl: './passed-evaluation-results-by-class.component.html',
  styleUrls: ['./passed-evaluation-results-by-class.component.scss']
})
export class PassedEvaluationResultsByClassComponent implements OnInit {
  evaluationResults: EvaluationResult[] = [];
  filteredResults: EvaluationResult[] = [];
  uniqueClasses: string[] = [];

  constructor(private evaluationResultService: EvaluationResultService) { }

  ngOnInit(): void {
    this.fetchEvaluationResults();
  }

  fetchEvaluationResults(): void {
    this.evaluationResultService.getAllEvaluationResults().subscribe(results => {
      // @ts-ignore
      this.evaluationResults = results.sort((a, b) => a.evaluation.nom.localeCompare(b.evaluation.nom));
      this.filteredResults = this.evaluationResults;
      this.extractUniqueClasses();
    });
  }

  extractUniqueClasses(): void {
    const classSet = new Set<string>();
    this.evaluationResults.forEach(result => {
      // @ts-ignore
      classSet.add(result.eleve?.classe?.nom);
    });
    this.uniqueClasses = Array.from(classSet);
  }

  onClassChange(event: Event): void {
    const selectedClass = (event.target as HTMLSelectElement).value;
    this.filteredResults = selectedClass
      ? this.evaluationResults.filter(result => result.eleve?.classe?.nom === selectedClass)
      : this.evaluationResults;
  }
}
