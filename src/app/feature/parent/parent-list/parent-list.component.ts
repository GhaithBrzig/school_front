import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Parent } from 'src/app/core/model/Parent';
import { ParentService } from 'src/app/core/service/parent.service';

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent implements OnInit {
  parents: Parent[] = [];
  selectedFile: File | null = null;
  selectedParent: Parent | null = null;

  constructor(private parentService: ParentService,private router: Router) { }

  ngOnInit() {
    this.getAllParents();

  }

  onFileSelected(event: any, parent: Parent) {
    this.selectedFile = event.target.files[0];
    this.selectedParent = parent;
  }

  getAllParents() {
    this.parentService.getAllParents().subscribe(
      (parents) => {
        this.parents = parents;
      },
      (error) => {
        console.error('Error fetching parents:', error);
      }
    );
  }


  navigateToAssignClasses(parentId: number | undefined): void {
    if (parentId !== undefined) {
      this.router.navigate(['home/parent/assignParent', parentId]);
    }
  }

  deleteParent(parentId: number) {
    this.parentService.deleteParent(parentId).subscribe(
      () => {
        console.log('Parent deleted successfully');
        this.getAllParents();
      },
      (error) => {
        console.error('Error deleting parent:', error);
      }
    );
  }

  getElevesForParent(parent: Parent) {
    this.parentService.getElevesForParent(parent.userId!).subscribe(
      (eleves) => {
        parent.enfants = eleves;
      },
      (error) => {
        console.error(`Error fetching eleves for parent ${parent.userId}:`, error);
      }
    );
  }

  uploadPhoto(parent: Parent) {
    if (this.selectedFile && this.selectedParent && this.selectedParent.userId) {
      const fileType = this.selectedFile.type;
      const fileBlob = new Blob([this.selectedFile], { type: fileType });
  
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      reader.onload = () => {
        const base64String = reader.result as string;
  
        if (this.selectedParent && this.selectedParent.userId && this.selectedFile) { // null check added
          this.parentService.uploadPhoto(this.selectedParent.userId, this.selectedFile)
            .subscribe(
              (response) => {
                console.log(response);
                // Update the photo property of the selected parent
                if (this.selectedParent) {
                  this.selectedParent.photo = base64String.split(',')[1]; // Remove the data:image/... prefix
                }
                // Clear the selected file
                this.selectedFile = null;
              },
              (error) => {
                console.error(error);
                // Handle error response
              }
            );
        }
      };
    }
  }
  

  getPhotoUrl(photo: Blob): string {
    return URL.createObjectURL(photo);
  }
  
}