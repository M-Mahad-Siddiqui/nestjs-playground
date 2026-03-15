import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationGuard } from 'src/guards/authentications.guards';
import { AuthorizationGuard } from 'src/guards/authoriztion.guards';

@Module({
  imports: [
    JwtModule.register({
      secret: "THIS IS MY SECRET KEY",
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, AuthenticationGuard, AuthorizationGuard],
  exports: [CustomerService],
})
export class CustomerModule {}
