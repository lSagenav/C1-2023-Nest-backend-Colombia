/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { SecurityService } from 'src/business';
import { NewCustomerDTO, SignDTO } from '../../../business/dtos';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}
  /**
   * Identificación del usuario del sistema
   *
   * @param {SignInDTO} signIn Datos de usuario y contraseña
   * @return {*}  {string} Token JWT que identifica al usuario en sesión
   * @memberof SecurityController
   */
  @Version('1')
  @Post('sign-in')
  signIn(@Body() customer: SignDTO) {
    return this.securityService.signIn(customer);
  }

  /**
   * Registro de un usuario del sistema
   *
   * @param {NewCustomerDTO} signUp Datos del usuario
   * @return {*}  {string} Token JWT que identifica al usuario en sesión
   * @memberof SecurityController
   */
  @Version('1')
  @Post('sign-up')
  signUp(@Body() customer: NewCustomerDTO) {
    return this.securityService.signUp(customer);
  }

  /**
   * Cierre de sesión
   *
   * @memberof SecurityController
   */
  @Version('1')
  @Get('logout')
  logout(@Body() body: { JWT: string }): boolean {
    return this.securityService.signOut(body.JWT);
  }
}
