import { Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryBase } from './base';
import { DocumentTypeEntity } from '../entities';
import { IDocumentTypeRepository } from './interfaces';

@Injectable()
export class DocumentTypeRepository
  extends RepositoryBase<DocumentTypeEntity>
  implements IDocumentTypeRepository
{
  constructor() {
    super();
    this.database.push(
      {
        id: 'ef8d2f28-2a51-489e-9d67-324fc1980bc4',
        name: 'cedula de ciudadania',
        state: true,
      },
      {
        id: '48215fb0-b212-11ed-afa1-0242ac120002',
        name: 'cedula de estrangeria',
        state: true,
      },
    );
  }
  findByState(state: boolean): DocumentTypeEntity[] {
    const status = this.database.filter((item) => item.state == state);
    return status;
  }

  findByName(name: string): DocumentTypeEntity[] {
    const firsname = this.database.filter((item) => item.name == name);
    return firsname;
  }

  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    const index = this.database.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.database[index] = {
        ...this.database[index],
        ...entity,
        id,
      } as DocumentTypeEntity;
    } else {
      throw new NotFoundException(
        `el tipo de documento con el  ${id} no existe en base de datos`,
      );
    }
    return this.database[index];
  }

  delete(id: string, soft?: boolean): void {
    const doc = this.findOneById(id);
    if (soft || soft === undefined) {
      this.update(id, doc);
    } else {
      const index = this.database.findIndex((item) => item.id === id);
      this.database.splice(index, 1);
    }
  }
  findAll(): DocumentTypeEntity[] {
    return this.database;
  }

  findOneById(id: string): DocumentTypeEntity {
    console.log(id);
    const doc = this.database.find((item) => item.id === id);
    console.log(doc);
    if (doc) return doc;
    else
      throw new NotFoundException(
        `El tipo de documento con el  ${id} no existe en base de datos`,
      );
  }
}
