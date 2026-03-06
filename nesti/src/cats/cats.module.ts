import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [CustomerModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
