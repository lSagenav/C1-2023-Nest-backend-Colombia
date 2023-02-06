import { AccountTypeRepository } from './../../../data/persistence/repositories/account-type.repository';
import { Injectable } from '@nestjs/common';
import { NewAccountDto } from 'src/business/dtos';
import {
  AccountEntity,
  AccountRepository,
  AccountTypeEntity,
  CustomerRepository,
} from 'src/data';

@Injectable()
export class AccountService {
  findOneById(account: string) {
    throw new Error('Method not implemented.');
  }
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
    newUserAccount.balance = Number(account.balance);
    return newUserAccount;
  }
  /**
   * Crear una cuenta
   *
   * @param {AccountModel} account
   * @return {*}  {AccountEntity}
   * @memberof AccountService
   */
  createAccount(account: NewAccountDto): AccountEntity {
    const createAccount = this.accountMapping(account);
    return this.accountRepository.register(createAccount);
  }
  /**
   *obtener cuenta por id
   */
  getAccountId(customerId: string): AccountEntity[] {
    return this.accountRepository.findByCustomer(customerId);
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
    let accountEntity = new AccountEntity();
    accountEntity = this.accountRepository.findOneById(accountId);
    accountEntity.balance += Number(amount);
    this.accountRepository.update(accountId, accountEntity);
    return accountEntity.balance;
  }

  /**
   * Remover balance de una cuenta
   *
   * @param {string} accountId
   * @param {number} amount
   * @memberof AccountService
   */

  // removeBalance(accountId: string, amount: number) {
  //   this.accountRepository.findOneById(accountId).balance -= amount;
  // }
  removeBalance(accountId: string, amount: number): void {
    if (this.verifyAmountIntoBalance(accountId, amount)) {
      this.accountRepository.findOneById(accountId).balance -= amount;
    } else {
      throw new Error(
        'El valor que desea retirar no puede ser mayor al saldo que tiene en su cuenta',
      );
    }
  }
  verifyAmountIntoBalance(accountId: string, amount: number): boolean {
    const account = this.accountRepository.findOneById(accountId);
    if (account.balance < amount) {
      return false;
    }
    return true;
  }
  /**
   * Verificar la disponibilidad de un monto a retirar de una cuenta
   *
   * @param {string} accountId
   * @param {string} amount
   * @return {*}  {boolean}
   * @memberof AccountService
   */

  verifyBalance(accountId: string, amount: number): boolean {
    if (this.accountRepository.findOneById(accountId).balance >= amount) {
      return true;
    }
    return false;
  }
  /**
   * Obtener el estado de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {boolean}
   * @memberof AccountService
   */
  gettStatus(accountId: string): boolean {
    return this.accountRepository.findOneById(accountId).state;
  }

  /**
   * Cambiar el estado de una cuenta
   *
   * @param {string} accountId
   * @param {boolean} state
   * @memberof AccountService
   */

  changetState(accountId: string, state: boolean) {
    this.accountRepository.findOneById(accountId).state = state;
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   *
   * @param {string} accountId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */

  getAccount(accountId: string): AccountTypeEntity {
    let newAccount = new AccountTypeEntity();
    newAccount = this.accountRepository.findOneById(accountId).accountType;
    return newAccount;
  }

  /**
   * Cambiar el tipo de cuenta a una cuenta
   *
   * @param {string} accountId
   * @param {string} accountTypeId
   * @return {*}  {AccountTypeEntity}
   * @memberof AccountService
   */
  changeAccount(accountId: string, accountTypeId: string): AccountTypeEntity {
    const newChangeAccount = this.accountRepository.findOneById(accountId);
    newChangeAccount.accountType =
      this.accountTypeRepository.findOneById(accountTypeId);
    return this.accountRepository.update(accountId, newChangeAccount)
      .accountType;
  }

  /**
   * Borrar una cuenta
   *
   * @param {string} accountId
   * @memberof AccountService
   */
  deleteAccount(accountId: string) {
    this.accountRepository.delete(accountId);
  }
}
