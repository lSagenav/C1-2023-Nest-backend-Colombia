import { RepositoryBase } from './base';
import { DepositEntity } from '../entities';
import { IDepositRepository } from './interfaces';
import { NotFoundException } from '@nestjs/common';

export class DepositRepository
  extends RepositoryBase<DepositEntity>
  implements IDepositRepository
{
  findByAccountId(account: string): DepositEntity[] {
    const accountid = this.database.filter(
      (item) =>
        item.account.id == account && typeof item.deletedAt === 'undefined',
    );
    return accountid;
  }

  findByDataRange(
    id: string,
    DateMin: number | Date,
    DateMax: number | Date,
  ): DepositEntity[] {
    console.log('ID AHBER QUE KEGA', id);
    const arrayDeposites = this.findAll();
    return arrayDeposites.filter(
      (deposit) =>
        deposit.account.id === id &&
        deposit.dateTime >= DateMin &&
        deposit.dateTime <= DateMax,
    );
  }

  register(entity: DepositEntity): DepositEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DepositEntity): DepositEntity {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as DepositEntity;
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

  findAll(): DepositEntity[] {
    return this.database.filter((item) => item.deletedAt === undefined);
  }
  findOneById(id: string): DepositEntity {
    const deposit = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (deposit) return deposit;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  /**
   * Borra físicamente un deposito de la base de datos
   *
   * @private
   * @param {number} index Indice del deposito a borrar
   * @memberof CustomerRepository
   */
  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  /**
   * Borra lógicamente un deposito de la base de datos
   *
   * @private
   * @param {number} index Indice del deposito a borrar
   * @memberof CustomerRepository
   */
  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
  }
}
