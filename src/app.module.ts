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
  TransferController,
} from './presentation';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { keysecret } from './business/services/security/secret-key';

@Module({
  imports: [JwtModule.register({ secret: keysecret.secret })],
  controllers: [
    AccountController,
    CustomersController,
    DepositsController,
    SecurityController,
    TransferController,
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
