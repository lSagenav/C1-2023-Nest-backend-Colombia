import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { NewCustomerDTO, SignInDTO } from '../../../business/dtos';

@Controller('security')
export class SecurityController {
  /**
   * Identificación del usuario del sistema
   *
   * @param {SignInDTO} signIn Datos de usuario y contraseña
   * @return {*}  {string} Token JWT que identifica al usuario en sesión
   * @memberof SecurityController
   */
  @Version('1')
  @Post('sign-in')
  signInV1(@Body() signIn: SignInDTO): string {
    throw new Error('Method not implemented.');
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
  signUpV1(@Body() signUp: NewCustomerDTO): string {
    throw new Error('Method not implemented.');
  }

  /**
   * Cierre de sesión
   *
   * @memberof SecurityController
   */
  @Version('1')
  @Get('logout')
  logoutV1(): void {
    throw new Error('Method not implemented.');
  }
}
