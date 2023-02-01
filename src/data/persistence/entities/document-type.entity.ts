/**
 * Entidad para el manejo del tipo de documento del cliente
 *
 * @export
 * @class DocumentTypeEntity
 * @implements {DocumentTypeModel}
 */
import { v4 as uuid } from 'uuid';
import { DocumentTypeModel } from '../../models';

export class DocumentTypeEntity implements DocumentTypeModel {
  id = uuid();

  name: string;

  state = true;
}
