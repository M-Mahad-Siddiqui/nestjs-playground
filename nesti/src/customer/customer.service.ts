import { Injectable, Scope } from "@nestjs/common";

@Injectable({scope:Scope.REQUEST})
export class CustomerService {

    customers: any[] = [];

    addCustomer(customerData: any): { message: string; data: any } {
        this.customers.push(customerData);
        return {
            message: 'Customer added successfully',
            data: customerData,
        };
    }

    getAllCustomer(): { message: string; data: any[] } {
        return {
            message: 'Customers fetched successfully',
            data: this.customers,
        };
    }
}
