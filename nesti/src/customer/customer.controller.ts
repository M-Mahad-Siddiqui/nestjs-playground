import { Body, Controller, Get, HttpException, Post, UseFilters, UsePipes } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception-filters';
import { myFirstPipes } from 'src/pipes/my-first-pipes';
import { AddCustomerDto } from './dtos/addcustomer';
 
@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Get()
    getAllCustomer(){
        return this.customerService.getAllCustomer();
    }

    @Post()
    @UsePipes( myFirstPipes )
    addCustomer(@Body() customerData: AddCustomerDto){
        return this.customerService.addCustomer(customerData);
    }
}
