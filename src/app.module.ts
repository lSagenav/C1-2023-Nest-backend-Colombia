// Libraries
import { Module } from '@nestjs/common';

// Repositories
import {
  AccountRepository,
  AccountTypeRepository,
  CustomerRepository,
  DepositRepository,
  DocumentTypeRepository,
  TransferRepository,
} from './data';

// Services
import {
  AccountService,
  CustomerService,
  DepositService,
  SecurityService,
  TransferService,
} from './business';

// Controllers
import {
  AccountController,
  CustomersController,
  DepositsController,
  SecurityController,
  TransfersController,
} from './presentation';

@Module({
  imports: [],
  controllers: [
    AccountController,
    CustomersController,
    DepositsController,
    SecurityController,
    TransfersController,
  ],
  providers: [
    AccountService,
    CustomerService,
    DepositService,
    SecurityService,
    TransferService,
    AccountRepository,
    AccountTypeRepository,
    CustomerRepository,
    DepositRepository,
    DocumentTypeRepository,
    TransferRepository,
  ],
})
export class AppModule {}
