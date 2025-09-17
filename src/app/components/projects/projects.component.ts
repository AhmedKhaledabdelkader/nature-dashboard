import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-projects',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {


  projectForm!: FormGroup;
  projects: any[] = [];
  countries: any[] = [];
  selectedLang: string = 'en';
  selectedProjectId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: HomeService,
    private countryService: HomeService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      'projectName[en]': [''],
      'projectName[ar]': [''],
      'projectDescription[en]': [''],
      'projectDescription[ar]': [''],
      projectImage: [null],
      country_id: ['']
    });

    this.loadProjects();
    this.loadCountries();
  }

  // file input
  onFileChange(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.projectForm.patchValue({ [controlName]: file });
    }
  }

  // Add project
  addProject() {
    if (this.projectForm.valid) {
      const formData = this.prepareFormData();
      this.projectService.addProject(formData).subscribe({
        next: (res) => {
          console.log('Project added:', res);
          this.loadProjects();
          this.projectForm.reset();
        },
        error: (err) => console.error('Error adding project:', err)
      });
    }
  }

  // Delete project
  deleteProject(id: any) {
    this.projectService.deleteProject(id).subscribe({
      next: () => {
        console.log('Project deleted');
        this.loadProjects();
      },
      error: (err) => console.error('Error deleting project:', err)
    });
  }

  
  // Load countries for dropdown
  loadCountries() {
    const headers = new HttpHeaders().set('Accept-Language', this.selectedLang);
    this.countryService.getCountries(headers).subscribe({
      next: (data) => (this.countries = data.countries),
      error: (err) => console.error('Error loading countries:', err)
    });
  }

  // prepare FormData
  private prepareFormData(): FormData {
    const formData = new FormData();
    Object.keys(this.projectForm.controls).forEach(key => {
      formData.append(key, this.projectForm.get(key)?.value);
    });
    return formData;
  }

  loadProjects() {
    const headers = new HttpHeaders().set('Accept-Language', this.selectedLang);
  
    this.projectService.getProjects(headers).subscribe({
      next: (data) => {
        this.projects = data.projects;
  
        // Loop على كل project ونجيب الدولة بتاعته
        this.projects.forEach((project: any) => {
          this.projectService.getCountry(headers, project.countryId).subscribe({
            next: (countryData) => {
              project.countryName = countryData.country.countryName; // أضف اسم الدولة للـ object
            },
            error: (err) => console.error("Error fetching country:", err)
          });
        });
      },
      error: (err) => console.error("Error loading projects:", err)
    });
  }
  


}
