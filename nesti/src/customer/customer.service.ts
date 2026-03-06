import { Injectable, Scope } from "@nestjs/common";

@Injectable({scope:Scope.REQUEST})
export class CustomerService {

    customer: string[] = [];

    addCustomer(name:string):void{
        this.customer.push(name);
    }

    getAllCustomer(){
        return this.customer;
    }
}
