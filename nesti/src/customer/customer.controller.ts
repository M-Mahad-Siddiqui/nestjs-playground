import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
 
@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Get()
    getAllCustomer(){
        console.log('get all customer');
        return this.customerService.getAllCustomer();
    }

    @Post()
    addCustomer(@Body() customerData: { name: string }){
        this.customerService.addCustomer(customerData.name);
    }
}
