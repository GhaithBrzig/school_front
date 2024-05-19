import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Eleve } from 'src/app/core/model/Eleve';
import { Parent } from 'src/app/core/model/Parent';
import { ComptableService } from 'src/app/core/service/comptables.service';
import { EleveService } from 'src/app/core/service/eleve.service';
import { ParentService } from 'src/app/core/service/parent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validatePhoto',
  templateUrl: './validatePhoto.component.html',
  styleUrls: ['./validatePhoto.component.css']
})
export class ValidatePhotoComponent implements OnInit {
  parents: Parent[] = [];
  selectedFile: File | null = null;
  selectedParent: Parent | null = null;
  photoStates = ['VALIDE', 'NON_VALIDE', 'PAS_TRAITER'];
  comptableId!: number;

  constructor(private parentService: ParentService,private comptableService: ComptableService,private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const urlParts = this.activatedRoute.snapshot.url.map(segment => segment.path);
    const lastPart = urlParts[urlParts.length - 1];
    this.comptableId = parseInt(lastPart, 10);
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
        console.log(parents)

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

  // uploadPhoto(parent: Parent) {
  //   if (this.selectedFile && this.selectedParent && this.selectedParent.userId) {
  //     const fileType = this.selectedFile.type;
  //     const fileBlob = new Blob([this.selectedFile], { type: fileType });
  
  //     this.parentService.uploadPhoto(this.selectedParent.userId, this.selectedFile)
  //       .subscribe(
  //         (response) => {
  //           console.log(response);
  //           if (this.selectedParent) {
  //             this.selectedParent.photo = fileBlob;
  //           }
  //           this.selectedFile = null;
  //         },
  //         (error) => {
  //           console.error(error);
  //         }
  //       );
  //   }
  // }



  updateParentPhotoState(parentId: number, comptableId: number, photoState: string): void {
    this.comptableService.updateParentPhotoState(parentId, comptableId, photoState).subscribe(
      () => {
        console.log(`Parent photo state updated to ${photoState}`);
      },
    )}

    private blobToBase64(blob: Blob): Promise<string | null> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result instanceof ArrayBuffer) {
            const base64string = btoa(
              Array.from(new Uint8Array(reader.result))
                .map((byte) => String.fromCharCode(byte))
                .join('')
            );
            resolve('data:image/jpeg;base64,' + base64string);
          } else {
            resolve(null);
          }
        };
        reader.onerror = () => {
          reject(reader.error);
        };
        reader.readAsArrayBuffer(blob);
      });
    }
    
    getPhotoUrl(photo: Uint8Array | Blob | null): string | null {
      if (photo instanceof Uint8Array) {
        const blob = new Blob([photo], { type: 'image/jpeg' });
        return URL.createObjectURL(blob);
      } else if (photo instanceof Blob) {
        return URL.createObjectURL(photo);
      }
      return null;
    }

}