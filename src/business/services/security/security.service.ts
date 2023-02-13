// Libraries
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

// Models
import { CustomerModel } from 'src/data/models';

// Repositories
import { CustomerRepository } from 'src/data/persistence/repositories';

// Services
import { AccountService } from '../account/account.service';
import { NewCustomerDTO } from '../../dtos/new-customer.dto';
import { JwtService } from '@nestjs/jwt';

// Entities
import {
  AccountTypeEntity,
  CustomerEntity,
  DocumentTypeEntity,
} from 'src/data/persistence/entities';
import { NewAccountDto } from 'src/business/dtos';
import { jwtConstants } from 'src/configs/constants.config';

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Identificarse en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signIn(user: CustomerModel): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.email,
      user.password,
    );
    if (answer) return 'Falta retornar un JWT';
    else throw new UnauthorizedException('Datos de identificación inválidos');
  }

  /**
   * Crear usuario en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */

  // eslint-disable-next-line @typescript-eslint/ban-types
  signUp(user: NewCustomerDTO): {} {
    const newCustomer = new CustomerEntity();
    const newDocumentType = new DocumentTypeEntity();
    newDocumentType.id = uuid();
    const findCustomer = this.customerRepository.findOneByEmail(user.email);
    if (findCustomer) {
      throw new BadRequestException();
    } else {
      newCustomer.documentType = newDocumentType;
      newCustomer.document = user.document;
      newCustomer.fullName = user.fullName;
      newCustomer.email = user.email;
      newCustomer.phone = user.phone;
      newCustomer.password = user.password;

      const customer = this.customerRepository.register(newCustomer);

      if (customer) {
        const accountType = new AccountTypeEntity();
        accountType.id = uuid();
        const newAccount = new NewAccountDto();
        newAccount.CustomerEntity = customer.id;
        newAccount.accountType = accountType.id;

        const account = this.accountService.createAccount(newAccount);

        if (account)
          return { access_token: this.jwtService.sign({ id: customer.id }) };
        else throw new InternalServerErrorException();
      } else throw new InternalServerErrorException();
    }
  }

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWToken: string): void {
    this.jwtService.verify(JWToken, {
      secret: jwtConstants.secret,
      maxAge: '0h',
    });
  }
}
function uuid(): string {
  throw new Error('Function not implemented.');
}
