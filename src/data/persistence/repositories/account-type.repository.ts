import { RepositoryBase } from './base';
import { AccountTypeEntity } from '../entities';
import { IAccountTypeRepository } from './interfaces';
import { NotFoundException } from '@nestjs/common';

export class AccountTypeRepository
  extends RepositoryBase<AccountTypeEntity>
  implements IAccountTypeRepository
{
  constructor() {
    super();
    this.database.push(
      {
        id: 'c49fdd2a-a365-11ed-a8fc-0242ac120002',
        name: 'Ahorros',
        state: true,
      },
      {
        id: 'c3221f3f-602e-4ff1-9c45-e85c14f5e987',
        name: 'Corriente',
        state: true,
      },
    );
  }
  findByState(state: boolean): AccountTypeEntity[] {
    const status = this.database.filter((item) => item.state == state);
    return status;
  }

  findByName(name: string): AccountTypeEntity[] {
    const firsname = this.database.filter((item) => item.name == name);
    return firsname;
  }

  register(entity: AccountTypeEntity): AccountTypeEntity {
    this.database.push(entity); //enviamos informacon a la base
    return this.database.at(-1) ?? entity; //retornamos la ultima posicion del areglo
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const index = this.database.findIndex((item) => item.id === id);
    const data = this.database[index];
    this.database[index] = {
      ...data,
      ...entity,
      id: id,
    };
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    const account = this.findOneById(id);
    if (soft || soft === undefined) {
      this.update(id, account);
    } else {
      const index = this.database.findIndex((item) => item.id === id);
      this.database.splice(index, 1);
    }
  }

  findAll(): AccountTypeEntity[] {
    return this.database;
  }

  findOneById(id: string): AccountTypeEntity {
    const accounts = [
      {
        id: 'c49fdd2a-a365-11ed-a8fc-0242ac120002',
        name: 'Ahorros',
        state: true,
      },
      {
        id: 'c3221f3f-602e-4ff1-9c45-e85c14f5e987',
        name: 'Corriente',
        state: true,
      },
    ];
    const account = accounts.find((a) => a.id === id);
    if (account) return account;
    else
      throw new NotFoundException(
        `el tipo de cuenta con el ${id} no existe en base de datos`,
      );
  }
}
