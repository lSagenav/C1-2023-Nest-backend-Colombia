/**
 * Entidad para el manejo del cliente
 *
 * @export
 * @class CustomerEntity
 * @implements {CustomerModel}
 */
import { v4 as uuid } from 'uuid';
import { DocumentTypeEntity } from './';
import { CustomerModel } from '../../models';

export class CustomerEntity implements CustomerModel {
  id = uuid();

  documentType: DocumentTypeEntity;

  document: string;

  fullName: string;

  email: string;

  phone: string;

  password: string;

  avatarUrl?: string;

  state = true;

  deletedAt?: Date | number;
}
