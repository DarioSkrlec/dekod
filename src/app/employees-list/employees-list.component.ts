import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../services/employee.service';
import { IEmployee } from '../interfaces/employee.interface';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dateOfBirth', 'jobTitle'];
  dataSource = new MatTableDataSource<IEmployee>();
  jobFilter: string = '';
  jobTitles: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(response => {
      this.dataSource.data = response.data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.jobTitles = Array.from(new Set(response.data.map(employee => employee.jobTitle)));
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: IEmployee, filter: string) => {
      return data.firstName.toLowerCase().includes(filter) ||
        data.lastName.toLowerCase().includes(filter);
    };

    this.dataSource.filter = filterValue;
  }

  applyJobFilter(selectedJob: string): void {
    this.jobFilter = selectedJob.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: IEmployee, filter: string) => {
      return filter === '' || data.jobTitle.toLowerCase().includes(filter);
    };
    this.dataSource.filter = this.jobFilter;
  }
}
