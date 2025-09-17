import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-companies',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {


  companyForm!: FormGroup;
  companies: any[] = [];
  selectedLang: string = 'en';
  selectedCompanyId: number | null = null;

  constructor(private fb: FormBuilder, private companyService:HomeService) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      'company_name[en]': [''],
      'company_name[ar]': [''],
      'company_description[en]': [''],
      'company_description[ar]': [''],
      company_image: [null],
      company_logo: [null]
    });

    this.loadCompanies();
  }

  onFileChange(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.companyForm.patchValue({ [controlName]: file });
    }
  }

  // Add new company
  addCompany() {
    if (this.companyForm.valid) {
      const formData = this.prepareFormData();
      this.companyService.addCompany(formData).subscribe({
        next: (res) => {
          console.log('Company added:', res);
          this.loadCompanies();
          this.companyForm.reset();
        },
        error: (err) => console.error('Error adding company:', err)
      });
    }
  }
/*
  // Update existing company
  updateCompany() {
    if (this.companyForm.valid && this.selectedCompanyId) {
      const formData = this.prepareFormData();
      this.companyService.updateCompany(this.selectedCompanyId, formData).subscribe({
        next: (res) => {
          console.log('Company updated:', res);
          this.loadCompanies();
          this.companyForm.reset();
          this.selectedCompanyId = null;
        },
        error: (err) => console.error('Error updating company:', err)
      });
    }
  }
*/
  // Delete company
  deleteCompany(id:any) {
    this.companyService.deleteCompany(id).subscribe({
      next: () => {
        console.log('Company deleted');
        this.loadCompanies();
      },
      error: (err) => console.error('Error deleting company:', err)
    });
  }

  // Load all companies
  loadCompanies() {
    const headers = new HttpHeaders().set('Accept-Language', this.selectedLang);
    this.companyService.getCompanies(headers).subscribe({
      next: (data) => (this.companies = data.companies),
      error: (err) => console.error('Error loading companies:', err)
    });
  }

  // Prepare FormData
  private prepareFormData(): FormData {
    const formData = new FormData();
    Object.keys(this.companyForm.controls).forEach(key => {
      formData.append(key, this.companyForm.get(key)?.value);
    });
    return formData;
  }



}
