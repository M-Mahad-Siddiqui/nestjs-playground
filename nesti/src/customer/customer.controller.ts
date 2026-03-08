import { Body, Controller, Get, HttpException, Post, UseFilters } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception-filters';
 
@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Get()
    // @UseFilters( HttpExceptionFilter  )
    getAllCustomer(){
        throw new HttpException('Not implemented', 501);
        console.log('get all customer');
        return this.customerService.getAllCustomer();
    }

    @Post()
    addCustomer(@Body() customerData: { name: string }){
        this.customerService.addCustomer(customerData.name);
    }
}
