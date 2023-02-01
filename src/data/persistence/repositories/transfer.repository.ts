import { RepositoryBase } from './base';
import { TransferEntity } from '../entities';
import { ITransferRepository } from './interfaces';
import { NotFoundException } from '@nestjs/common';

export class TransferRepository
  extends RepositoryBase<TransferEntity>
  implements ITransferRepository
{
  findOutcomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): TransferEntity[] {
    const outRange = this.database.filter(
      (item) =>
        item.outCome.id === accountId &&
        typeof item.deletedAt === 'undefined' &&
        item.dateTime >= dateInit &&
        item.dateTime <= dateEnd,
    );
    if (outRange === undefined) throw new NotFoundException();
    return outRange;
  }
  findIncomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): TransferEntity[] {
    const inputRange = this.database.filter(
      (item) =>
        item.outCome.id === accountId &&
        typeof item.deletedAt === 'undefined' &&
        item.dateTime >= dateInit &&
        item.dateTime <= dateEnd,
    );
    if (inputRange === undefined) throw new NotFoundException();
    return inputRange;
  }
  register(entity: TransferEntity): TransferEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
  update(id: string, entity: TransferEntity): TransferEntity {
    const index = this.database.findIndex(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as TransferEntity;
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
  findAll(): TransferEntity[] {
    return this.database.filter((item) => item.deletedAt === undefined);
  }
  findOneById(id: string): TransferEntity {
    const transfer = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (transfer) return transfer;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }

  /**
   * Borra físicamente una transferencia de la base de datos
   *
   * @private
   * @param {number} index Indice de la transferencia a borrar
   * @memberof CustomerRepository
   */
  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  /**
   * Borra lógicamente una transferencia de la base de datos
   *
   * @private
   * @param {number} index Indice de la transferencia a borrar
   * @memberof CustomerRepository
   */
  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
  }
}
