import { Injectable } from '@nestjs/common';
import { NewAccountDto, NewCustomerDTO } from 'src/business/dtos';
import { AccountService } from '../account/account.service';
import { DocumentTypeRepository } from '../../../data/persistence/repositories/document-type.repository';
import { CustomerEntity, CustomerRepository } from 'src/data';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
    private readonly documentTypeRepository: DocumentTypeRepository,
  ) {}

  transmap(customer: NewCustomerDTO): CustomerEntity {
    const documentType = this.documentTypeRepository.findOneById(
      customer.accountTypeId,
    );
    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = customer.document;
    newCustomer.fullName = customer.fullName;
    newCustomer.email = customer.email;
    newCustomer.phone = customer.phone;
    newCustomer.password = customer.password;

    return newCustomer;
  }

  findAll(): CustomerEntity[] {
    return this.customerRepository.findAll();
  }

  newCustomer(customer: NewCustomerDTO): CustomerEntity {
    const customermap = this.transmap(customer);
    const accountDto = new NewAccountDto();
    const newCustomer = this.customerRepository.register(customermap);
    accountDto.CustomerEntity = newCustomer.id;
    accountDto.accountType = 'c49fdd2a-a365-11ed-a8fc-0242ac120002';
    accountDto.balance = 0;
    this.accountService.createAccount(accountDto);
    return newCustomer;
  }
  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    const newCustomer = this.customerRepository.findOneById(customerId);
    return newCustomer;
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomer(id: string, customer: NewCustomerDTO): CustomerEntity {
    return this.customerRepository.update(id, this.transmap(customer));
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    let unsubscribe = new CustomerEntity();
    unsubscribe = this.customerRepository.findOneById(id);
    if (unsubscribe.state == true) {
      unsubscribe.state = false;
    }
    return unsubscribe.state;
  }
}
