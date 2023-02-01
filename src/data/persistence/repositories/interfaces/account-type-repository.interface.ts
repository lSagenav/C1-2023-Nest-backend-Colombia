import { IRepositoryBase } from './base';
import { AccountTypeEntity } from '../../entities';

/**
 * Interface para el manejo del repositorio con referencia la cuenta bancaria
 * de un cliente
 *
 * @export
 * @interface IAccountTypeRepository
 * @extends {IRepositoryBase<AccountTypeEntity>}
 */
export interface IAccountTypeRepository
  extends IRepositoryBase<AccountTypeEntity> {
  /**
   * Busca los tipos de cuentas dependiendo del estado requerido
   *
   * @param {boolean} state Estado del tipo de cuenta.
   *                        True activo, false desactivado
   * @return {*}  {Array<AccountTypeEntity>} Arreglo de tipos de cuentas encontradas
   * @memberof IAccountTypeRepository
   */
  findByState(state: boolean): Array<AccountTypeEntity>;

  /**
   * Busca los tipos de cuentas dependiendo del nombre requerido
   *
   * @param {string} name Nombre del tipo de cuenta a buscar
   * @return {*}  {Array<AccountTypeEntity>} Arreglo de tipos de cuentas encontradas
   * @memberof IAccountTypeRepository
   */
  findByName(name: string): Array<AccountTypeEntity>;
}
