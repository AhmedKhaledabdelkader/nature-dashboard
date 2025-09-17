import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partners',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent {

  partnerForm!: FormGroup;
  partners: any[] = [];
  selectedLang: string = 'en';
  selectedPartnerId: number | null = null;

  successMsg = "";
  errorMsg = "";

  constructor(private fb: FormBuilder, private homeService: HomeService) {}

  ngOnInit(): void {
    this.partnerForm = this.fb.group({
      'partnerName[en]': [''],
      'partnerName[ar]': [''],
      partnerLogo: [null]
    });

    this.loadPartners();
  }

  onFileChange(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.partnerForm.patchValue({ [controlName]: file });
    }
  }

  // Add new partner
  addPartner() {
    if (this.partnerForm.valid) {
      const formData = this.prepareFormData();
      this.homeService.addPartner(formData).subscribe({
        next: (res) => {
          console.log('Partner added:', res);
          this.errorMsg = "";
          this.successMsg = res.message;
          this.loadPartners();
          this.partnerForm.reset();
        },
        error: (err) => {
          console.error('Error adding partner:', err);
          this.successMsg = "";
          this.errorMsg = "There is an error while creating partner";
        }
      });
    }
  }

  // Delete partner
  deletePartner(id: any) {
    this.homeService.deletePartner(id).subscribe({
      next: (response) => {
        console.log('Partner deleted');
        this.errorMsg = "";
        this.successMsg = response.message;
        this.loadPartners();
      },
      error: (err) => {
        console.error('Error deleting partner:', err);
        this.successMsg = "";
        this.errorMsg = "There is an error while deleting partner";
      }
    });
  }

  // Load all partners
  loadPartners() {
    const headers = new HttpHeaders().set('Accept-Language', this.selectedLang);
    this.homeService.getPartners(headers).subscribe({
      next: (data) => (this.partners = data.partners),
      error: (err) => console.error('Error loading partners:', err)
    });
  }

  // Prepare FormData
  private prepareFormData(): FormData {
    const formData = new FormData();
    Object.keys(this.partnerForm.controls).forEach(key => {
      formData.append(key, this.partnerForm.get(key)?.value);
    });
    return formData;
  }
}
