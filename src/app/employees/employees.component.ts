import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { EmployeesListComponent } from '../employees-list/employees-list.component';
import { CreateEmployeeComponent } from "../create-employee/create-employee.component";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule,
    MatTabsModule,
    EmployeesListComponent, CreateEmployeeComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {

}
