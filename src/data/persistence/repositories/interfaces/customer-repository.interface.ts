import { IRepositoryBase } from './base';
import { CustomerEntity } from '../../entities';

/**
 * Interface para el manejo del repositorio con referencia al cliente
 *
 * @export
 * @interface ICustomerRepository
 * @extends {IRepositoryBase<CustomerEntity>}
 */
export interface ICustomerRepository extends IRepositoryBase<CustomerEntity> {
  findOneByEmailAndPassword(email: string, password: string): boolean;
  findOneByDocumentTypeAndDocument(
    documentTypeId: string,
    document: string,
  ): CustomerEntity;
  findOneByEmail(email: string): CustomerEntity;
  findOneByPhone(phone: string): CustomerEntity;
  findByState(state: boolean): Array<CustomerEntity>;
  findByFullName(fullName: string): Array<CustomerEntity>;
}
