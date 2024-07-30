import { IEmployee } from "./employee.interface";

export interface IEmployeeResponse {
    success: boolean;
    data: IEmployee[];
}