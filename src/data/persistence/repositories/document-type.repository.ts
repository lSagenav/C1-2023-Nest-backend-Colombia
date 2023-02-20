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
    this.database.push({
      id: '7f2b62a3-5bf3-40c4-b921-1a5aa3b3df60',
      name: 'cedula',
      state: true,
    });
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
      throw new NotFoundException(`El ID ${id} no existe en base de datos`);
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
    const doc = this.database.find((item) => item.id === id);
    if (doc) return doc;
    else throw new NotFoundException(`El ID ${id} no existe en base de datos`);
  }
}
