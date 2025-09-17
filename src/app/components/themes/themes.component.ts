import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { HomeService } from '../../services/home.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-themes',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent {

  themeForm!: FormGroup;
  themes: any[] = [];
  selectedLang: string = 'en';
  selectedThemeId: number | null = null;

  successMsg = "";
  errorMsg = "";

  constructor(private fb: FormBuilder, private themeService:HomeService) {}

  ngOnInit(): void {
    this.themeForm = this.fb.group({
      'themeName[en]': [''],
      'themeName[ar]': [''],
      'themeDescription[en]': [''],
      'themeDescription[ar]': [''],
      themeImage: [null]
    });

    this.loadThemes();
  }

  onFileChange(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.themeForm.patchValue({ [controlName]: file });
    }
  }

  // Add new theme
  addTheme() {
    if (this.themeForm.valid) {
      const formData = this.prepareFormData();
      this.themeService.addTheme(formData).subscribe({
        next: (res) => {
          console.log('Theme added:', res);
          this.errorMsg = "";
          this.successMsg = res.message;
          this.loadThemes();
          this.themeForm.reset();
        },
        error: (err) => {
          console.error('Error adding theme:', err);
          this.successMsg = "";
          this.errorMsg = "There is an error while creating theme";
        }
      });
    }
  }

  // Delete theme
  deleteTheme(id: any) {
    this.themeService.deleteTheme(id).subscribe({
      next: (res) => {
        console.log('Theme deleted:', res);
        this.errorMsg = "";
        this.successMsg = res.message;
        this.loadThemes();
      },
      error: (err) => {
        console.error('Error deleting theme:', err);
        this.successMsg = "";
        this.errorMsg = "There is an error while deleting theme";
      }
    });
  }

  // Load all themes
  loadThemes() {
    const headers = new HttpHeaders().set('Accept-Language', this.selectedLang);
    this.themeService.getThemes(headers).subscribe({
      next: (data) => (this.themes = data.themes),
      error: (err) => console.error('Error loading themes:', err)
    });
  }

  // Prepare FormData
  private prepareFormData(): FormData {
    const formData = new FormData();
    Object.keys(this.themeForm.controls).forEach(key => {
      formData.append(key, this.themeForm.get(key)?.value);
    });
    return formData;
  }

}
