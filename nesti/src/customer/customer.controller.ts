import { Body, Controller, Get, HttpException, Post, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception-filters';
import { myFirstPipes } from 'src/pipes/my-first-pipes';
import { AddCustomerDto } from './dtos/addcustomer';
import { authenticationsGuards } from 'src/guards/authentications.guards';
 
@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Get()
    getAllCustomer(){
        return this.customerService.getAllCustomer();
    }

    @Post()
    @UseGuards( authenticationsGuards )
    @UsePipes( myFirstPipes )
    addCustomer(@Body() customerData: AddCustomerDto){
        return this.customerService.addCustomer(customerData);
    }
}
