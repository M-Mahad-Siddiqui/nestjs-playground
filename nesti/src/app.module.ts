import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { CustomerModule } from './customer/customer.module';
import { CatsModule } from './cats/cats.module';
import middleware1 from './middlers/middleware1';
import { Middleware3 } from './middlers/middleware3';

@Module({
  imports: [CustomerModule, CatsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(middleware1,Middleware3).forRoutes('customer');
  }
}
