import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { ImpactsComponent } from './components/impacts/impacts.component';
import { CountriesComponent } from './components/countries/countries.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { PartnersComponent } from './components/partners/partners.component';
import { ThemesComponent } from './components/themes/themes.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'companies', component: CompaniesComponent },
    { path: 'impacts', component: ImpactsComponent },
    {path:"countries",component:CountriesComponent},
    {path:"projects",component:ProjectsComponent},
    {path:"partners",component:PartnersComponent},
    {path:"themes",component:ThemesComponent}
  ];
  