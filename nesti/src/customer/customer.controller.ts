import { Body, Controller, Get, Headers, Post, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { myFirstPipes } from 'src/pipes/my-first-pipes';
import { AddCustomerDto } from './dtos/addcustomer';
import { AuthenticationGuard } from 'src/guards/authentications.guards';
import { AuthorizationGuard } from 'src/guards/authoriztion.guards';
import { Roles } from 'src/decorators/role.decorator';
import { CustomInterceptor } from 'src/interceptors/customIntercepter.interceptor';
 
@Roles('admin') // Apply the Roles decorator to specify that only users with the 'admin' role can access this controller
@UseGuards(AuthenticationGuard, AuthorizationGuard) // Apply the authentication and authorization guards to all routes in this controller
@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    @Get()
    @UseInterceptors(CustomInterceptor)
    getAllCustomer(@Headers('accept-language') language: string){
        console.log('Language from header: ', language);
        return this.customerService.getAllCustomer();
    }

    @Post()
    // @UseGuards(AuthenticationGuard)
    @UsePipes(myFirstPipes)
    addCustomer(@Body() customerData: AddCustomerDto){
        return this.customerService.addCustomer(customerData);
    }
}
