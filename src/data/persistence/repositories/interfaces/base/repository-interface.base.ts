/**
 * Interface base para la gestión de los repositorios
 *
 * @export
 * @interface IRepositoryBase
 * @template T Entidad sobre la cual el repositorio actuará
 */
export interface IRepositoryBase<T> {
  /**
   * Registra en base de datos bajo la entidad asignada
   *
   * @param {T} entity Objeto con los datos a registrar
   * @return {*}  {T} Objeto de los datos registrados
   * @memberof IRepositoryBase
   */
  register(entity: T): T;

  /**
   * Actualiza un registro o parte de un registro según los datos transferidos
   * en el objeto de la entidad
   *
   * @param {string} id Identificación de la tupla
   * @param {T} entity Objeto con los datos a actualizar
   * @return {*}  {T} Objeto de la entidad con los datos ya actualizados
   * @memberof IRepositoryBase
   */
  update(id: string, entity: T): T;

  /**
   * Borra lógicamente o físicamente un elemento de la base de datos
   *
   * @param {string} id Identificación de la tupla
   * @param {boolean} [soft] True o undefined si se desea hacer un borrado lógico. False si se desea hacer un borrado físico
   * @memberof IRepositoryBase
   */
  delete(id: string, soft?: boolean): void;

  /**
   * Devuelve un arreglo con todos los ítems de la base de datos con referencia
   * a la entidad indicada
   *
   * @return {*}  {T[]} Arreglo con los items de la entidad indicada
   * @memberof IRepositoryBase
   */
  findAll(): T[];

  /**
   * Busca un elemento de la entidad indicada bajo el ID relacionado
   *
   * @param {string} id Identificación de la tupla
   * @return {*}  {T} Ítem encontrado de la entidad indicada
   * @memberof IRepositoryBase
   */
  findOneById(id: string): T;
}
