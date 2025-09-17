import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-impacts',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './impacts.component.html',
  styleUrl: './impacts.component.scss'
})

export class ImpactsComponent {


  impactForm!: FormGroup;
  impacts: any[] = [];
  selectedLang: string = 'en';
  selectedImpactId: number | null = null;

  successMsg="";
  errorMsg="";

  constructor(private fb: FormBuilder, private homeService:HomeService) {}

  ngOnInit(): void {
    this.impactForm = this.fb.group({
      'impactName[en]': [''],
      'impactName[ar]': [''],
      impactNumber: [''],
      impactLogo: [null]
    });

    this.loadImpacts();
  }

  onFileChange(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.impactForm.patchValue({ [controlName]: file });
    }
  }

  // Add new impact
  addImpact() {
    if (this.impactForm.valid) {
      const formData = this.prepareFormData();
      this.homeService.addImpact(formData).subscribe({
        next: (res) => {
          console.log('Impact added:', res);
          this.errorMsg=""
        this.successMsg=res.message;
          this.loadImpacts();
          this.impactForm.reset();
        },
        error: (err) => {console.error('Error adding impact:', err)
      
        this.successMsg=""
        this.errorMsg="there is an error while creating impact"


      }
      });
    }
  }

  // Delete impact
  deleteImpact(id: any) {
    this.homeService.deleteImpact(id).subscribe({
      next: (response) => {
        console.log('Impact deleted');
        this.errorMsg=""
        this.successMsg=response.message;
        this.loadImpacts();

    
      },
      error: (err) => {
       
        console.error('Error deleting impact:', err)

        this.successMsg=""
        this.errorMsg="there is an error while creating impact"

      }
    
    });
  }

  // Load all impacts
  loadImpacts() {
    const headers = new HttpHeaders().set('Accept-Language', this.selectedLang);
    this.homeService.getImpacts(headers).subscribe({
      next: (data) => (this.impacts = data.impacts),
      error: (err) => console.error('Error loading impacts:', err)
    });
  }

  // Prepare FormData
  private prepareFormData(): FormData {
    const formData = new FormData();
    Object.keys(this.impactForm.controls).forEach(key => {
      formData.append(key, this.impactForm.get(key)?.value);
    });
    return formData;
  }

}
