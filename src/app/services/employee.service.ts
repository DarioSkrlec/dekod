import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployeeResponse } from '../interfaces/employee-response.interface';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private apiUrl = 'https://api.test.ulaznice.hr/paganini/api/job-interview/employees';

    constructor(private http: HttpClient) { }

    getEmployees(): Observable<IEmployeeResponse> {
        return this.http.get<IEmployeeResponse>(this.apiUrl);
    }
}