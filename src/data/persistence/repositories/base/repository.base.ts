/**
 * Clase abstracta del repositorio base para el almacenamiento de los datos
 *
 * @export
 * @abstract
 * @class RepositoryBase
 * @template T Entidad sobre la cual la base del repositorio actuará
 */
export abstract class RepositoryBase<T> {
  /**
   * Arreglo que hace las veces de base de datos para almacenar los datos
   * de la entidad asignada
   *
   * @protected
   * @type {Array<T>} Arreglo de la entidad asignada
   * @memberof RepositoryBase
   */
  protected readonly database: Array<T>;

  constructor() {
    this.database = new Array<T>(); // las t son datos genericos
  }
}
