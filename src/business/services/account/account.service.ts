import { AccountTypeRepository } from './../../../data/persistence/repositories/account-type.repository';
import { Injectable } from '@nestjs/common';
import { NewAccountDto } from 'src/business/dtos';
import { AccountEntity, AccountRepository, CustomerRepository } from 'src/data';

@Injectable()
export class AccountServices {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
  ) {}

  accountMapping(account: NewAccountDto): AccountEntity {
    let newUserAccount = new AccountEntity();
    newUserAccount = new AccountEntity();
    newUserAccount.customer = this.customerRepository.findOneById(
      account.CustomerEntity,
    );
    newUserAccount.accountType = this.accountTypeRepository.findOneById(
      account.accountType,
    );
    return newUserAccount;
  }
  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(accountId: NewAccountDto): AccountEntity {
    const createAccount = this.accountMapping(accountId);
    return this.accountRepository.register(createAccount);
  }
  /**
   * Obtener el balance de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {number}
   * @memberof AccountService
   */

  getBalance(accountId: string): number {
    return this.accountRepository.findOneById(accountId).balance;
  }

  /**
   * Agregar balance a una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */

  putBalance(accountId: string, amount: number) {
    this.accountRepository.findOneById(accountId).balance += amount;
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */

  removeBalance(accountId: string, amount: number) {
    this.accountRepository.findOneById(accountId).balance -= amount;
  }
}
