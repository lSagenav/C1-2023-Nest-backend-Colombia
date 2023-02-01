import { IRepositoryBase } from './base';
import { DocumentTypeEntity } from '../../entities';

export interface IDocumentTypeRepository
  extends IRepositoryBase<DocumentTypeEntity> {
  findByState(state: boolean): Array<DocumentTypeEntity>;
  findByName(name: string): Array<DocumentTypeEntity>;
}
