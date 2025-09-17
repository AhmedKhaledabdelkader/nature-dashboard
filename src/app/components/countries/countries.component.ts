import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-countries',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent {

  countryForm!: FormGroup;
  countries: any[] = [];
  selectedLang: string = 'en';
  selectedCountryId: number | null = null;
  successMsg="";
  errorMsg="";

  constructor(private fb: FormBuilder, private countryService:HomeService) {}

  ngOnInit(): void {
    this.countryForm = this.fb.group({
      'countryName[en]': [''],
      'countryName[ar]': ['']
    });

    this.loadCountries();
  }

  // Add new country
  addCountry() {
    if (this.countryForm.valid) {
      const formData = this.prepareFormData();
      this.countryService.addCountry(formData).subscribe({
        next: (res) => {
          console.log('Country added:', res);
          this.errorMsg=""
          this.successMsg=res.messsage
          this.loadCountries();
          this.countryForm.reset();
        },
        error: (err) =>{ 
          console.error('Error adding country:', err)
      
          this.successMsg=""
          this.errorMsg="there is an error while creating the impact"
      
      }
      });
    }
  }

  // Delete country
  deleteCountry(id: any) {
    this.countryService.deleteCountry(id).subscribe({
      next: (res) => {
        console.log('Country deleted');
        this.errorMsg=""
        this.successMsg=res.messsage
        this.loadCountries();
      },
      error: (err) => {console.error('Error deleting country:', err)
    
      this.errorMsg="there is an error while deleting the country"
      this.successMsg=""
    }
    });
  }

  // Load all countries
  loadCountries() {
    const headers = new HttpHeaders().set('Accept-Language', this.selectedLang);
    this.countryService.getCountries(headers).subscribe({
      next: (data) => (this.countries = data.countries),
      error: (err) => console.error('Error loading countries:', err)
    });
  }

  // Prepare FormData
  private prepareFormData(): FormData {
    const formData = new FormData();
    Object.keys(this.countryForm.controls).forEach(key => {
      formData.append(key, this.countryForm.get(key)?.value);
    });
    return formData;
  }
}


