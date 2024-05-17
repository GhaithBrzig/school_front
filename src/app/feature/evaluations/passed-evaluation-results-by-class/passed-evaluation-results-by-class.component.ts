import { Component, OnInit } from '@angular/core';
import { EvaluationResultService } from "../../../core/service/evaluationResult.service";
import { EvaluationResult } from "../../../core/model/EvaluationResult";

@Component({
  selector: 'app-passed-evaluation-results-by-class',
  templateUrl: './passed-evaluation-results-by-class.component.html',
  styleUrls: ['./passed-evaluation-results-by-class.component.scss']
})
export class PassedEvaluationResultsByClassComponent implements OnInit {
  evaluationResults: EvaluationResult[] = [];
  filteredResults: EvaluationResult[] = [];
  uniqueClasses: string[] = [];
  evaluationGroups: { groupName: string; results: EvaluationResult[] }[] = [];


  constructor(private evaluationResultService: EvaluationResultService) { }

  ngOnInit(): void {
    this.fetchEvaluationResults();
  }

  fetchEvaluationResults(): void {
    this.evaluationResultService.getAllEvaluationResults().subscribe(results => {
      // Sort by evaluation.nom first
      results.sort((a, b) => {
        // @ts-ignore
        const evaluationComparison = a.evaluation.nom.localeCompare(b.evaluation.nom);
        if (evaluationComparison !== 0) {
          return evaluationComparison;
        }
        // If evaluation.nom is the same, sort by eleve.classe
        // @ts-ignore
        return a.eleve.classe.nom.localeCompare(b.eleve.classe.nom);
      });

      this.evaluationResults = results;
      this.filteredResults = this.evaluationResults;
      this.extractUniqueClasses();
      this.groupEvaluationResults();
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

  groupEvaluationResults(): void {
    this.evaluationGroups = [];
    let currentGroupName = '';
    let currentGroup: EvaluationResult[] = [];

    this.evaluationResults.forEach(result => {
      // @ts-ignore
      const groupName = result.evaluation.nom;
      if (groupName !== currentGroupName) {
        if (currentGroup.length > 0) {
          this.evaluationGroups.push({ groupName: currentGroupName, results: currentGroup });
        }
        // @ts-ignore
        currentGroupName = groupName;
        currentGroup = [];
      }
      currentGroup.push(result);
    });

    if (currentGroup.length > 0) {
      this.evaluationGroups.push({ groupName: currentGroupName, results: currentGroup });
    }
  }

  onClassChange(event: Event): void {
    const selectedClass = (event.target as HTMLSelectElement).value;
    if (selectedClass) {
      this.filteredResults = this.evaluationResults.filter(result =>
        result.eleve?.classe?.nom === selectedClass
      );
    } else {
      this.filteredResults = this.evaluationResults;
    }

    // Filter the evaluation groups based on the selected class
    this.evaluationGroups = this.filteredResults.reduce((groups, result) => {
      const groupName = result.evaluation?.nom;
      // @ts-ignore
      const existingGroup = groups.find(group => group.groupName === groupName);
      if (existingGroup) {
        // @ts-ignore
        existingGroup.results.push(result);
      } else {
        // @ts-ignore
        groups.push({ groupName, results: [result] });
      }
      return groups;
    }, []);
  }

}
