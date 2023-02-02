/**
 * Modelo del cliente del banco
 *
 * @export
 * @interface CustomerModel
 */
import { DocumentTypeModel } from '.';

export interface CustomerModel {
  id: string;
  documentType: DocumentTypeModel;
  document: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatarUrl?: string;
  state: boolean;
  deletedAt?: Date | number; //el signo ? quiere decir que no es obligatorio el dato
}
