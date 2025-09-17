import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  private apiUrl="https://pvc-mardi-inbox-adjust.trycloudflare.com/api/"


addCompany(data:any):Observable<any>{

    return this.http.post(`${this.apiUrl}companies`,data);

  }

  getCompanies(headers:any):Observable<any>{

    return this.http.get(`${this.apiUrl}companies`,{headers});

  }

  deleteCompany(companyId:any):Observable<any>{

    return this.http.delete(`${this.apiUrl}companies/${companyId}`);

  }

  addImpact(data: FormData) {
    return this.http.post<any>(`${this.apiUrl}impacts`, data);
  }
  
  getImpacts(headers: any) {
    return this.http.get<any>(`${this.apiUrl}impacts`, { headers });
  }
  
  deleteImpact(id:any) {
    return this.http.delete<any>(`${this.apiUrl}impacts/${id}`);
  }
  
  getCountries(headers:any): Observable<any> {
    return this.http.get(`${this.apiUrl}countries`, { headers });
  }

  getCountry(headers:any,id:any): Observable<any> {
    return this.http.get(`${this.apiUrl}countries/${id}`, { headers });
  }

  // Add new country
  addCountry(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}countries`, formData);
  }

  // Delete country
  deleteCountry(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}countries/${id}`);
  }

  getProjects(headers:any): Observable<any> {
    return this.http.get(`${this.apiUrl}projects`, { headers });
  }

  // Add project
  addProject(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}projects`, formData);
  }

  // Delete project
  deleteProject(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}projects/${id}`);
  }


  // Partners CRUD methods in HomeService

addPartner(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}partners`, data);
}

getPartners(headers: any): Observable<any> {
  return this.http.get(`${this.apiUrl}partners`, { headers });
}

deletePartner(partnerId: any): Observable<any> {
  return this.http.delete(`${this.apiUrl}partners/${partnerId}`);
}

// Add theme
addTheme(data: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}themes`, data);
}

// Get all themes
getThemes(headers: any): Observable<any> {
  return this.http.get(`${this.apiUrl}themes`, { headers });
}

// Delete theme
deleteTheme(themeId: any): Observable<any> {
  return this.http.delete(`${this.apiUrl}themes/${themeId}`);
}




}
