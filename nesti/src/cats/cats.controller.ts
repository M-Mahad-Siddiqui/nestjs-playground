import { Controller } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CustomerService } from '../customer/customer.service';

@Controller('cats')
export class CatsController {
  // constructor(private readonly catsService: CatsService) {}
  constructor(private readonly customerService: CustomerService) {}
}
