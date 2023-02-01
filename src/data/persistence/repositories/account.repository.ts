import { NotFoundException } from '@nestjs/common';
import { AccountEntity } from '../entities';
import { RepositoryBase } from './base/repository.base';
import { IAccountRepository } from './interfaces';

export class AccountRepository
  extends RepositoryBase<AccountEntity>
  implements IAccountRepository
{
  findByAccountType(accountTypeId: string): AccountEntity[] {
    throw new Error('Method not implemented.');
  }
  findByState(state: boolean): AccountEntity[] {
    const arrayState: AccountEntity[] = [];
    this.database.map((account) => {
      if (account.state === state) {
        arrayState.push(account);
      }
    });
    return arrayState;
  }

  findByCustomer(customer: string): AccountEntity[] {
    const client = this.database.filter(
      (item) =>
        item.customer.id == customer && typeof item.deletedAt === 'undefined',
    );
    return client;
  }

  indByAccountType(accountType: string): AccountEntity[] {
    const accountTy = this.database.filter(
      (item) =>
        item.accountType.id == accountType &&
        typeof item.deletedAt === 'undefined',
    );
    return accountTy;
  }

  register(entity: AccountEntity): AccountEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: AccountEntity): AccountEntity {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as AccountEntity;
    } else {
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
    }
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    if (soft || soft === undefined) {
      const index = this.database.findIndex((item) => item.id === id);
      this.softDelete(index);
    } else {
      const index = this.database.findIndex((item) => item.id === id);
      this.hardDelete(index);
      this.database.splice(index, 1);
    }
  }

  findAll(): AccountEntity[] {
    return this.database.filter((item) => item.deletedAt === undefined);
  }

  findOneById(id: string): AccountEntity {
    const account = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (account) return account;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  /**
   * Borra físicamente una cuenta de la base de datos
   *
   * @private
   * @param {number} index Indice de la cuenta a borrar
   * @memberof CustomerRepository
   */
  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  /**
   * Borra lógicamente una cuenta de la base de datos
   *
   * @private
   * @param {number} index Indice de la cuenta a borrar
   * @memberof CustomerRepository
   */
  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
  }
}
