import { Module } from '@nestjs/common';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { CustomerModule } from './customer/customer.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CustomerModule, CatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
